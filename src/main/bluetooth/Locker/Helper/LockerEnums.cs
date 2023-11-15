
namespace Locker.Bluetooth.Core
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

    public enum RequestType
    {
        REQUEST_NONE,
        REQUEST_OPEN,
        REQUEST_CLOSE,
        REQUEST_STATUS,
        REQUEST_BATTERY,
        REQUEST_CHANGE_PASSWORD,
        REQUEST_TIME_CLOSED
    };
}