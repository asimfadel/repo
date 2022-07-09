using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AsimAsses.Data.Models;
namespace AsimAsses.Data.Models
{
    public class EmployeeEntityTypeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable("Employees");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).IsRequired();
            builder
            .HasOne(x => x.Department)
            .WithMany(x => x.Employees)
            .HasForeignKey(x => x.DepartmentId);
        }
    }
}
