using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KURSACH.Models.UserData
{
    public class ClientInfo
    {
        public HardwareInfo HardwareInfo { get; set; }
        [Key]
        public string ClientName { get; set; }
        public string Campus { get; set; }
        public string Floor { get; set; }
        public string Room { get; set; }
    }
}
