using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AsimAsses.Data.Models
{
    [Table("Employees")]
    public class Employee
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        [Column(TypeName = "decimal(15,4)")]
        public decimal Salary { get; set; }
        public DateTime JoinningDate { get; set; }
        public string Designation { get; set; }

        [ForeignKey(nameof(Department))]
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; }

    }
}
