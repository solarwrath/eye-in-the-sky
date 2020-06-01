using KURSACH.Models.UserData;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KURSACH.DataContext
{
    public class ApplicationContext: IdentityDbContext
    {
        public DbSet<DataRecord> DataRecords { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> context): base(context)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<DataRecord>()
                .Property(dataRecord => dataRecord.HardwareInfo)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => (HardwareInfo)JsonConvert.DeserializeObject<HardwareInfo>(v));
        }
    }
}
