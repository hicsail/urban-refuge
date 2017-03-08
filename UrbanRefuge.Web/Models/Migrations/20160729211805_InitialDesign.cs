using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace UrbanRefuge.Web.Migrations
{
    public partial class InitialDesign : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ResourceTypes",
                columns: table => new
                {
                    ResourceTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceTypes", x => x.ResourceTypeId);
                });

            migrationBuilder.CreateTable(
                name: "RefugeResources",
                columns: table => new
                {
                    ResourceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Latitude = table.Column<double>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    PrimaryResourceTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefugeResources", x => x.ResourceId);
                    table.ForeignKey(
                        name: "FK_RefugeResources_ResourceTypes_PrimaryResourceTypeId",
                        column: x => x.PrimaryResourceTypeId,
                        principalTable: "ResourceTypes",
                        principalColumn: "ResourceTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RefugeResourceResourceType",
                columns: table => new
                {
                    ResourceTypeId = table.Column<int>(nullable: false),
                    RefugeResourceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefugeResourceResourceType", x => new { x.ResourceTypeId, x.RefugeResourceId });
                    table.ForeignKey(
                        name: "FK_RefugeResourceResourceType_RefugeResources_RefugeResourceId",
                        column: x => x.RefugeResourceId,
                        principalTable: "RefugeResources",
                        principalColumn: "ResourceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RefugeResourceResourceType_ResourceTypes_ResourceTypeId",
                        column: x => x.ResourceTypeId,
                        principalTable: "ResourceTypes",
                        principalColumn: "ResourceTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefugeResourcesLanguages",
                columns: table => new
                {
                    ResourceLanguageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Address = table.Column<string>(nullable: true),
                    CultureInfo = table.Column<string>(nullable: true),
                    DisplayType = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    RefugeResourceResourceId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefugeResourcesLanguages", x => x.ResourceLanguageId);
                    table.ForeignKey(
                        name: "FK_RefugeResourcesLanguages_RefugeResources_RefugeResourceResourceId",
                        column: x => x.RefugeResourceResourceId,
                        principalTable: "RefugeResources",
                        principalColumn: "ResourceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefugeResources_PrimaryTypeResourceTypeId",
                table: "RefugeResources",
                column: "PrimaryResourceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_RefugeResourceResourceType_RefugeResourceId",
                table: "RefugeResourceResourceType",
                column: "RefugeResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_RefugeResourceResourceType_ResourceTypeId",
                table: "RefugeResourceResourceType",
                column: "ResourceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_RefugeResourcesLanguages_RefugeResourceResourceId",
                table: "RefugeResourcesLanguages",
                column: "RefugeResourceResourceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefugeResourceResourceType");

            migrationBuilder.DropTable(
                name: "RefugeResourcesLanguages");

            migrationBuilder.DropTable(
                name: "RefugeResources");

            migrationBuilder.DropTable(
                name: "ResourceTypes");
        }
    }
}
