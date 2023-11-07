using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Locker.Bluetooth.Helper
{
    public class ConnectionStatusChangedEventArgs: EventArgs
    {
        public bool IsConnected { get; set; }
    }

    public class DeviceLockerEventArgs
    {
        public LockerDeviceInfo Device { get; set; }
    }
}
