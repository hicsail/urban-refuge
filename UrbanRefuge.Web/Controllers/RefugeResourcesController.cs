using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.IdentityModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using UrbanRefuge.Web.Models;
using UrbanRefuge.Web.ViewModels;
using cloudscribe.Web.Pagination;
using Microsoft.AspNetCore.Authorization;

namespace UrbanRefuge.Web.Controllers
{
    [Authorize(ActiveAuthenticationSchemes = "Cookies", Policy = "Admin")]
    public class RefugeResourcesController : Controller
    {
        private const int DefaultPageSize = 15;
        private readonly RefugeResourceContext _context;

        public RefugeResourcesController(RefugeResourceContext context)
        {
            _context = context;
        }

        // GET: RefugeResources
        public async Task<IActionResult> Index(int? page, string query)
        {
            var refugeResources = _context.RefugeResources
                                            .Include(x => x.PrimaryResourceType)
                                            .Include(x => x.Languages)
                                            .Include(x => x.ResourceTypes)
                                            .AsQueryable();  //converts form includable to iquerable so can add search functionality


            var currentPageNum = page ?? 1;
            var offset = (DefaultPageSize * currentPageNum) - DefaultPageSize;

            var model = new RefugeResourcePagedViewModel();
            if (!String.IsNullOrEmpty(query))
            {
                refugeResources = refugeResources.Where(x => x.Languages.Any(l => l.Name.Contains(query)));
                model.Paging.TotalItems = refugeResources.Count();
            }

            model.Resources = await refugeResources.Skip(offset)
                                              .Take(DefaultPageSize)
                                              .Select(x => RefugeResourceViewModel.FromModel(x, SupportedCultures.GetCultureInfo(Contants.Arabic)))
                                              .ToListAsync();

            model.Paging.TotalItems = await refugeResources.CountAsync();
            model.Paging.CurrentPage = currentPageNum;
            model.Paging.ItemsPerPage = DefaultPageSize;
            model.Query = query;

            return View(model);
        }

        // GET: RefugeResources/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var refugeResource = await _context.RefugeResources
                                            .Include(x => x.PrimaryResourceType)
                                            .Include(x => x.Languages)
                                            .Include(x => x.ResourceTypes)
                                            .SingleOrDefaultAsync(x => x.ResourceId == id);


            if (refugeResource == null)
                return NotFound();

            var refugeResourceVm = RefugeResourceViewModel.FromModel(refugeResource, SupportedCultures.GetCultureInfo(Contants.Arabic));

            return View(refugeResourceVm);
        }

        // GET: RefugeResources/Create
        public IActionResult Create()
        {
            return View();
        }
        public static bool IsValidLatLong(double latitude, double longitude)
        {
            if (latitude < -90 || latitude > 90)
            {
                return false;
            }

            if (longitude < -180 || longitude > 180)
            {
                return false;
            }

            if (latitude == 0 && longitude == 0)
            {
                return false;
            }
            return true;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(RefugeResourceViewModel refugeResource)
        {
            ValidateResource(refugeResource);

            if (ModelState.IsValid)
            {
                var resource = _context.RefugeResources.Add(new RefugeResource()
                {
                    Latitude = refugeResource.Posistion.Latitude,
                    Longitude = refugeResource.Posistion.Longitude,
                    PrimaryResourceTypeId = (int)refugeResource.PrimaryType,
                    Languages = new List<RefugeResourcesLanguage>()
                    {
                        new RefugeResourcesLanguage()
                        {
                            Address = refugeResource.ResourceLanguage1.Address,
                            DisplayType = LanguageDisplayType.LTR,
                            Name = refugeResource.ResourceLanguage1.Name,
                            Notes = refugeResource.ResourceLanguage1.Notes,
                            Phone = refugeResource.ResourceLanguage1.Phone,
                            CultureInfo = Contants.EnglishUS
                        },
                        new RefugeResourcesLanguage()
                        {
                            Address = refugeResource.ResourceLanguage2.Address,
                            DisplayType = LanguageDisplayType.RTL,
                            Name = refugeResource.ResourceLanguage2.Name,
                            Notes = refugeResource.ResourceLanguage2.Notes,
                            CultureInfo = Contants.Arabic
                        }
                    },
                }).Entity;

                foreach (var type in refugeResource.Types)
                {
                    _context.RefugeResourceResourceType.Add(new RefugeResourceResourceType() { RefugeResourceId = resource.ResourceId, ResourceTypeId = (int)type });
                }

                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }


            return View(refugeResource);
        }

        // GET: RefugeResources/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var refugeResource = await _context.RefugeResources
                                            .Include(x => x.PrimaryResourceType)
                                            .Include(x => x.Languages)
                                            .Include(x => x.ResourceTypes)
                                            .SingleOrDefaultAsync(x => x.ResourceId == id);


            if (refugeResource == null)
                return NotFound();

            var refugeResourceVm = RefugeResourceViewModel.FromModel(refugeResource, SupportedCultures.GetCultureInfo(Contants.Arabic));

            return View(refugeResourceVm);
        }

        // POST: RefugeResources/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, RefugeResourceViewModel refugeResource)
        {
            if (id != refugeResource.ResourceId)
            {
                return NotFound();
            }

            ValidateResource(refugeResource);

            if (ModelState.IsValid)
            {
                try
                {
                    var resource = await _context.RefugeResources.Include(x => x.PrimaryResourceType)
                                            .Include(x => x.ResourceTypes)
                                            .SingleOrDefaultAsync(x => x.ResourceId == id);

                    if (resource == null)
                    {
                        return NotFound();
                    }

                    resource.PrimaryResourceTypeId = (int)refugeResource.PrimaryType;
                    resource.Longitude = refugeResource.Posistion.Longitude;
                    resource.Latitude = refugeResource.Posistion.Latitude;

                    var englishLanguage = await _context.RefugeResourcesLanguages
                                                        .SingleOrDefaultAsync(x => x.RefugeResourceResourceId == resource.ResourceId
                                                                                && x.CultureInfo == Contants.EnglishUS);
                    var araibic = await _context.RefugeResourcesLanguages
                                                        .SingleOrDefaultAsync(x => x.RefugeResourceResourceId == resource.ResourceId
                                                                                && x.CultureInfo == Contants.Arabic);

                    UpdateLanguage(refugeResource.ResourceLanguage1, englishLanguage);
                    UpdateLanguage(refugeResource.ResourceLanguage2, araibic);

                    var currentTypes = resource.ResourceTypes.Select(x => (ResourceTypes)x.ResourceTypeId).ToList();

                    var typesNotSelected = currentTypes.Except(refugeResource.Types).ToList();
                    foreach (var resourceTypese in typesNotSelected)
                    {
                        var refugeResourceResourceType = resource.ResourceTypes.First(x => x.ResourceTypeId == (int)resourceTypese);
                        resource.ResourceTypes.Remove(refugeResourceResourceType);
                    }

                    var newTypesSelected = refugeResource.Types.Except(currentTypes).ToList();
                    foreach (var type in newTypesSelected)
                    {
                        resource.ResourceTypes.Add(new RefugeResourceResourceType() { RefugeResourceId = resource.ResourceId, ResourceTypeId = (int)type });
                    }

                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RefugeResourceExists(refugeResource.ResourceId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index");
            }

            return View(refugeResource);
        }

        private void ValidateResource(RefugeResourceViewModel refugeResource)
        {
            if (refugeResource.PrimaryType == ResourceTypes.NotSet)
            {
                ModelState.AddModelError(string.Empty, "Please set a valid primary resource type.");
            }

            if (refugeResource.Types.Contains(ResourceTypes.NotSet))
            {
                ModelState.AddModelError(string.Empty, "Can have use Not Set as secondary type.");
            }

            if (!IsValidLatLong(refugeResource.Posistion.Latitude, refugeResource.Posistion.Longitude))
            {
                ModelState.AddModelError(string.Empty, "Please enter a valid lat/long.");
            }
        }

        private static void UpdateLanguage(RefugeResourcesLanguageViewModel vmLanguague, RefugeResourcesLanguage languageToUpdate)
        {
            languageToUpdate.Name = vmLanguague.Name;
            languageToUpdate.Address = vmLanguague.Address;
            languageToUpdate.Notes = vmLanguague.Notes;
            languageToUpdate.Phone = vmLanguague.Phone;
        }

        // GET: RefugeResources/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var refugeResource = await _context.RefugeResources
                                            .Include(x => x.PrimaryResourceType)
                                            .Include(x => x.Languages)
                                            .Include(x => x.ResourceTypes)
                                            .SingleOrDefaultAsync(x => x.ResourceId == id);


            if (refugeResource == null)
                return NotFound();

            var refugeResourceVm = RefugeResourceViewModel.FromModel(refugeResource, SupportedCultures.GetCultureInfo(Contants.Arabic));


            return View(refugeResourceVm);
        }

        // POST: RefugeResources/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            // includes are there for cascade delete https://docs.efproject.net/en/latest/saving/cascade-delete.html#cascading-to-tracked-entities
            var refugeResource = await _context.RefugeResources
                                            .Include(x => x.PrimaryResourceType)
                                            .Include(x => x.Languages)
                                            .Include(x => x.ResourceTypes)
                                            .SingleOrDefaultAsync(m => m.ResourceId == id);

            _context.RefugeResources.Remove(refugeResource);

            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool RefugeResourceExists(int id)
        {
            return _context.RefugeResources.Any(e => e.ResourceId == id);
        }
    }
}
