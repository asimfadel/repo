using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using AsimAsses.Data.Models;
using Microsoft.Extensions.Options;

namespace AsimAsses.Data
{
    public class ApplicationDbContext
: ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
        DbContextOptions options,
        IOptions<OperationalStoreOptions> operationalStoreOptions): base(options, operationalStoreOptions)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}