using KURSACH.Models.UserData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KURSACH.DataAnalysers
{
    public abstract class HardwareInfoAnalyser
    {
        public abstract void Analyse(HardwareInfo hardwareInfo, List<ClientProblems> problems);
    }
}
