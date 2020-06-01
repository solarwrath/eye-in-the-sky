using KURSACH.Models.UserData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace KURSACH.DataAnalysers
{
    public enum ClientProblems
    {
        CPU_PROBLEM,
        RAM_PROBLEM
    }
    public enum GeneralHealthStatus
    {
        HEALTHY,
        WARNING,
        CRITICAL
    }

    public class HealthAnalyser
    {
        public GeneralHealthStatus HealthStatus;
        public List<ClientProblems> problems = new List<ClientProblems>();
        public void CheckAllProblems(HardwareInfo hardwareInfo)
        {
            Type abstractAnalyserType = typeof(HardwareInfoAnalyser);
            IEnumerable<Type> analysers = Assembly
                .GetAssembly(abstractAnalyserType)
                .GetTypes()
                .Where(type => type.IsSubclassOf(abstractAnalyserType));
            foreach (Type analyserType in analysers)
            {
                HardwareInfoAnalyser analyser = (HardwareInfoAnalyser)analyserType.GetConstructor(Type.EmptyTypes).Invoke(null);
                analyser.Analyse(hardwareInfo, problems);
            }
        }
        public void AnalyseGeneralStatus()
        {
            switch (problems.Count)
            {
                case 0:
                    HealthStatus = GeneralHealthStatus.HEALTHY;
                    break;
                case 1:
                case 2:
                    HealthStatus = GeneralHealthStatus.WARNING;
                    break;
                default:
                    HealthStatus = GeneralHealthStatus.CRITICAL;
                    break;
            }
        }
    }
}
