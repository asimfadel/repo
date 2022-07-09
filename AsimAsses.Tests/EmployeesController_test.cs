using IdentityServer4.EntityFramework.Options;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using AsimAsses.Controllers;
using AsimAsses.Data;
using AsimAsses.Data.Models;
using Xunit;
namespace AsimAsses.Tests
{
    public class EmployeesController_Tests
    {
       
        /// Test the GetEmployee() method
        
        [Fact]
        public async void GetEmployee()
        {
            #region Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
.UseInMemoryDatabase(databaseName: "AsimAsses")
.Options;

            var storeOptions = Options.Create(new OperationalStoreOptions());

            using (var context = new ApplicationDbContext(options, storeOptions))
            {
                context.Add(new Employee()
                {
                    Id = 1,
                    Salary = 1,
                    JoinningDate = System.DateTime.Now,
                    Designation = "",
                    Department = null,
                    DepartmentId = 1
                });
                context.SaveChanges();
            }
            Employee employee_existing = null;
            Employee employee_notExisting = null;
            #endregion
            #region Act
            using (var context = new ApplicationDbContext(options, storeOptions))
            {
                var controller = new EmployeesController(context);
                employee_existing = (await controller.GetEmployee(1)).Value;
                employee_notExisting = (await controller.GetEmployee(2)).Value;
            }
            #endregion
            #region Assert
            Assert.NotNull(employee_existing);
            Assert.Null(employee_notExisting);
            #endregion
        }
    }
}