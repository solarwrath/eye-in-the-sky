using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KURSACH.Models.UserData
{
    public class HardwareInfo
    {
        public Dictionary<int, double> CPULoad { get; set; }
        public double AverageCPULoad { get; set; }
        public double MemoryLoad { get; set; }
    }
}