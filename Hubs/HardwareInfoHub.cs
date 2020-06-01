using KURSACH.DataAnalysers;
using KURSACH.Models.UserData;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using KURSACH.DataContext;

namespace KURSACH.Hubs
{
    public class HardwareInfoHub : Hub
    {
        private readonly ILogger<HardwareInfoHub> _logger;
        private readonly UserService _userService;
        private readonly ApplicationContext _applicationContext;
           
        public HardwareInfoHub(
            ILogger<HardwareInfoHub> logger,
            UserService userService,
            ApplicationContext applicationContext
            ) {
            _logger = logger;
            _userService = userService;
            _applicationContext = applicationContext;
        }

        public async Task RegisterClient()
        {
            var serializedDataRecords =
                _applicationContext.DataRecords.Select(dataRecord => JsonConvert.SerializeObject(dataRecord));
                       
            await Clients.Caller.SendAsync("addDataRecords", JsonConvert.SerializeObject(serializedDataRecords));

            await Task.Delay(5000).ContinueWith(async (t) =>
            {
                Dictionary<int, double> cpuLoad = new Dictionary<int, double>();
                cpuLoad.Add(1, 0.3);
                cpuLoad.Add(2, 0.2);
                
                await this.OnDataReceived(new CollectedData
                {
                    ClientInfo = new ClientInfo
                    {
                        Campus = "Головний",
                        Floor = "Перший",
                        Room = "Хз",
                        ClientName = "Desktop-12345",
                        HardwareInfo = new HardwareInfo
                        {
                            CPULoad = cpuLoad,
                            AverageCPULoad = 0.25,
                            MemoryLoad = 0.75,
                        }
                    },
                    DateTime = DateTime.Now
                });
            });
        }

        public async Task OnDataReceived(CollectedData collectedData) {
            _logger.LogError("Got information", collectedData);
            HealthAnalyser healthAnalyser = new HealthAnalyser();
            healthAnalyser.CheckAllProblems(collectedData.ClientInfo.HardwareInfo);
            healthAnalyser.AnalyseGeneralStatus();

            DataRecord dataRecord = new DataRecord
            {
                Timestamp = collectedData.DateTime,
                ClientName = collectedData.ClientInfo.ClientName,
                Campus = collectedData.ClientInfo.Campus,
                Room = collectedData.ClientInfo.Room,
                HardwareInfo = collectedData.ClientInfo.HardwareInfo,
                HealthStatus = healthAnalyser.HealthStatus,
            };

            _logger.LogError(JsonConvert.SerializeObject(dataRecord));

            var persistedDataRecord = _applicationContext.DataRecords
                .FirstOrDefault(persistedDataRecord => persistedDataRecord.ClientName == dataRecord.ClientName);
            _logger.LogError(JsonConvert.SerializeObject(persistedDataRecord));

            if (persistedDataRecord != null)
            {
                _applicationContext.Entry(persistedDataRecord).CurrentValues.SetValues(dataRecord);
            }
            else
            {
                await _applicationContext.AddAsync(dataRecord);
            }

            await _applicationContext.SaveChangesAsync();
            _logger.LogError("we saved");

            await Clients.All.SendAsync("addDataRecord", JsonConvert.SerializeObject(dataRecord));
        }

        public async Task TryRegisterUser(string username, string password)
        {
            var signUpResult = await _userService.TrySignUpUserAsync(username, password);

            await Clients.Caller.SendAsync("SignUpResult", signUpResult == null || signUpResult.Count() == 0);
        }

        public async Task TryLoginUser(string username, string password)
        {
            var signInResult = await _userService.TryLoginUserAsync(username, password);

            await Clients.Caller.SendAsync("LoginResult", signInResult);
        }
    }
}
