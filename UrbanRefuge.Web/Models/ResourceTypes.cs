using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace UrbanRefuge.Web.Models
{
    public partial class ResourceType
    {
        public ResourceType()
        {
            RefugeResourceResourceTypes = new HashSet<RefugeResourceResourceType>();
            RefugeResources = new HashSet<RefugeResource>();
        }

        public int ResourceTypeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<RefugeResourceResourceType> RefugeResourceResourceTypes { get; set; }
        public virtual ICollection<RefugeResource> RefugeResources { get; set; }
    }
}
