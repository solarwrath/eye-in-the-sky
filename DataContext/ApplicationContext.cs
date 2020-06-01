using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KURSACH.DataContext
{
    public class ApplicationContext: IdentityDbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> context): base(context)
        {
        }
    }
}
