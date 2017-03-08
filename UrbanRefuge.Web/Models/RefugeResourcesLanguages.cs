namespace UrbanRefuge.Web.Models
{
    public partial class RefugeResourcesLanguage
    {
        public int ResourceLanguageId { get; set; }
        public string Address { get; set; }
        public LanguageDisplayType DisplayType { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string Phone { get; set; }
        public int? RefugeResourceResourceId { get; set; }
        public string CultureInfo { get; set; }

        public virtual RefugeResource RefugeResource { get; set; }
        
    }

    public enum LanguageDisplayType
    {
        LTR = 0,
        RTL
    }
}
