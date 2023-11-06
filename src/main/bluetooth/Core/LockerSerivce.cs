using System;
using System.Collections.ObjectModel;
using Windows.Devices.Enumeration;
using Windows.Foundation;

namespace Locker.Bluetooth.Core
{
    public class LockerService : ILockerService
    {
        readonly Guid ServiceUuid = Guid.Parse("");
        readonly Guid ReadCharacteristicUuid = Guid.Parse("");
        readonly Guid WriteCharacteristicUuid = Guid.Parse("");

        #region Error Codes
        readonly int E_BLUETOOTH_ATT_WRITE_NOT_PERMITTED = unchecked((int)0x80650003);
        readonly int E_BLUETOOTH_ATT_INVALID_PDU = unchecked((int)0x80650004);
        readonly int E_ACCESSDENIED = unchecked((int)0x80070005);
        readonly int E_DEVICE_NOT_AVAILABLE = unchecked((int)0x800710df); // HRESULT_FROM_WIN32(ERROR_DEVICE_NOT_AVAILABLE)
        #endregion

        public void SearchDevice()
        {
        }

        Task<string> PairDevice(string deviceId)
        {
            var device = await BluetoothLEDevice.FromIdAsync(deviceId);
            if (device != null)
            {
                device.DeviceInformation.Pairing.Custom.PairingRequested += Custom_PairingRequested;
                var result = await device.DeviceInformation.Pairing.Custom.PairAsync(DevicePairingKinds.ConfirmOnly);
                //var result = await device.DeviceInformation.Pairing.PairAsync();

                return result.Status.ToString();
            }
            else
            {
                return string.Format("Device Id:{0} not found", deviceId);
            }
        }

        Task<string> UnpairDevice(string deviceId)
        {
            var device = await BluetoothLEDevice.FromIdAsync(deviceId);
            if (device != null)
            {
                var result = await device.DeviceInformation.Pairing.UnpairAsync();
                return result.Status.ToString();
            }
            else
            {
                return string.Format("Device Id:{0} not found", deviceId);
            }
        }

        Task<string> ConnectDevice(string deviceId)
        {
            try
            {
                var device = await BluetoothLEDevice.FromIdAsync(deviceId);
                if (device != null)
                {
                    var result = await device.DeviceInformation.Pairing.UnpairAsync();
                    return result.Status.ToString();
                }
                else
                {
                    return string.Format("Device Id:{0} not found", deviceId);
                }
            }
            catch (Exception ex) when (ex.HResult == E_DEVICE_NOT_AVAILABLE)
            {
            }
        }
    }
}
