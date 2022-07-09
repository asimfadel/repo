using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AsimAsses.Data;
using AsimAsses.Data.Models;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Authorization;

namespace AsimAsses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DepartmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Departments
        [HttpGet]
        public async Task<ActionResult<ApiResult<Department>>> GetDepartments(int pageIndex = 0, int pageSize = 10,
           string sortColumn = null, string sortOrder = null,
           string filterColumn = null,
           string filterQuery = null)
        {
            return await ApiResult<Department>.CreateAsync(
            _context.Departments,
            pageIndex,
            pageSize,
            sortColumn,
            sortOrder,
            filterColumn,
            filterQuery);
        }

        // GET: api/Departments/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }

        // PUT: api/Departments/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, Department department)
        {
            if (id != department.Id)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Departments
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.Id }, department);
        }

        // DELETE: api/Departments/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartmentExists(int id)
        {
            return _context.Departments.Any(e => e.Id == id);
        }

        [HttpPost]
        [Route("IsDupeField")]
        public bool IsDupeField(int countryId, string fieldName, string fieldValue)
        {
    

            return (ApiResult<Department>.IsValidProperty(fieldName, true))
            ? _context.Departments.Any(string.Format("{0} == @0 && Id != @1", fieldName)
            , fieldValue, countryId) : false;
        }

    }
}
