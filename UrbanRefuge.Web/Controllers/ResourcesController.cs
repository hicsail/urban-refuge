using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UrbanRefuge.Web.Models;
using UrbanRefuge.Web.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace UrbanRefuge.Web.Controllers
{
    [Route("api/[controller]")]
    public class ResourcesController : Controller
    {
        private readonly RefugeResourceContext _resourceContext;

        // Added paging to return top 50 but is not currently implemented on client side.
        // Limited to 50 for now becuase it is unlikely we will have that much initially
        // but incase we do don't want to pull back hundreds of records.
        private const int DefaultPageSize = 50;

        public ResourcesController(RefugeResourceContext resourceContext)
        {
            _resourceContext = resourceContext;
        }

        [HttpGet]
        [Route("locations/{type}")]
        public async Task<IActionResult> GetResourceLocations(string type, int? page)
        {
            var resourceType = type.ToResourceType();
            if (resourceType == ResourceTypes.NotSet)
                return NotFound();

            var currentPageNum = page ?? 1;
            var offset = (DefaultPageSize * currentPageNum) - DefaultPageSize;


            var refugeResources = _resourceContext.RefugeResources
                                                .Include(x => x.PrimaryResourceType)
                                                .Include(x => x.Languages)
                                                .Where(x => x.PrimaryResourceType.ResourceTypeId == (int)resourceType
                                                            || x.ResourceTypes.Any(y => y.ResourceTypeId == (int)resourceType));

            var resouceVm = await refugeResources.Skip(offset)
                .Take(DefaultPageSize)
                .Select(
                    x =>
                        RefugeResourceLocationViewModel.FromModel(x,
                            SupportedCultures.GetCultureInfo(Contants.Arabic)))
                .ToListAsync();

            var pagedLocations = new RefugeResourceLocationViewModelPaged()
            {
                ResourceLocations = resouceVm
            };
            pagedLocations.CurrentPage = currentPageNum;
            pagedLocations.NextPage = currentPageNum + 1;
            pagedLocations.PageSize = DefaultPageSize;

            return Ok(pagedLocations);
        }

        [HttpGet]
        [Route("{id:min(0)}")]
        public IActionResult GetResource(int id)
        {
            var refugeResource = _resourceContext.RefugeResources
                                                .Include(x => x.PrimaryResourceType)
                                                .Include(x => x.Languages)
                                                .Include(x => x.ResourceTypes)
                                                .FirstOrDefault(x => x.ResourceId == id);

            if (refugeResource == null)
                return NotFound();

            var refugeResourceVm = RefugeResourceViewModel.FromModel(refugeResource, SupportedCultures.GetCultureInfo(Contants.Arabic));

            return Ok(refugeResourceVm);
        }
    }
}
