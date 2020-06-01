using KURSACH.DataAnalysers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KURSACH.Models.UserData
{
    public class DataRecord
    {
        public DateTime Timestamp { get; set; }
        [Key]
        [MaxLength(50)]
        public string ClientName { get; set; }
        [MaxLength(30)]
        public string Campus { get; set; }
        [MaxLength(20)]
        public string Floor { get; set; }
        [MaxLength(20)]
        public string Room { get; set; }
        [MaxLength(250)]
        public HardwareInfo HardwareInfo { get; set; }
        [MaxLength(20)]
        public GeneralHealthStatus HealthStatus { get; set; }
    }
}
