//<!--------------this website created by the authors:---------------------------->
//<!------------------Yoad Shiran   ID: 302978713--------------------------------->
//<!------------------Elya Bar-on   ID: 200553790--------------------------------->
//<!------------------Lior Sapir    ID: 304916562--------------------------------->
//<!------------------------------------------------------------------------------>
/*global $, jQuery, alert*/
//array that holding the diffcult words
//IMOPORTENT!!!!!!!
// in place 0 - the difficult word.
// in place 1 - the meaning of the word.
var difficultWords = [["בא אל אבותיו ", "נפטר"],
    ["באבו ", "בצעירותו"],
    ["באותות ובמופתים", "באופן משכנע, באמצעות הוכחות חותכות."],
    ["בבואה ", " דמות, המשתקפת במים או במראה."],
    ["הפרדה", "סגרגציה "],
    ["סדקית ", "שם כולל לחפצים קטנים, ובעיקר כלי תפירה"],
    ["סובטילי ", "מעודן"],
    ["סובסטרט ", "שכבה, מצע, בסיס, נדבך"],
    ["סומא ", "עיוור"],
    ["סטאטי ", "קבוע במקום."],
    ["הבאיש את ריחו", "הוציא לו שם רע"],
    ["הבליח  ", "נצנץ"],
    ["הדוניסט  ", "נהנתן"],
    ["קדורני  ", "קודר"],
    ["קולוניה  ", "מושבה"],
    ["קונדסות  ", "מעשי שובבות, תעלולים"],
    ["צחור  ", "לבן"],
    ["ציקלון  ", "תרמיל, ילקוט, שק, אמתחת"],
    ["נול ", "מכונת אריגה"],
    ["נוקש  ", "נכשל"],
    ["לאבק   ", "לנקות מאבק"],
    ["סובטילי    ", "מעודן"],
    ["לדלוק    ", "לרדוף"],
    ["סוקר   ", "מתבונן"],
    ["וולונטרי  ", "נעשה מרצון, בהתנדבות"],
    ["וריאציה  ", " שינוי, נוסח אחר"]];


//those variables is responsible for the time
var timer = 0;
var intervalTime = 0;
var go = 0;
//this veriable control the time that evey word change
var speedTime = 5000;
var speedTimeTemp = speedTime;
//this boolean is for the stop and wait
var stop = false;
var firstTimeStart = false;


//this function will clear the time
function cleartime2() {
    "use strict";
    clearInterval(intervalTime);
}

function timerFunc2() {
    "use strict";
    intervalTime = setInterval(function () {
        if (speedTimeTemp < 1000) {
            go = go + 1;
            if (go >= difficultWords.length) {
                go = 0;
                document.getElementById("pressStartTraning").textContent = difficultWords[go][0];
                document.getElementById("pressStartTraning1").textContent = difficultWords[go][1];
            }
            speedTimeTemp = speedTime;
        } else {
            if (go >= difficultWords.length) {
                go = 0;
            }
            document.getElementById("pressStartTraning").textContent = difficultWords[go][0];
            document.getElementById("pressStartTraning1").textContent = difficultWords[go][1];
            document.getElementById("timer2").innerHTML = "Your time is: " + Math.floor(speedTimeTemp / 1000);
            if (speedTimeTemp > speedTime - 1000) {
                $("#pressStartTraning").fadeIn(500);
                $("#pressStartTraning1").fadeIn(500);
            }
            if (speedTimeTemp < 2000) {
                $("#pressStartTraning").fadeOut(2000);
                $("#pressStartTraning1").fadeOut(2000);
            }

            speedTimeTemp -= 1000;
        }
    }, 1000);
}

//handle every change in speed
function speedFasterFunc() {
    "use strict";
    if (speedTime  > 2000) {
        speedTime -= 1000;
    }
    cleartime2();
    if(stop == true || firstTimeStart == true ) {
        timerFunc2();
    }
}
// for the bitton of the faster
function speedSlowFunc() {
    "use strict";
    if (speedTime < 11000) {
        speedTime += 1000;
    }
    cleartime2();
    if(stop == true || firstTimeStart == true ) {
        timerFunc2();
    }
}


//the function is the generator of al trainning including starting the time functions
//the main function of the train page


function stopAndResume() {
    "use strict";
    cleartime2();
    if (firstTimeStart === false && stop === false) {
        timerFunc2();
        document.getElementById("stopAndResumeTheTimer").textContent = "Stop";
        firstTimeStart = true;
        stop = false;
    } else if (stop === false) {
        cleartime2();
        document.getElementById("stopAndResumeTheTimer").textContent = "Continue";
        stop = true;
    } else if (stop === true) {
        timerFunc2();
        document.getElementById("stopAndResumeTheTimer").textContent = "Stop";
        stop = false;
    }
}

// on load function
function loadPage2() {
    "use strict";
    // this part of the button that is responsible for stop and resume the training
    $("#stopAndResumeTheTimer").click(stopAndResume);


    // this part of the button that is responsible for slower the training
    $("#slowTheTimer").click(speedSlowFunc);
    // this part of the button that is responsible for faster the training
    $("#fasterTheTimer").click(speedFasterFunc);

}