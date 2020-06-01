using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KURSACH.Models.UserData
{
    public class ClientInfo
    {
        public HardwareInfo HardwareInfo { get; set; }
        public string ClientName { get; set; }
        public int Campus { get; set; }
        public int Floor { get; set; }
        public int Room { get; set; }
    }
}
