using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace UrbanRefuge.Web.Models
{
    public class RefugeResourceContext : DbContext
    {
        public RefugeResourceContext(DbContextOptions<RefugeResourceContext> options)
            : base(options)
        {

        }

        public RefugeResourceContext()
            : base(new DbContextOptionsBuilder<RefugeResourceContext>().UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=UrbanRefuge;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False").Options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<RefugeResourceResourceType>(entity =>
            {
                entity.HasKey(e => new { e.ResourceTypeId, e.RefugeResourceId })
                    .HasName("PK_RefugeResourceResourceType");

                entity.HasIndex(e => e.RefugeResourceId)
                    .HasName("IX_RefugeResourceResourceType_RefugeResourceId");

                entity.HasIndex(e => e.ResourceTypeId)
                    .HasName("IX_RefugeResourceResourceType_ResourceTypeId");

                entity.HasOne(d => d.RefugeResource)
                    .WithMany(p => p.ResourceTypes)
                    .HasForeignKey(d => d.RefugeResourceId);

                entity.HasOne(d => d.ResourceType)
                    .WithMany(p => p.RefugeResourceResourceTypes)
                    .HasForeignKey(d => d.ResourceTypeId);
            });

            modelBuilder.Entity<RefugeResource>(entity =>
            {
                entity.HasKey(e => e.ResourceId)
                    .HasName("PK_RefugeResources");

                entity.HasIndex(e => e.PrimaryResourceTypeId)
                    .HasName("IX_RefugeResources_PrimaryTypeResourceTypeId");

                entity.HasOne(d => d.PrimaryResourceType)
                    .WithMany(p => p.RefugeResources)
                    .HasForeignKey(d => d.PrimaryResourceTypeId);
            });

            modelBuilder.Entity<RefugeResourcesLanguage>(entity =>
            {
                entity.HasKey(e => e.ResourceLanguageId)
                    .HasName("PK_RefugeResourcesLanguages");

                entity.HasIndex(e => e.RefugeResourceResourceId)
                    .HasName("IX_RefugeResourcesLanguages_RefugeResourceResourceId");

                entity.HasOne(d => d.RefugeResource)
                    .WithMany(p => p.Languages)
                    .HasForeignKey(d => d.RefugeResourceResourceId);


            });

            modelBuilder.Entity<ResourceType>(entity =>
            {
                entity.HasKey(e => e.ResourceTypeId)
                    .HasName("PK_ResourceTypes");

                entity.Property(x => x.ResourceTypeId).ValueGeneratedNever();
            });
        }

        public DbSet<RefugeResource> RefugeResources { get; set; }
        public DbSet<RefugeResourcesLanguage> RefugeResourcesLanguages { get; set; }
        public DbSet<ResourceType> ResourceTypes { get; set; }
        public virtual DbSet<RefugeResourceResourceType> RefugeResourceResourceType { get; set; }
    }

    // https://github.com/aspnet/EntityFramework/issues/5786
    public static class RefugeeContextExtensions
    {
        public static void DropAndRecreate(this DatabaseFacade database)
        {
            database.EnsureDeleted();
            database.Migrate();
        }

        public static void EnsureSeedData(this RefugeResourceContext context)
        {
            //context.Database.DropAndRecreate();

            if (!context.ResourceTypes.Any())
            {

                ResourceType edu = null;
                ResourceType housing = null;
                ResourceType cash = null;
                ResourceType health = null;
                ResourceType work = null;
                ResourceType other = null;
                using (var transaction = context.Database.BeginTransaction())
                {

                    context.Database.ExecuteSqlCommand(@"SET IDENTITY_INSERT [dbo].[ResourceTypes] ON");
                    edu =
                        context.ResourceTypes.Add(new ResourceType() { Name = "Education", ResourceTypeId = 0 }).Entity;
                    housing =
                       context.ResourceTypes.Add(new ResourceType() { Name = "Housing", ResourceTypeId = 1 }).Entity;
                    cash =
                       context.ResourceTypes.Add(new ResourceType() { Name = "CashAssistance", ResourceTypeId = 2 })
                           .Entity;
                    health =
                       context.ResourceTypes.Add(new ResourceType() { Name = "Health", ResourceTypeId = 3 }).Entity;
                    work = context.ResourceTypes.Add(new ResourceType() { Name = "Work", ResourceTypeId = 4 }).Entity;
                    other =
                       context.ResourceTypes.Add(new ResourceType() { Name = "Other", ResourceTypeId = 5 }).Entity;

                    context.SaveChanges();
                    context.Database.ExecuteSqlCommand(@"SET IDENTITY_INSERT [dbo].[ResourceTypes] OFF");

                    transaction.Commit();
                }
                var resource1 = context.RefugeResources.Add(new RefugeResource()
                {
                    Latitude = 42.34859824590951,
                    Longitude = -71.09280397184193,
                    PrimaryResourceTypeId = edu.ResourceTypeId,
                    Languages = new List<RefugeResourcesLanguage>()
                    {
                        new RefugeResourcesLanguage()
                        {
                            Address = $"771 Albany St, 7th Floor, Boston, MA 02118",
                            DisplayType = LanguageDisplayType.LTR,
                            Name = "Sample location",
                            Notes = "Sample Notes.  Probably want to try with really long string that has lots of intersting things in it.",
                            Phone = "111-111-1111",
                            CultureInfo = Contants.EnglishUS
                        },
                        new RefugeResourcesLanguage()
                        {
                            Address = "???? ?? ???",
                            DisplayType = LanguageDisplayType.RTL,
                            Name = " ???? ?? ???",
                            Notes = $"????? ??????. ???? ???? ?? ???? ?? ????? ????? ???? ?? ?????? ?? ?????? ???? ???? ?? ???.",
                            Phone = "11111111111111",
                            CultureInfo = Contants.Arabic
                        }
                    },
                }).Entity;


                var resource2 = context.RefugeResources.Add(new RefugeResource()
                {
                    Latitude = 42.3736158,
                    Longitude = -71.1097335,
                    PrimaryResourceTypeId = health.ResourceTypeId,
                    Languages = new List<RefugeResourcesLanguage>()
                    {
                        new RefugeResourcesLanguage()
                        {
                            Address = "Address2",
                            DisplayType = LanguageDisplayType.LTR,
                            Name = "another location",
                            Notes = "realllyy loooooooooooooooooooooooooooooooooooooooo oooo oooo ooooooooooo ooooooo ooooooooooooooooooooooooooooo oooooooooooooooooooooooooo ooooooooooooooooo ooooooooooo oooo ooooooong.",
                            Phone = "2222222222",
                            CultureInfo = Contants.EnglishUS
                        },
                        new RefugeResourcesLanguage()
                        {
                            Address = " ??????. ???? ",
                            DisplayType = LanguageDisplayType.RTL,
                            Name = " ???? ?? ???",
                            Notes = $"????? ??????. ???? ???? ?? ???? ?? ????? ????? ???? ?? ?????? ?? ?????? ???? ???? ?? ???.",
                            Phone = "222222222222222",
                            CultureInfo = Contants.Arabic
                        }
                    },

                }).Entity;


                context.SaveChanges();

                context.RefugeResourceResourceType.Add(new RefugeResourceResourceType() { RefugeResourceId = resource2.ResourceId, ResourceTypeId = work.ResourceTypeId });
                context.RefugeResourceResourceType.Add(new RefugeResourceResourceType() { RefugeResourceId = resource2.ResourceId, ResourceTypeId = other.ResourceTypeId });

                context.RefugeResourceResourceType.Add(new RefugeResourceResourceType() { RefugeResourceId = resource1.ResourceId, ResourceTypeId = housing.ResourceTypeId });
                context.RefugeResourceResourceType.Add(new RefugeResourceResourceType() { RefugeResourceId = resource1.ResourceId, ResourceTypeId = cash.ResourceTypeId });

                context.SaveChanges();

            }

        }



    }
}