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
        public string Result { get; set; }
    }

    public class DeviceLockerEventArgs
    {
        public LockerDeviceInfo Device { get; set; }
    }

    public class IncomingDataChangedEventArgs
    {
        public string ID { get; set; }
        public string Message { get; set; }
    }
}
