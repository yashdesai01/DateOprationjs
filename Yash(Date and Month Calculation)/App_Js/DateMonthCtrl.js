$(function () {
    $('#hdnThur').hide();
    var nxtThur = [];
    var nxtSat = [];
    var nxtSun = [];
    var AMondays = [];
});

function findThurs() {
    var TDate = $('#txtTDate').val();
    var FrmtDate = TDate.split("-");
    var SDate = new Date(FrmtDate[0], FrmtDate[1] - 1, FrmtDate[2]);
    console.log(SDate);
    getNextDayOfWeek(SDate,3)
}

function getNextDayOfWeek(SDate, dayOfWeek) {
    nxtThur = [];
    var resultDate = SDate;
    for (var i = 0; i < 10; i++) {
        resultDate.setDate((SDate.getDate() + 1) + (7 + dayOfWeek - SDate.getDay()) % 7);
        SDate = resultDate;
        nxtThur.push({ ThursdayDates: resultDate.toLocaleDateString() });
    }
    var HTMLData = [];
    for (var i = 0; i < nxtThur.length; i++) {
        HTMLData.push('<div>' + nxtThur[i].ThursdayDates + '</div>');
    }
    $("#txtNxtThrus").html(HTMLData.join(""));
    $('#hdnThur').show();

}

function findWeekDay() {
    var SDate = $('#txtSDate').val();
    var EDate = $('#txtEDate').val();
    var FrmtSDate = SDate.split("-");
    var FrmtEDate = EDate.split("-");
    var StrtDate = new Date(FrmtSDate[0], FrmtSDate[1] - 1, FrmtSDate[2]);
    var EndDate = new Date(FrmtEDate[0], FrmtEDate[1] - 1, FrmtEDate[2]);
    getWeekDay(StrtDate,EndDate,5,6)
}

function getWeekDay(StrtDate, EndDate, WeekDaySat, WeekDaySun) {
    var SDate = $('#txtSDate').val();
    var FrmtSDate = SDate.split("-");
    var StartDate = new Date(FrmtSDate[0], FrmtSDate[1] - 1, FrmtSDate[2]);
    nxtSat = [];
    nxtSun = [];
    var resultDate = StrtDate;
    var resultSunDate = StartDate;
        while (StrtDate < EndDate){
        resultDate.setDate((StrtDate.getDate() + 1) + (7 + WeekDaySat - StrtDate.getDay()) % 7);
            StrtDate = resultDate;
            if (StrtDate < EndDate) {
                nxtSat.push({ SatDates: resultDate.toLocaleDateString() });
            }
    }
   
    while (StartDate < EndDate) {
        resultSunDate.setDate((StartDate.getDate() + 1) + (7 + WeekDaySun - StartDate.getDay()) % 7);
        StartDate = resultSunDate;
        if (StartDate < EndDate) {
            nxtSun.push({ SunDates: resultSunDate.toLocaleDateString() });
        }
    }
   
    var HTMLSatData = [];
    var HTMLSunData = [];

    for (var i = 0; i < nxtSat.length; i++) {
        HTMLSatData.push('<div>' + nxtSat[i].SatDates + '</div>');
    }
    $("#divSaturday").html(HTMLSatData.join(""));
  
    for (var i = 0; i < nxtSun.length; i++) {
        HTMLSunData.push('<div>' + nxtSun[i].SunDates + '</div>');
    }
    $("#divSunday").html(HTMLSunData.join(""));
  
}

function findSEDate() {
    var TDate = $('#txtSEDate').val();
    var FrmtDate = TDate.split("-");
    var SDate = new Date(FrmtDate[0], FrmtDate[1] - 1, 1);
    var MDate = new Date(FrmtDate[0], FrmtDate[1] - 1, 1);
    var resultMondayDate = MDate;
    var resultSundayDate = SDate;
    var days = new Date(FrmtDate[0], FrmtDate[1], 0).getDate();
    var sundays = [8 - (new Date(FrmtDate[1] + '/01/' + FrmtDate[0]).getDay())];
    for (var i = sundays[0] + 7; i < days; i += 7) {
        sundays.push(i);
    }
    var maxLength = sundays.length;
    var EndSunday = new Date(FrmtDate[0], FrmtDate[1] - 1, sundays[maxLength - 1] );
    resultMondayDate.setDate((MDate.getDate() + 1) + (7 + 0 - MDate.getDay()) % 7);
    $('#divMonday').text(resultMondayDate.toLocaleDateString())

    $('#divESunday').text(EndSunday.toLocaleDateString())

}

function findSEMonDate() {
    var SMonth = $('#txtSMon').val();
    var EMonth = $('#txtEMon').val();
    var FrmtDate = SMonth.split("-");
    var FrmEDate = EMonth.split("-");
    var SMDate = new Date(FrmtDate[0], FrmtDate[1] - 1, 1);
    var EMDate = new Date(FrmEDate[0], FrmEDate[1] - 1, 1);
    AMondays = [];
    var HtmlSData = [];
    var HtmlEData = [];
    var j = 0;
    while (SMDate < EMDate) {
       
        var days = new Date(FrmtDate[0], parseInt(FrmtDate[1]) + j, 0).getDate();
        var Mondays = [9 - (new Date(parseInt(FrmtDate[1]) + j + '/01/' + FrmtDate[0]).getDay())];
        for (var i = Mondays[0] + 7; i < days; i += 7) {
            Mondays.push(i);
        }
        var maxLength = Mondays.length;
        var StartMonday = new Date(FrmtDate[0], (parseInt(FrmtDate[1]) + j) - 1, Mondays[0]);
        var EndMonday = new Date(FrmtDate[0], (parseInt(FrmtDate[1]) + j) - 1, Mondays[maxLength - 1]);
        if (EndMonday < EMDate) {
            AMondays.push({ MonDates: StartMonday.toLocaleDateString() });
            AMondays.push({ MonDates: EndMonday.toLocaleDateString() });
        }
        j++;
        SMDate = EndMonday;
        
    }
    for (var i = 0; i < AMondays.length; i++) {
        if (i % 2 == 0) {
            HtmlSData.push('<div>' + AMondays[i].MonDates + '</div>');
            $("#divMSMonday").html(HtmlSData.join(""));
        }
        else {
            HtmlEData.push('<div>' + AMondays[i].MonDates + '</div>');
            $("#divMEMonday").html(HtmlEData.join(""));
        }
    }
}
function SaveThur() {
    $.ajax({
        type: "post",
        url: "/DateMonth/AddThur",
        data: { values: JSON.stringify(nxtThur) },
        datatype: "json",
        cache: false,
        success: function (data) {
            if (data = true) {
                alert("Data Added SucessFully");
            }
           
        },
        error: function (xhr) {
            alert("Data Not Added");
        }
    });
}
function SaveWeekdays() {
    $.ajax({
        type: "post",
        url: "/DateMonth/AddWeekDay",
        data: { nxtSat: JSON.stringify(nxtSat), nxtSun: JSON.stringify(nxtSun) },
        datatype: "json",
        cache: false,
        success: function (data) {
            alert("Data Added SucessFully");
        },
        error: function (xhr) {
            alert("Data Not Added");
        }
    });
}

function SaveSEDay() {
    $.ajax({
        type: "post",
        url: "/DateMonth/AddStartEndMonSun",
        data: { StrtMon: $('#divMonday').text(), EndSun: $('#divESunday').text()},
        datatype: "json",
        cache: false,
        success: function (data) {
            alert("Data Added SucessFully");
        },
        error: function (xhr) {
            alert("Data Not Added");
        }
    });
}

function SaveSEMonday() {
    $.ajax({
        type: "post",
        url: "/DateMonth/AddStartEndMon",
        data: { values: JSON.stringify(AMondays) },
        datatype: "json",
        cache: false,
        success: function (data) {
            if (data = true) {
                alert("Data Added SucessFully");
            }

        },
        error: function (xhr) {
            alert("Data Not Added");
        }
    });
}