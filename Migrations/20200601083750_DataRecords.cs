using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KURSACH.Migrations
{
    public partial class DataRecords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DataRecords",
                columns: table => new
                {
                    ClientName = table.Column<string>(nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Campus = table.Column<string>(nullable: true),
                    Floor = table.Column<string>(nullable: true),
                    Room = table.Column<string>(nullable: true),
                    HardwareInfo = table.Column<string>(nullable: true),
                    HealthStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataRecords", x => x.ClientName);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DataRecords");
        }
    }
}
