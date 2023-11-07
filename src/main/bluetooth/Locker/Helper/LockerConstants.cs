
namespace Locker.Bluetooth.Core
{
    public class LockerConstants
    {
        public static readonly String LockerName = "SSG001";

        public static readonly Guid ServiceUuid = Guid.Parse("0000fee7-0000-1000-8000-00805f9b34fb");
        public static readonly Guid ReadCharacteristicUuid = Guid.Parse("000036f6-0000-1000-8000-00805f9b34fb");
        public static readonly Guid WriteCharacteristicUuid = Guid.Parse("000036f5-0000-1000-8000-00805f9b34fb");
    }
}