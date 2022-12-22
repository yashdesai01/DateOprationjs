using Newtonsoft.Json;
using Rushabh_Date_and_Month_Calculation_.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Rushabh_Date_and_Month_Calculation_.Controllers
{
    public class DateMonthController : Controller
    {
        // GET: DateMonth
        private SqlConnection con;
        private void connection()
        {
            string constring = ConfigurationManager.ConnectionStrings["Local"].ToString();
            con = new SqlConnection(constring);
        }
        public ActionResult DateMonth()
        {
            return View();
        }

        public JsonResult AddThur(string values)
        {
            connection();
            int j = 0;
            //var model = JsonConvert.DeserializeObject<DateMonthMasterModel>(values);
            JavaScriptSerializer js = new JavaScriptSerializer();
            DateMonthMasterModel[] ThursdayDate = js.Deserialize<DateMonthMasterModel[]>(values);

            for (int i = 0; i < ThursdayDate.Length; i++)
            {
            SqlCommand cmd = new SqlCommand("AddThurDate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ThursdayDates", ThursdayDate[i].ThursdayDates);

            con.Open();
             j = cmd.ExecuteNonQuery();
            con.Close();

            }
            if (j == 1)
            {
                return Json("true");
            }
            else
            {
                return Json("false");
            }
           
        }

        public JsonResult AddWeekDay(string nxtSat, string nxtSun)
        {
            connection();
            int j = 0;
            //var model = JsonConvert.DeserializeObject<DateMonthMasterModel>(values);
            JavaScriptSerializer js = new JavaScriptSerializer();
            WeekDateMonthMasterModel[] SatDate = js.Deserialize<WeekDateMonthMasterModel[]>(nxtSat);
            WeekDateMonthMasterModel[] SunDate = js.Deserialize<WeekDateMonthMasterModel[]>(nxtSun);

            for (int i = 0; i < SatDate.Length; i++)
            {
                SqlCommand cmd = new SqlCommand("AddWeekDay", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@SatDates", string.IsNullOrEmpty(SatDate[i].SatDates) ? (object)DBNull.Value : SatDate[i].SatDates));
                if (i <= (SunDate.Length - 1))
                {
                cmd.Parameters.Add(new SqlParameter("@SunDates", string.IsNullOrEmpty(SunDate[i].SunDates) ? (object)DBNull.Value : SunDate[i].SunDates));
                }
                con.Open();
                j = cmd.ExecuteNonQuery();
                con.Close();

            }
            if (j == 1)
            {
                return Json("true");
            }
            else
            {
                return Json("false");
            }

        }

        public JsonResult AddStartEndMonSun(string StrtMon, string EndSun)
        {
            connection();
            int j = 0;
            //var model = JsonConvert.DeserializeObject<DateMonthMasterModel>(values);
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //DateMonthMasterModel[] ThursdayDate = js.Deserialize<DateMonthMasterModel[]>(values);

           
                SqlCommand cmd = new SqlCommand("AddStartEndMonSun", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StrtMon", StrtMon);
                cmd.Parameters.AddWithValue("@EndSun", EndSun);

                con.Open();
                j = cmd.ExecuteNonQuery();
                con.Close();

           
            if (j == 1)
            {
                return Json("true");
            }
            else
            {
                return Json("false");
            }

        }

        public JsonResult AddStartEndMon(string values)
        {
            connection();
            int j = 0;
            //var model = JsonConvert.DeserializeObject<DateMonthMasterModel>(values);
            JavaScriptSerializer js = new JavaScriptSerializer();
            MonthStartEndMondayModel[] Dates = js.Deserialize<MonthStartEndMondayModel[]>(values);

            for (int i = 0; i < Dates.Length; i++)
            {
                SqlCommand cmd = new SqlCommand("AddStartEndMon", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@MonDates", Dates[i].MonDates);
              

                con.Open();
                j = cmd.ExecuteNonQuery();
                con.Close();

            }
            if (j == 1)
            {
                return Json("true");
            }
            else
            {
                return Json("false");
            }

        }
    }
}