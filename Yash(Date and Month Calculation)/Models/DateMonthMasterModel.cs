using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rushabh_Date_and_Month_Calculation_.Models
{
    public class DateMonthMasterModel
    {
        public string id { get; set; }
        public string ThursdayDates { get; set; }
    }
    public class WeekDateMonthMasterModel
    {
        public string id { get; set; }
        public string SatDates { get; set; }
        public string SunDates { get; set; }
    }

    public class MonthStartEndMondayModel
    {
        public string id { get; set; }
        public string MonDates { get; set; }
       
    }
}