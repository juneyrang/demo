using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Locker.Bluetooth.Helper
{
    public class ConnectionResult
    {
        public string DeviceId { get; set; }
        public string Name { get; set; }
        public bool IsConnected { get; set; }
        public bool HasError { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class ConnectionStatusChangedEventArgs: EventArgs
    {
        public string DeviceId { get; set; }
        public bool IsConnected { get; set; }
    }

    public class IncomingValueChangedEventArgs
    {
        public string DeviceId { get; set; }
        public string Message { get; set; }
    }

    public class DeviceLockerEventArgs
    {
        public LockerDeviceInfo Device { get; set; }
    }

}
