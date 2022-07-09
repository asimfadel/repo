using Microsoft.EntityFrameworkCore.Migrations;

namespace AsimAsses.Data.Migrations
{
    public partial class Second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Salary",
                table: "Employees",
                type: "decimal(15,4)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(7,4)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Salary",
                table: "Employees",
                type: "decimal(7,4)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(15,4)");
        }
    }
}
