using KURSACH.Models.UserData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KURSACH.DataAnalysers
{
    public class CPUAnalyser : HardwareInfoAnalyser
    {
        public override void Analyse(HardwareInfo hardwareInfo, List<ClientProblems> problems)
        {
            if (hardwareInfo.AverageCPULoad > 70)
                problems.Add(ClientProblems.CPU_PROBLEM);
        }
    }
}
