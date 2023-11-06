
namespace Locker.Bluetooth.Core
{
    public interface ILockerService
    {
        void SearchDevice();
        Task<string> PairDevice(string deviceId);
        Task<string> UnpairDevice(string deviceId);
        Task<string> ConnectDevice(string deviceId);
    }
}