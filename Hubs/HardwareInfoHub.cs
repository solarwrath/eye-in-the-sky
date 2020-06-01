using KURSACH.DataAnalysers;
using KURSACH.Models.UserData;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace KURSACH.Hubs
{
    public class HardwareInfoHub : Hub
    {
        // key => computerName
        Dictionary<string, CollectedData> collectedData = new Dictionary<string, CollectedData>();
        public void OnClientData(CollectedData clientData)
        {
            string clientName = clientData.ClientInfo.ClientName;

            collectedData[clientName] = clientData;

            HealthAnalyser healthAnalyser = new HealthAnalyser();
            healthAnalyser.CheckAllProblems(clientData.ClientInfo.HardwareInfo);
            healthAnalyser.AnalyseGeneralStatus();
        }
        public void GetJsonData(string jsonData)
        {
            CollectedData collectedData = JsonConvert.DeserializeObject<CollectedData>(jsonData);
            this.OnClientData(collectedData);
        }

        /*public ClientHealthCheckResults AnalyzeClientData(CollectedData collectedData)
        {
            return new ClientHealthCheckResults(collectedData.ClientInfo.HardwareInfo);
        }*/

        /*public Task Result(string hoba)
        {
            CollectedData collectedData = JsonConvert.DeserializeObject<CollectedData>(hoba);
            return Clients.All.SendAsync("result", AnalyzeClientData(collectedData).GetGeneralStatus().ToString());
        }*/
        /*
        public async void GetComputersInfo(string group)
        {
            await Clients.Group(group).SendAsync("getComputerInfo");
        }
        public Task JoinGroup(string group)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, group);
        }*/
        public Task test(string json)
        {
            CollectedData collectedData = JsonConvert.DeserializeObject<CollectedData>(json);
            HealthAnalyser analyser = new HealthAnalyser();
            analyser.CheckAllProblems(collectedData.ClientInfo.HardwareInfo);
            return Clients.All.SendAsync("test", json);
        }

        public async Task RegisterClient()
        {            
            Dictionary<int, double> cpuLoad = new Dictionary<int, double>();
            cpuLoad.Add(1, 0.3);
            cpuLoad.Add(2, 0.2);

            await Clients.Caller.SendAsync("addPCData", JsonConvert.SerializeObject(new CollectedData
            {
                ClientInfo = new ClientInfo
                {
                    Campus = "Головний",
                    Floor = "Перший",
                    Room = "Хз",
                    ClientName = "Desktop-12345",
                    HardwareInfo = new HardwareInfo
                    {
                        cpuLoad = cpuLoad,
                        averageCPULoad = 0.25,
                        memoryLoad = 0.75,
                    }
                },
                DateTime = DateTime.Now
            }));
        }

        public async Task AddPCData(CollectedData collectedData )
        {
            await Clients.All.SendAsync("addPCData", JsonConvert.SerializeObject(collectedData));
        }
    }
}
