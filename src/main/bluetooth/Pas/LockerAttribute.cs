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
    public class LockerAttribute
    {
        #region Properties

        /// <summary>
        /// current connection service
        /// </summary>
        public GattDeviceService Service { get; private set; }

        /// <summary>
        /// write characteristics
        /// </summary>
        public GattCharacteristic WriteCharacteristic { get; private set; }

        /// <summary>
        /// Read the feature object
        /// </summary>
        public GattCharacteristic ReadCharacteristic { get; private set; }

        /// <summary>
        /// Store detected devices
        /// </summary>
        public List<BluetoothLEDevice> DeviceList { get; private set; }

        public LockerDeviceInfo DeviceInfo { get; set; }

        #endregion

        public LockerAttribute()
        {
            DeviceList = new List<BluetoothLEDevice>();
        }

        /// <summary>
        /// Send a data interface
        /// </summary>
        /// <returns></returns>
        public void Write(byte[] data)
        {
            if (WriteCharacteristic != null)
            {
                WriteCharacteristic.WriteValueAsync(CryptographicBuffer.CreateFromByteArray(data), GattWriteOption.WriteWithResponse).Completed = (asyncInfo, asyncStatus) =>
                {
                    if (asyncStatus == AsyncStatus.Completed)
                    {
                        GattCommunicationStatus a = asyncInfo.GetResults();
                        Console.writeline ("Send Data:" + Bitconverter.tostring (data) + "State:" + a);
                    }
                };
            }

        }

        /// <summary>
        //A active disconnection connection
        /// </summary>
        /// <returns></returns>
        public void Dispose()
        {
            DeviceInfo = null;
            Service?.Dispose();
            CurrentService = null;
            WriteCharacteristic = null;
            ReadCharacteristic = null;
            Console.WriteLine ("Practice Disconnect");
        }

    }
}