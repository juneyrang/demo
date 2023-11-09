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

        public LockerAttribute(GattDeviceService service)
        {
            this.service = service;
        }

        public string DeviceId { get; set; }

        public string GetName(BluetoothAttributeType attributeType)
        {

        }

        async void IncomingData_ValueChanged(GattCharacteristic sender, GattValueChangedEventArgs eventArgs)
        {
            byte[] readBytes = new byte[eventArgs.CharacteristicValue.Length];
            DataReader.FromBuffer(eventArgs.CharacteristicValue).ReadBytes(readBytes);

            byte[] resultBytes = PacketHelper.Decrypt(readBytes, PacketHelper.key);
            string message = System.Text.Encoding.UTF8.GetString(readBytes);

            OnIncomingDataChanged(new IncomingDataChangedEventArgs() { Message = message; });
        }

        public void Dispose()
        {
            readCharacteristic.ValueChanged += IncomingData_ValueChanged;
        }
    }
}
