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

        public LockerDeviceInfo DeviceInfo { get; set; }

        public LockerAttribute(GattDeviceService service)
        {
            this.service = service;
            SetAttributeCharacteristic();
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

            OnIncomingDataChanged(new IncomingDataChangedEventArgs() { ID = DeviceInfo.DeviceId, Message = message; });
        }

        public void Dispose()
        {
            readCharacteristic.ValueChanged -= IncomingData_ValueChanged;
        }
    }
}
