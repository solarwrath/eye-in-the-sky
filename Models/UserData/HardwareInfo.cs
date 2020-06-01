using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KURSACH.Models.UserData
{
    public class HardwareInfo
    {
        public Dictionary<int, double> cpuLoad { get; set; }
        public double averageCPULoad { get; set; }
        public double memoryLoad { get; set; }
    }
}
