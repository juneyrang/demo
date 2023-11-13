using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Locker.Bluetooth.Helper
{
    public class LockerAttribute
    {
        public GattDeviceService service;
        public GattCharacteristic readCharacteristic;
        public GattCharacteristic writeCharacteristic;

        public event EventHandler<IncomingDataChangedEventArgs> IncomingDataChanged;
        protected virtual void OnIncomingDataChanged(IncomingDataChangedEventArgs e)
        {
            IncomingDataChanged?.Invoke(this, e);
        }

        public string DeviceId { get; private set; }
        public byte[] LockerToken { get; private set; }

        public BluetoothLEDevice LockerDevice { get; private set; }

        public LockerAttribute(BluetoothLEDevice _lockerDevice )
        {
            this.LockerDevice = _lockerDevice;
            this.DeviceId = _lockerDevice.DeviceId;
            this.LockerToken = new byte[4];
        }

        public async Task<bool> SetDeviceServiceAsync()
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

        public async Task<CharacteristicResult> SetGattCharacteristic()
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

        private void SetAttributeCharacteristic()
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
                        if (characteristic.Uuid.Equals(LockerConstants.WriteCharacteristicUuid))
                        {
                            writeCharacteristic = characteristic;
                            break;
                        }
                    }
                }
            }
        }

        public string GetAttributeName(BluetoothAttributeType attributeType)
        {
            switch (attributeType)
            {
                case BluetoothAttributeType.Service:
                    return DisplayHelper.GetServiceName(service);
                case BluetoothAttributeType.ReadCharacteristic:
                    return DisplayHelper.GetCharacteristicName(readCharacteristic);
                case BluetoothAttributeType.WriteCharacteristic:
                    return DisplayHelper.GetCharacteristicName(writeCharacteristic);
                default:
                    return "Invalid";
            }
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

        public void Dispose()
        {
            if (service != null)
                service.Dispose();
            if (readCharacteristic != null)
            {
                readCharacteristic.ValueChanged -= IncomingData_ValueChanged;
                readCharacteristic.service.Dispose();
            }
            if (writeCharacteristic != null)
            {
                writeCharacteristic.service.Dispose();
            }
            if (LockerDevice != null)
            {
                LockerDevice.ConnectionStatusChanged -= DeviceConnectionStatusChanged;
                LockerDevice = null;
            }
        }
    }
}
