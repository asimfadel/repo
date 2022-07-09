using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AsimAsses.Data.Models
{
    [Table("Departments")]
    public class Department
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual List<Employee> Employees { get; set; }
    }
}
