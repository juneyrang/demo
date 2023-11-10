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

        #endregion

    }
}