
namespace Locker.Bluetooth.Core
{
    public enum NotifyType
    {
        StatusMessage,
        ErrorMessage
    };

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