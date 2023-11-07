using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Locker.Bluetooth.Helper
{
    public class LockerDeviceInfo
    {
        public string DeviceId { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDefault { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string DeviceKey { get; set; }
        public bool IsPaired { get; set; }
        public bool IsConnected { get; set; }
        public string Kind { get; set; }
        public Dictionary<string, object> Properties { get; set; }
        public int BatteryPercent { get; set; }
    }

    public class ConnectionStatusChangedEventArgs: EventArgs
    {
        public bool IsConnected { get; set; }
        public string Result { get; set; }
    }

}
