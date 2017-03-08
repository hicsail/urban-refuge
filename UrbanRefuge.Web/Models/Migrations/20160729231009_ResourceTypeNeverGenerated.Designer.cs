using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using UrbanRefuge.Web.Models;

namespace UrbanRefuge.Web.Migrations
{
    [DbContext(typeof(RefugeResourceContext))]
    [Migration("20160729231009_ResourceTypeNeverGenerated")]
    partial class ResourceTypeNeverGenerated
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("UrbanRefuge.Web.Models.RefugeResource", b =>
                {
                    b.Property<int>("ResourceId")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Latitude");

                    b.Property<double>("Longitude");

                    b.Property<int?>("PrimaryResourceTypeId");

                    b.HasKey("ResourceId")
                        .HasName("PK_RefugeResources");

                    b.HasIndex("PrimaryResourceTypeId")
                        .HasName("IX_RefugeResources_PrimaryTypeResourceTypeId");

                    b.ToTable("RefugeResources");
                });

            modelBuilder.Entity("UrbanRefuge.Web.Models.RefugeResourceResourceType", b =>
                {
                    b.Property<int>("ResourceTypeId");

                    b.Property<int>("RefugeResourceId");

                    b.HasKey("ResourceTypeId", "RefugeResourceId")
                        .HasName("PK_RefugeResourceResourceType");

                    b.HasIndex("RefugeResourceId")
                        .HasName("IX_RefugeResourceResourceType_RefugeResourceId");

                    b.HasIndex("ResourceTypeId")
                        .HasName("IX_RefugeResourceResourceType_ResourceTypeId");

                    b.ToTable("RefugeResourceResourceType");
                });

            modelBuilder.Entity("UrbanRefuge.Web.Models.RefugeResourcesLanguage", b =>
                {
                    b.Property<int>("ResourceLanguageId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("CultureInfo");

                    b.Property<int>("DisplayType");

                    b.Property<string>("Name");

                    b.Property<string>("Notes");

                    b.Property<string>("Phone");

                    b.Property<int?>("RefugeResourceResourceId");

                    b.HasKey("ResourceLanguageId")
                        .HasName("PK_RefugeResourcesLanguages");

                    b.HasIndex("RefugeResourceResourceId")
                        .HasName("IX_RefugeResourcesLanguages_RefugeResourceResourceId");

                    b.ToTable("RefugeResourcesLanguages");
                });

            modelBuilder.Entity("UrbanRefuge.Web.Models.ResourceType", b =>
                {
                    b.Property<int>("ResourceTypeId");

                    b.Property<string>("Name");

                    b.HasKey("ResourceTypeId")
                        .HasName("PK_ResourceTypes");

                    b.ToTable("ResourceTypes");
                });

            modelBuilder.Entity("UrbanRefuge.Web.Models.RefugeResource", b =>
                {
                    b.HasOne("UrbanRefuge.Web.Models.ResourceType", "PrimaryResourceType")
                        .WithMany("RefugeResources")
                        .HasForeignKey("PrimaryResourceTypeId");
                });

            modelBuilder.Entity("UrbanRefuge.Web.Models.RefugeResourceResourceType", b =>
                {
                    b.HasOne("UrbanRefuge.Web.Models.RefugeResource", "RefugeResource")
                        .WithMany("ResourceTypes")
                        .HasForeignKey("RefugeResourceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("UrbanRefuge.Web.Models.ResourceType", "ResourceType")
                        .WithMany("RefugeResourceResourceTypes")
                        .HasForeignKey("ResourceTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UrbanRefuge.Web.Models.RefugeResourcesLanguage", b =>
                {
                    b.HasOne("UrbanRefuge.Web.Models.RefugeResource", "RefugeResource")
                        .WithMany("Languages")
                        .HasForeignKey("RefugeResourceResourceId");
                });
        }
    }
}
