using cloudscribe.Web.Pagination;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Reflection.Metadata;
using UrbanRefuge.Web.Models;


namespace UrbanRefuge.Web.ViewModels
{

    public class RefugeResourcePagedViewModel
    {
        public RefugeResourcePagedViewModel()
        {
            Paging = new PaginationSettings();
        }

        public string Query { get; set; } = string.Empty;

        public List<RefugeResourceViewModel> Resources { get; set; } = null;

        public PaginationSettings Paging { get; set; }
    }


    public class RefugeResourceLocationViewModelPaged
    {
        public RefugeResourceLocationViewModelPaged()
        {
            ResourceLocations = new List<RefugeResourceLocationViewModel>();
        }

        public List<RefugeResourceLocationViewModel> ResourceLocations { get; set; }
        public int NextPage { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }

    }

    public class RefugeResourceLocationViewModel
    {
        public int ResourceId { get; set; }
        public ResourceTypes PrimaryType { get; set; }
        public PositionViewModel Posistion { get; set; }
        public string Name { get; set; }
        public string NameLanguageTwo { get; set; }

        public static RefugeResourceLocationViewModel FromModel(RefugeResource resource, CultureInfo secondRequestedLanguage)
        {
            var firstLanguage = SupportedCultures.GetCultureInfo(Contants.EnglishUS);


            var refugeResourceLocationViewModel = new RefugeResourceLocationViewModel()
            {
                ResourceId = resource.ResourceId,
                Name = resource.Languages.FirstOrDefault(x => x.CultureInfo == firstLanguage.Name)?.Name,
                NameLanguageTwo = resource.Languages.FirstOrDefault(x => x.CultureInfo == secondRequestedLanguage.Name)?.Name,
                PrimaryType = (ResourceTypes)resource.PrimaryResourceType.ResourceTypeId,
                Posistion = new PositionViewModel()
                {
                    Latitude = resource.Latitude,
                    Longitude = resource.Longitude
                }
            };

            return refugeResourceLocationViewModel;

        }

    }

    public class SupportedCultures
    {
        public static CultureInfo GetCultureInfo(string cultureInfo)
        {
            if (cultureInfo == Contants.EnglishUS)
                return new CultureInfo(cultureInfo);

            if (cultureInfo == Contants.Arabic)
                return new CultureInfo(cultureInfo);

            throw new ArgumentException("You passed an not supported culture.");
        }
    }

    public class RefugeResourceViewModel
    {
        public int ResourceId { get; set; }
        public PositionViewModel Posistion { get; set; }
        public ResourceTypes PrimaryType { get; set; }
        public List<ResourceTypes> Types { get; set; }
        public RefugeResourcesLanguageViewModel ResourceLanguage1 { get; set; }
        public RefugeResourcesLanguageViewModel ResourceLanguage2 { get; set; }

        public static RefugeResourceViewModel FromModel(RefugeResource refugeResource, CultureInfo secondRequestedLanguage)
        {
            var firstLanguage = SupportedCultures.GetCultureInfo(Contants.EnglishUS);


            var refugeResourceViewModel = new RefugeResourceViewModel()
            {
                ResourceId = refugeResource.ResourceId,
                PrimaryType = (ResourceTypes)refugeResource.PrimaryResourceType.ResourceTypeId,
                Types = refugeResource.ResourceTypes.Select(x => (ResourceTypes)x.ResourceTypeId).ToList(),
                Posistion = new PositionViewModel()
                {
                    Longitude = refugeResource.Longitude,
                    Latitude = refugeResource.Latitude
                }
            };

            var lang1 = refugeResource.Languages.FirstOrDefault(x => x.CultureInfo == firstLanguage.Name);
            var lang2 = refugeResource.Languages.FirstOrDefault(x => x.CultureInfo == secondRequestedLanguage.Name);

            refugeResourceViewModel.ResourceLanguage1 = new RefugeResourcesLanguageViewModel()
            {
                Address = lang1.Address,
                Name = lang1.Name,
                CultureInfo = lang1.CultureInfo,
                DisplayType = lang1.DisplayType,
                Notes = lang1.Notes,
                Phone = lang1.Phone,

            };
            refugeResourceViewModel.ResourceLanguage2 = new RefugeResourcesLanguageViewModel()
            {
                Address = lang2.Address,
                Name = lang2.Name,
                CultureInfo = lang2.CultureInfo,
                DisplayType = lang2.DisplayType,
                Notes = lang2.Notes,
                Phone = lang2.Phone,
            }; ;

            return refugeResourceViewModel;
        }
    }

    public class RefugeResourcesLanguageViewModel
    {

        public string Address { get; set; }
        public LanguageDisplayType DisplayType { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string Phone { get; set; }
        public string CultureInfo { get; set; }

    }

    public class PositionViewModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public enum ResourceTypes
    {
        Education = 0,
        Housing,
        [Display(Name = "Cash Assistance")]
        CashAssistance,
        Health,
        Work,
        Other,
        NotSet = 99
    }

    public static class EumHelpers
    {
        public static ResourceTypes ToResourceType(this string s)
        {
            ResourceTypes type = ResourceTypes.NotSet;

            // second paramter is ignore case
            if (!Enum.TryParse(s, true, out type)) 
                type = ResourceTypes.NotSet;

            return type;
        }
    }
}