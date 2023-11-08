
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.GenericAttributeProfile;
using Windows.Devices.Enumeration;
using Windows.Security.Cryptography;

namespace Locker.Bluetooth.Core
{
    public class LockerManager
    {
        private BluetoothLEDevice lockerDevice = null;
        private GattCharacteristic writeCharacteristic;
        private GattCharacteristic readCharacteristic;
        private List<BluetoothAttribute> _serviceCollection = new List<BluetoothAttribute>();

        private byte[] LockerToken = new byte[4];
        private byte CHIP_TYPE;
        private byte DEV_TYPE;

        /// <summary>
        /// Occurs when [connection status changed].
        /// </summary>
        public event EventHandler<ConnectionStatusChangedEventArgs> ConnectionStatusChanged;
        /// <summary>
        /// Raises the <see cref="E:ConnectionStatusChanged" /> event.
        /// </summary>
        /// <param name="e">The <see cref="ConnectionStatusChangedEventArgs"/> instance containing the event data.</param>
        protected virtual void OnConnectionStatusChanged(ConnectionStatusChangedEventArgs e)
        {
            ConnectionStatusChanged?.Invoke(this, e);
        }

        public async Task<ConnectionResult> ConnectDevice(string deviceId)
        {
            try
            {
                // BT_Code: BluetoothLEDevice.FromIdAsync must be called from a UI thread because it may prompt for consent.
                lockerDevice = await BluetoothLEDevice.FromIdAsync(deviceId);

                if (lockerDevice == null)
                {
                    return new Schema.ConnectionResult()
                    {
                        IsConnected = false,
                        ErrorMessage = "Could not find specified locker device"
                    };
                }

                if (!lockerDevice.DeviceInformation.Pairing.IsPaired)
                {
                    lockerDevice = null;
                    return new Schema.ConnectionResult()
                    {
                        IsConnected = false,
                        ErrorMessage = "Locker device is not paired"
                    };
                }

                lockerDevice.ConnectionStatusChanged -= DeviceConnectionStatusChanged;
                lockerDevice.ConnectionStatusChanged += DeviceConnectionStatusChanged;

                var isReachable = await GetGattDeviceService();
                if (!isReachable)
                {
                    _heartRateDevice = null;
                    return new Schema.ConnectionResult()
                    {
                        IsConnected = false,
                        ErrorMessage = "Locker device is unreachable (i.e. out of range or shutoff)"
                    };
                }


                else
                {
                    var service = await GetGattDeviceService();
                    if(service != null)
                    {
                        await SetGattCharacteristic(service);
                    }
                }
            }
            catch (Exception ex)
            {
                rootPage.NotifyUser("Bluetooth radio is not on.", NotifyType.ErrorMessage);
            }

        }

        private async Task<bool> GetGattDeviceService()
        {
            GattDeviceService s = null;
            GattDeviceServicesResult result = await lockerDevice.GetGattServicesAsync(BluetoothCacheMode.Uncached);
            if (result.Status == GattCommunicationStatus.Success)
            {
                foreach (var service in result.services)
                {
                    if (DisplayHelper.GetServiceName(service) == "65255")
                    {
                        s = service;
                        break;
                    }
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
                                }
                            }
                        }
                    }
                }
                return true;
            }
            else
            {
                return false;
            }
        }

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

            byte[] resultToken = new byte[4];
            Console.WriteLine("resultToken: " + BitConverter.ToString(resultToken));
            Array.Copy(resultBytes, 3, resultToken, 0, resultToken.Length);
            bool value = await OpenLock(PacketHelper.LockOpenPacket(resultToken));
        }

        private async Task<bool> DisconnectDevice()
        {
            bool isDisconnect = true;
            if (lockerDevice != null)
            {
                if(writeCharacteristic != null)
                {
                    var result = await writeCharacteristic.WriteClientCharacteristicConfigurationDescriptorAsync(GattClientCharacteristicConfigurationDescriptorValue.None);
                    if (result != GattCommunicationStatus.Success)
                    {
                        isDisconnect = false;
                    }
                    else
                    {
                        if (writeCharacteristic.Service != null)
                            writeCharacteristic.Service.Dispose();
                        writeCharacteristic = null;
                    }
                }

                if(readCharacteristic != null)
                {
                    var result = await readCharacteristic.ReadClientCharacteristicConfigurationDescriptorAsync(GattClientCharacteristicConfigurationDescriptorValue.None);
                    if (result != GattCommunicationStatus.Success)
                    {
                        isDisconnect = false;
                    }
                    else
                    {
                        if (readCharacteristic.Service != null)
                            readCharacteristic.Service.Dispose();
                        readCharacteristic = null;
                    }
                }

                _serviceCollection = new List<BluetoothAttribute>();

                lockerDevice.Dispose();
                lockerDevice = null;

                DeviceConnectionStatusChanged(null, null);
            }
            return isDisconnect;
        }

        private void DeviceConnectionStatusChanged(BluetoothLEDevice sender, object args)
        {
            var isStatus = sender != null && (sender.ConnectionStatus == BluetoothConnectionStatus.Connected);
            if(!isStatus)
            {
            }
            var result = new ConnectionStatusChangedEventArgs()
            {
                IsConnected = isStatus
                Result = args != null ? args as string : '';
            };

            OnConnectionStatusChanged(result);
        }

    }
}