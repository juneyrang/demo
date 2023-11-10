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

        /// <summary>
        /// Store detected devices
        /// </summary>
        public List<BluetoothLEDevice> DeviceList { get; private set; }

        #region Event

        /// <summary>
        /// Define Search Bluetooth Device
        /// </summary>
        public delegate void DeviceWatcherChangedEvent(BluetoothLEDevice bluetoothLEDevice);

        /// <summary>
        /// Search Bluetooth events
        /// </summary>
        public event DeviceWatcherChangedEvent DeviceWatcherChanged;

        /// <summary>
        /// Get service commission
        /// </summary>
        public delegate void CharacteristicFinishEvent(int size);

        /// <summary>
        /// Get service events
        /// </summary>
        public event CharacteristicFinishEvent CharacteristicFinish;

        /// <summary>
        /// Get a characteristic commission
        /// </summary>
        public delegate void CharacteristicAddedEvent(GattCharacteristic gattCharacteristic);

        /// <summary>
        /// Get a feature event
        /// </summary>
        public event CharacteristicAddedEvent CharacteristicAdded;

        /// <summary>
        /// accept data commission
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="data"></param>
        public delegate void RecDataEvent(GattCharacteristic sender, byte[] data);

        /// <summary>
        /// Accept data event
        /// </summary>
        public event RecDataEvent Recdate;

        #endregion
    }

}