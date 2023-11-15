using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Locker.Bluetooth.Schema
{
    public class RequestAttribute
    {
        public string DeviceId { get; set; }
        public byte[] Password { get; set; }
        public byte[] DeviceKey { get; set; }
        public RequestType requestType { get; set; }
    }
}
