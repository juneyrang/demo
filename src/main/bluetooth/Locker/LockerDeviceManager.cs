
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
    public class LockerDeviceManager
    {
        private byte[] LockerToken = new byte[4];
        private BluetoothLEDevice _lockerDevice = null;

        public GattDeviceService Service { get; private set; }
        public GattCharacteristic WriteCharacteristic { get; private set; }
        public GattCharacteristic ReadCharacteristic { get; private set; }

        public event EventHandler<ConnectionStatusChangedEventArgs> ConnectionStatusChanged;
        protected virtual void OnConnectionStatusChanged(ConnectionStatusChangedEventArgs e)
        {
            ConnectionStatusChanged?.Invoke(this, e);
        }

        public event EventHandler<IncomingDataChangedEventArgs> IncomingDataChanged;
        protected virtual void OnIncomingDataChanged(IncomingDataChangedEventArgs e)
        {
            IncomingDataChanged?.Invoke(this, e);
        }

        public async Task Connect(LockerDeviceInfo deviceInfo)
        {
            await ConnectAsync(deviceInfo.DeviceId);
        }

        public async Task OpenLock(LockerDeviceInfo deviceInfo)
        {
        }

        public async Task BatteryVolume(LockerDeviceInfo deviceInfo)
        {
        }

        public async Task ClosedTime(LockerDeviceInfo deviceInfo)
        {
        }

        private async Task<ConnectionResult> ConnectAsync(string deviceId)
        {
            _lockerDevice = await BluetoothLEDevice.FromIdAsync(deviceId);
            if (_lockerDevice == null)
            {
                return new ConnectionResult()
                {
                    IsConnected = false,
                    ErrorMessage = "Could not find specified Locker device"
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

            CharacteristicResult characteristicResult;
            characteristicResult = await SetLockerCharacteristic();
            if (!characteristicResult.IsSuccess)
                return new Schema.ConnectionResult()
                {
                    IsConnected = false,
                    ErrorMessage = characteristicResult.Message
                };

            // Get Token
            GetToken();

            // we could force propagation of event with connection status change, to run the callback for initial status
            DeviceConnectionStatusChanged(_heartRateDevice, null);

            return new Schema.ConnectionResult()
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

        private async Task<CharacteristicResult> SetLockerCharacteristic()
        {
            bool isSuccess = false;
            string message = "Locker characteristic does not support";
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
                        if (characteristic.Uuid.Equals(LockerConstants.WriteCharacteristicUuid))
                        {
                            writeCharacteristic = characteristic;
                            isSuccess = true;
                            message = "success";
                            break;
                        }
                    }
                }
            }
            return new CharacteristicResult()
            {
                IsSuccess = isSuccess,
                Message = message
            };
        }

        private void GetToken()
        {
            Array.Clear(LockerToken, 0x0, LockerToken.Length);
        }

        async void IncomingData_ValueChanged(GattCharacteristic sender, GattValueChangedEventArgs eventArgs)
        {
            byte[] readBytes = new byte[eventArgs.CharacteristicValue.Length];
            DataReader.FromBuffer(eventArgs.CharacteristicValue).ReadBytes(readBytes);

            byte[] resultBytes = PacketHelper.Decrypt(readBytes, PacketHelper.key);
            string message = System.Text.Encoding.UTF8.GetString(readBytes);

            Console.WriteLine($"IncomingData_ValueChanged ReadData : {message}");
            string strResult = "";
            if(message != null)
            {
                strResult = "";
                if(message.StartsWith("0602")) // Token 획득
                {
                    Array.Copy(resultBytes, 3, LockerToken, 0, LockerToken.Length);
                    //CHIP_TYPE = resultBytes[7];
                    //DEV_TYPE = resultBytes[10];
                }
                else if(message.StartsWith("0202")) // 전력 획득
                {
                    if (decryptString.startsWith("020201ff"))
                    {
                    }
                    else
                    {
                        byte battery = resultBytes[3];
                        strResult = decryptString.substring(6, 8);
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
            OnIncomingDataChanged(new IncomingDataChangedEventArgs() { ID = DeviceInfo.DeviceId, Message = message; });
        }

        private void DeviceConnectionStatusChanged(BluetoothLEDevice sender, object args)
        {
            var isConnected = sender != null && (sender.ConnectionStatus == BluetoothConnectionStatus.Connected);
            if(!isConnected)
            {
                _lockerDevice.ConnectionStatusChanged -= DeviceConnectionStatusChanged;
                _lockerDevice = null;
            }

            var result = new ConnectionStatusChangedEventArgs()
            {
                IsConnected = isConnected;
            };

            OnConnectionStatusChanged(result);
        }

        public async Task DisconnectAsync()
        {
            if (_lockerDevice != null)
            {
                var result = await WriteCharacteristic.WriteClientCharacteristicConfigurationDescriptorAsync(GattClientCharacteristicConfigurationDescriptorValue.None);
                if (WriteCharacteristic.Service != null)
                    WriteCharacteristic.Service.Dispose();
                WriteCharacteristic = null;

                if (ReadCharacteristic.Service != null)
                    ReadCharacteristic.Service.Dispose();
                ReadCharacteristic = null;

                if (Service != null)
                    Service.Dispose();
                Service = null;

                _lockerDevice.Dispose();
                _lockerDevice = null;

                DeviceConnectionStatusChanged(null, null);
            }
        }
    }
}