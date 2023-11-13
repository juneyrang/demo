
namespace Pas.Bluetooth.Core
{
    public enum NotifyType
    {
        StatusMessage,
        ErrorMessage
    };

    public enum BluetoothAttributeType
    {
        Service = 0,
        ReadCharacteristic = 1,
        WriteCharacteristic = 2,
        Descriptor = 3
    }

    public class ConnectionStatusChangedEventArgs: EventArgs
    {
        public bool IsConnected { get; set; }
    }

    public enum PacketType
    {
        LOCKER_OPEN,
        LOCKER_CLOSE,
        LOCKER_STATUS,
        LOCKER_BATTERY,
        LOCKER_CHANGE_PASSWORD,
        LOCKER_TIME_CLOSED
    };
}