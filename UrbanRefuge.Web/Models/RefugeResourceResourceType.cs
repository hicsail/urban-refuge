using UrbanRefuge.Web.ViewModels;

namespace UrbanRefuge.Web.Models
{
    public partial class RefugeResourceResourceType
    {
        public int ResourceTypeId { get; set; }
        public int RefugeResourceId { get; set; }

        public virtual RefugeResource RefugeResource { get; set; }
        public virtual ResourceType ResourceType { get; set; }
    }
}
