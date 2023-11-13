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
    public class LockerManager
    {
        private bool asyncLock = false;

        private BluetoothLEDevice _lockerDevice = null;
        private List<LockerAttribute> _deviceCollection = new List<LockerAttribute>();

        /// <summary>
        /// Store detected devices
        /// </summary>
        public List<BluetoothLEDevice> DeviceLocker { get; private set; }

        /// <summary>
        /// current connection service
        /// </summary>
        public GattDeviceService CurrentService { get; private set; }

        /// <summary>
        /// Currently connected Bluetooth device
        /// </summary>
        public BluetoothLEDevice CurrentDevice { get; private set; }

        /// <summary>
        /// write characteristics
        /// </summary>
        public GattCharacteristic CurrentWriteCharacteristic { get; private set; }

        /// <summary>
        /// Read the feature object
        /// </summary>
        public GattCharacteristic CurrentReadCharacteristic { get; private set; }

        /// <summary>
        /// Notify the feature object
        /// </summary>
        public GattCharacteristic CurrentNotifyCharacteristic { get; private set; }

        #region Event

        /// <summary>
        /// Occurs when [connection status changed].
        /// </summary>
        public event EventHandler<ConnectionStatusChangedEventArgs> ConnectionStatusChanged;
        /// <summary>
        /// Raises the <see cref="E:ConnectionStatusChanged" /> event.
        /// </summary>
        /// <param name="e">The <see cref="Events.ConnectionStatusChangedEventArgs"/> instance containing the event data.</param>
        protected virtual void OnConnectionStatusChanged(Events.ConnectionStatusChangedEventArgs e)
        {
            ConnectionStatusChanged?.Invoke(this, e);
        }

        /// <summary>
        /// Define Search Bluetooth Device
        /// </summary>
        public delegate void IncomingValueChangedEvent(BluetoothLEDevice bluetoothLEDevice);

        /// <summary>
        /// Search Bluetooth events
        /// </summary>
        public event IncomingValueChangedEvent IncomingValueChanged;

        #endregion

        public LockerManager()
        {
            DeviceLocker = new List<BluetoothLEDevice>();
        }

        #region Device Connect

        public async Task<ConnectionResult> ConnectAsync(string deviceId)
        {
            _lockerDevice = await BluetoothLEDevice.FromIdAsync(deviceId);
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

            // we should always monitor the connection status
            _lockerDevice.ConnectionStatusChanged -= DeviceConnectionStatusChanged;
            _lockerDevice.ConnectionStatusChanged += DeviceConnectionStatusChanged;

            var isReachable = await GetDeviceServicesAsync();
            if (!isReachable)
            {
                _lockerDevice = null;
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


            // we could force propagation of event with connection status change, to run the callback for initial status
            DeviceConnectionStatusChanged(_lockerDevice, null);

            return new ConnectionResult()
            {
                IsConnected = _lockerDevice.ConnectionStatus == BluetoothConnectionStatus.Connected,
                Name = _lockerDevice.Name
            };
        }

        private async Task<bool> GetDeviceServicesAsync()
        {
            GattDeviceServicesResult result = await lockerDevice.GetGattServicesAsync(BluetoothCacheMode.Uncached);
            if (result.Status == GattCommunicationStatus.Success)
            {
                foreach (var service in result.services)
                {
                    if (DisplayHelper.GetServiceName(service) == "65255")
                    {
                        CurrentService = service;
                        return true;
                    }
                }
                return false;
            }
            else
            {
                return false;
            }
        }

        async Task<CharacteristicResult> SetGattCharacteristic()
        {
            if (service.Uuid.Equals(LockerConstants.ServiceUuid))
            {
                readCharacteristic = service.GetCharacteristics(LockerConstants.ReadCharacteristicUuid)[0];
                readCharacteristic.ValueChanged += IncomingData_ValueChanged;
                await readCharacteristic.WriteClientCharacteristicConfigurationDescriptorAsync(GattClientCharacteristicConfigurationDescriptorValue.Notify);

                GattCharacteristicsResult characteristicsResult = await service.GetCharacteristicsAsync();
                if (characteristicsResult.Status == GattCommunicationStatus.Success)
                {
                    foreach (var characteristic in characteristicsResult.Characteristics)
                    {
                        Console.WriteLine($"Characteristic UUID: {characteristic.Uuid}");
                        if (characteristic.Uuid.Equals(LockerConstants.WriteCharacteristicUuid))
                        {
                            writeCharacteristic = characteristic;
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        /// <summary>
        /// Disconnects the current BLE heart rate device.
        /// </summary>
        /// <returns></returns>
        public async Task DisconnectAsync()
        {
            if (_heartRateDevice != null)
            {
                if (_heartRateMeasurementCharacteristic != null)
                {
                    //NOTE: might want to do something here if the result is not successful
                    var result = await _heartRateMeasurementCharacteristic.WriteClientCharacteristicConfigurationDescriptorAsync(GattClientCharacteristicConfigurationDescriptorValue.None);
                    if (_heartRateMeasurementCharacteristic.Service != null)
                        _heartRateMeasurementCharacteristic.Service.Dispose();
                    _heartRateMeasurementCharacteristic = null;
                }

                if (_heartRateMeasurementAttribute != null)
                {
                    if (_heartRateMeasurementAttribute.service != null)
                        _heartRateMeasurementAttribute.service.Dispose();
                    _heartRateMeasurementAttribute = null;
                }

                if (_heartRateAttribute != null)
                {
                    if (_heartRateAttribute.service != null)
                        _heartRateAttribute.service.Dispose();
                    _heartRateAttribute = null;
                }

                _serviceCollection = new List<BluetoothAttribute>();

                _heartRateDevice.Dispose();
                _heartRateDevice = null;

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

        /// <summary>
        /// Gets a value indicating whether this instance is connected.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this instance is connected; otherwise, <c>false</c>.
        /// </value>
        public bool IsConnected
        {
            get { return _heartRateDevice != null ? _heartRateDevice.ConnectionStatus == BluetoothConnectionStatus.Connected : false; }
        }

        #endregion

        async Task<bool> WriteDataAndReadAsync(byte[] data)
        {
            if (writeCharacteristic != null)
            {
                var writer = new DataWriter();
                writer.WriteBytes(data);
                var result = await writeCharacteristic.WriteValueAsync(writer.DetachBuffer());
                Console.WriteLine($"Data Write, status: {result}");
                return result == GattCommunicationStatus.Success;
            }
            return false;
        }

        // Read data change handler
        async void IncomingData_ValueChanged(GattCharacteristic sender, GattValueChangedEventArgs eventArgs)
        {
            byte[] readBytes = new byte[eventArgs.CharacteristicValue.Length];
            DataReader.FromBuffer(eventArgs.CharacteristicValue).ReadBytes(readBytes);

            byte[] resultBytes = PacketHelper.Decrypt(readBytes, PacketHelper.key);
            string message = System.Text.Encoding.UTF8.GetString(readBytes);
            Console.WriteLine($"IncomingData_ValueChanged ReadData : {message}");
            if(message != null)
            {
                if(message.StartsWith("0602")) // Token 획득
                {
                    Array.Copy(resultBytes, 3, LockerToken, 0, LockerToken.Length);
                    CHIP_TYPE = resultBytes[7];
                    DEV_TYPE = resultBytes[10];
                }
                else if(message.StartsWith("0202")) // 전력 획득
                {
                    if (decryptString.startsWith("020201ff"))
                    {
                    }
                    else
                    {
                        byte battery = resultBytes[3];
                    }
                }
                else if(message.StartsWith("0606")) // 잠금 시간 쿼리
                {
                    byte[] No = new byte[2];
                    byte[] ClosedTime = new byte[4];
                    Array.Copy(resultBytes, 3, No, 0, No.Length);
                    Array.Copy(resultBytes, 5, ClosedTime, 0, ClosedTime.Length);
                }
                else if(message.StartsWith("0502")) // 잠금 해제
                {
                    byte result = resultBytes[3];
                }
                else if(message.StartsWith("050F")) // 잠금 상태
                {
                    byte result = resultBytes[3]; // 00 : 잠금 해제, 01 : 잠금
                }
                else if(message.StartsWith("050D")) // 잠금
                {
                }
                else if(message.StartsWith("0508"))
                {
                }
                else if(message.StartsWith("0505")) // 비밀번호 변경
                {
                    byte result = resultBytes[3];
                }
                else if(message.StartsWith("0703")) // 암호화/복호화 키 변경
                {
                    byte result = resultBytes[3];
                }
                else if(message.StartsWith("CB0503"))
                {
                }
            }
        }

    }

}