using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.GenericAttributeProfile;
using Windows.Devices.Enumeration;
using Windows.Security.Cryptography;

namespace Pas.Bluetooth
{
    public class LockerService
    {
        private List<BluetoothLEDevice> _deviceCollection { get; private set; };

        private List<LockerAttribute> _lockerAttributes { get; private set; };

        #region Event

        /// <summary>
        /// Occurs when [connection status changed].
        /// </summary>
        public event EventHandler<ConnectionStatusChangedEventArgs> ConnectionStatusChanged;
        /// <summary>
        /// Raises the <see cref="E:ConnectionStatusChanged" /> event.
        /// </summary>
        /// <param name="e">The <see cref="Events.ConnectionStatusChangedEventArgs"/> instance containing the event data.</param>
        protected virtual void OnConnectionStatusChanged(ConnectionStatusChangedEventArgs e)
        {
            ConnectionStatusChanged?.Invoke(this, e);
        }

        /// <summary>
        /// Search Bluetooth events
        /// </summary>
        public event EventHandler<IncomingValueChangedEventArgs> IncomingValueChanged;
        protected virtual void OnIncomingValueChanged(IncomingValueChangedEventArgs e)
        {
            IncomingValueChanged?.Invoke(this, e);
        }

        #endregion

        public LockerManager()
        {
            _lockerAttributes = new List<LockerAttribute>();
            _deviceCollection = new List<BluetoothLEDevice>();
        }

        #region Device Connect

        public async Task<ConnectionResult> ConnectAsync(string deviceId)
        {
            BluetoothLEDevice _lockerDevice =  = await BluetoothLEDevice.FromIdAsync(deviceId);
            if (_lockerDevice == null)
            {
                return new ConnectionResult()
                {
                    IsConnected = false,
                    ErrorMessage = "Could not find specified locker device"
                };
            }

            if (!_lockerDevice.DeviceInformation.Pairing.IsPaired)
            {
                _lockerDevice = null;
                return new ConnectionResult()
                {
                    IsConnected = false,
                    ErrorMessage = "Locker device is not paired"
                };
            }

            LockerAttribute lockerAttribute = new LockerAttribute(_lockerDevice);
            var isReachable = lockerAttribute.SetDeviceServiceAsync();
            if (!isReachable)
            {
                lockerAttribute = null;
                return new ConnectionResult()
                {
                    IsConnected = false,
                    ErrorMessage = "Locker device is unreachable (i.e. out of range or shutoff)"
                };
            }

            CharacteristicResult characteristicResult = await SetGattCharacteristic();
            if (!characteristicResult.IsSuccess)
                return new ConnectionResult()
                {
                    IsConnected = false,
                    ErrorMessage = characteristicResult.Message
                };

            // we should always monitor the connection status
            lockerAttribute.LockerDevice.ConnectionStatusChanged -= DeviceConnectionStatusChanged;
            lockerAttribute.LockerDevice.ConnectionStatusChanged += DeviceConnectionStatusChanged;

            lockerAttribute.IncomingDataChanged -= DeviceIncomingValueChanged;
            lockerAttribute.IncomingDataChanged += DeviceIncomingValueChanged;

            _lockerAttributes.Add(lockerAttribute);

            // we could force propagation of event with connection status change, to run the callback for initial status
            DeviceConnectionStatusChanged(_lockerDevice, null);

            return new ConnectionResult()
            {
                IsConnected = _lockerDevice.ConnectionStatus == BluetoothConnectionStatus.Connected,
                Name = _lockerDevice.Name
            };

            return connectionResult;
        }

        /// <summary>
        /// Disconnects the current BLE heart rate device.
        /// </summary>
        /// <returns></returns>
        public async Task DisconnectAsync(string deviceId)
        {
            LockerDevice lockerDevice = GetLockerDevice(deviceId);
            if (lockerDevice != null)
            {
                DeviceConnectionStatusChanged(null, null);
            }
        }

        private void DeviceConnectionStatusChanged(BluetoothLEDevice sender, object args)
        {
            var result = new ConnectionStatusChangedEventArgs()
            {
                IsConnected = sender != null && (sender.ConnectionStatus == BluetoothConnectionStatus.Connected)
            };

            OnConnectionStatusChanged(result);
        }

        private void DeviceIncomingValueChanged(IncomingValueChangedEventArgs sender, object args)
        {
            OnConnectionStatusChanged(result);
        }

        private LockerDevice GetLockerDevice(string deviceId)
        {
            return _lockerAttributes.Where(a => a.DeviceId == deviceId).FirstOrDefault();
        }

        #endregion

    }
}