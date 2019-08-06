$(document).ready(function() {

    // var data = "sendData";
    // $(".utime_calendar").load("backend.php", {
    //     data: data
    // });

    function tasksShower(date) {
        var target = $(".timetable_plans_conntainer");
        var date = date;
        target.load("model/getTask.php", {
            date: date
        });
    }



    $(document).on("mousemove", function(ev) {
        var X = $('body').offset().left;
        var Y = $('body').offset().top;
        mouseX = ev.pageX - X;
        mouseY = ev.pageY - Y;
        // $(".position").html(mouseX + " and " +    mouseY);
        $(".planContOnMouse").css("top", mouseY + 10);
        $(".planContOnMouse").css("left", mouseX + 10);
    });

    $(document).on("mouseover", "td", function() {
        if ($(window).width() > 768) {
            if ($(this).html() != "") {
                $(".planContOnMouse").css("display", "block");
                if ($(this).hasClass("planTaken")) {
                    $(".planContOnMouse").css("background", "green");
                }
                $(".planContOnMouse").html($(this).attr("class").split(" ")[0]);
            } else {
                $(".planContOnMouse").css("display", "none");
                $(".planContOnMouse").css("background", "red");
            }
        }
    });

    $(document).on("mouseout", "td", function() {
        $(".planContOnMouse").css("display", "none");
        $(".planContOnMouse").css("background", "red");
    });

    $(document).on("click", ".changeCalendarMonth", function() {
        var UtimeMainBody = $(".Utime_main_body");
        var data = "something";
        var change = $(this).attr("data-id");
        var dayPgStatus = $(".eachDayTimeTableContainer").css("display");
        var monthPgStatus = $(".timeTableBody").css("display");
        UtimeMainBody.load("view/timetable.php" + change, {
            data: data,
            dayPgStatus: dayPgStatus,
            monthPgStatus: monthPgStatus
        });
        // alert(change);
    });

    $(document).on("click", "td", function() {
        // var m = $(this).attr("data-m");
        // var y = $(this).attr("data-y");
        // var d = $(this).attr("data-d");
        if ($(this).html() != "") {
            var target = $(".timetable_plans_conntainer");
            if ($(this).hasClass('today')) {
                var data = $(this).attr("class").split(" ")[1];
            } else if ($(this).hasClass('planTaken')) {
                var data = $(this).attr("class").split(" ")[0];
            } else {
                var data = $(this).attr("class");
            }
            tasksShower(data)
        } else {
            alert("it's not a day");
        }
    });




    $(document).on("click", ".addNewTaskBtn", function() {
        $(".newTaskCreatorContainer").toggle();
        $(".colorPickerBox").css("display", "none");
    });

    //task creator 


    $(document).on("click", ".showColorPickerBtn", function() {
        $(".colorPickerBox").toggle();
    });
    $(document).on("click", ".colorToPick", function() {
        var utColor = $(this).attr("data-color");
        $(".TaskCreatorHeader").css("background", utColor);
        $(".utColorHolder").val(utColor);
        $(".colorPickerBox").toggle();
    });

    $(document).on("click", ".newTaskSaveBtn", function() {
        var taskSubject = $(".newTasksubject").val();
        var taskPriority = $(".newTaskPriority").val();
        var taskDate = $(".TCDatePicker").val();
        var shour = $(".startHourPicker").val();
        var sminute = $(".startMinutePicker").val();
        var sampm = $(".startAmPmPicker").val();
        var ehour = $(".endHourPicker").val();
        var eminute = $(".endMinutePicker").val();
        var eampm = $(".endAmPmPicker").val();
        var taskEmotion = $(".newTaskEmotion").val();
        var ymd = taskDate.split("-");
        var Y = ymd[0];
        var M = ymd[1];
        var D = ymd[2];
        var dformat = "d" + Y + M + D;
        var utColor = $(".utColorHolder").val();
        if (utColor == "") {
            var utColor = "#3AC485";
        }
        var uid = $(this).attr("data-uid");

        $.post("model/newTaskCreator.php", {
            taskSubject: taskSubject,
            taskDate: taskDate,
            shour: shour,
            sminute: sminute,
            sampm: sampm,
            ehour: ehour,
            eminute: eminute,
            eampm: eampm,
            taskPriority: taskPriority,
            taskEmotion: taskEmotion,
            dformat: dformat,
            utColor: utColor,
            uid: uid
        });

        $(".newTaskCreatorContainer").toggle();
    });

    $(document).on("click", ".newTaskCancelBtn", function() {
        $(".newTaskCreatorContainer").toggle();
    });



});