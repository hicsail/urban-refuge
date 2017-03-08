using System.Collections.Generic;



namespace UrbanRefuge.Web.Models
{
    public partial class RefugeResource
    {
        public RefugeResource()
        {
            ResourceTypes = new HashSet<RefugeResourceResourceType>();
            Languages = new HashSet<RefugeResourcesLanguage>();
        }

        public int ResourceId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public int? PrimaryResourceTypeId { get; set; }
        public virtual ResourceType PrimaryResourceType { get; set; }

        public virtual ICollection<RefugeResourceResourceType> ResourceTypes { get; set; }
        public virtual ICollection<RefugeResourcesLanguage> Languages { get; set; }
        
    }
}
