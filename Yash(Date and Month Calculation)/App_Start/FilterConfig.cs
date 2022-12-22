using System.Web;
using System.Web.Mvc;

namespace Rushabh_Date_and_Month_Calculation_
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
