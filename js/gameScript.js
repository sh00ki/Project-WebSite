//<!--------------this website created by the authors:---------------------------->
//<!------------------Yoad Shiran   ID: 302978713--------------------------------->
//<!------------------Elya Bar-on   ID: 200553790--------------------------------->
//<!------------------Lior Sapir    ID: 304916562--------------------------------->
//<!------------------------------------------------------------------------------>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////-------------THIS IS THE JAVA SCRIPTS OF THE START (GAME) PAGE-------------------////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*jslint browser: true*/
/*global $, jQuery, alert*/
var jData;
// this varieable holds the correct answer
var correctAnswer = 0;
// this veraible is holding the total mistakes of the player
var totalMistakes = 0;
// this veraible is holding the total correct answers of the player
var totalCorrecrt = 0,
 
 
 
    timer = 0,
    intervaltime = 0;
//array that holding the diffcult words
//IMOPORTENT!!!!!!!
// in place 0 - the difficult word.
// in place 1 - the meaning of the word.נפטר
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
    ["לאבק   ", "לנקות מאבק"],
    ["סובטילי    ", "מעודן"],
    ["לדלוק    ", "לרדוף"],
    ["סוקר   ", "מתבונן"],
    ["ציקלון  ", "תרמיל, ילקוט, שק, אמתחת"],
    ["נול ", "מכונת אריגה"],
    ["נוקש  ", "נכשל"],
    ["וולונטרי  ", "נעשה מרצון, בהתנדבות"],
    ["וריאציה  ", " שינוי, נוסח אחר"]];
 
//this array is temporary and we dont know why yoad create it.....
//weird man...
//this array holds the previous random numbers for avoiding same answers
var randNumbersAnswers = [[-1], [-1], [-1], [-1], [-1]];
 
 
 
 
//this function is responsible to empty the answers always and keep the array set to rearrange
function initAnswers() {
    "use strict";
    timer = 20;
    /////// reset color of all textans id
    document.getElementById("textans1").style.color = "BLACK";
    document.getElementById("textans2").style.color = "BLACK";
    document.getElementById("textans3").style.color = "BLACK";
    document.getElementById("textans4").style.color = "BLACK";
    document.getElementById("textans5").style.color = "BLACK";
    /// enable the all radio buttom
    document.getElementById("inputTextOfWordAns1").disabled = false;
    document.getElementById("inputTextOfWordAns2").disabled = false;
    document.getElementById("inputTextOfWordAns3").disabled = false;
    document.getElementById("inputTextOfWordAns4").disabled = false;
    document.getElementById("inputTextOfWordAns5").disabled = false;
    //// clear radio button
    document.getElementById("inputTextOfWordAns1").checked = false;
    document.getElementById("inputTextOfWordAns2").checked = false;
    document.getElementById("inputTextOfWordAns3").checked = false;
    document.getElementById("inputTextOfWordAns4").checked = false;
    document.getElementById("inputTextOfWordAns5").checked = false;
    var i = 1;
    for (i; i < 5; i = i + 1) {
        randNumbersAnswers[i] = -1;
    }
}
function generateAnswers() {
    //initial the randNumbersAnswers
    "use strict";
    initAnswers();
 
    //this function will generate randomize answers but remember  the correct answer
 
    //random the place for the correct answer
    var j = Math.floor((Math.random() * 5)),
        correctPlace,
        k,
        flag,
        p = 0,
        counterAnswers = 0;
    randNumbersAnswers[j] = correctAnswer; //place the correct answer in random place
    correctPlace = j;
 
 
 
    //count the good numbers randomize for the array
    while (counterAnswers < 5) {
        //for case of positiong the wrong answer in correct answer
        if (counterAnswers === correctPlace) {
            counterAnswers = counterAnswers + 1;
            continue;
        }
 
        // random another place of word in array difficultWords for answer
        k = Math.floor((Math.random() * difficultWords.length));
 
 
        //check if it is not the correct answer cause now I need wrong answers for my array
        if (correctAnswer !== k) { //valid of not  randon the correct answer 
            //check if there is no previous random numbers for avoiding same answers
            flag = false;
            for (p = 0; p < 5; p++) {
                if (randNumbersAnswers[p] === k) {
                    flag = true;
                    break;
                }
            }
            // this is good for now cause I place the wrong answer after validation
            if (!flag) {
                randNumbersAnswers[counterAnswers] = k;
                counterAnswers++;
            } else {
                continue;
            }
        } else {
            continue;
        }
    }
    //show on screen the answers
    document.getElementById("textans1").value = "1: " + difficultWords[randNumbersAnswers[0]][1];
    document.getElementById("textans2").value = "2: " + difficultWords[randNumbersAnswers[1]][1];
    document.getElementById("textans3").value = "3: " + difficultWords[randNumbersAnswers[2]][1];
    document.getElementById("textans4").value = "4: " + difficultWords[randNumbersAnswers[3]][1];
    document.getElementById("textans5").value = "5: " + difficultWords[randNumbersAnswers[4]][1];

}
 
//this is function that suppose  to generate words
// we will change the senteces to words
function genrateWords() {
    $('#gameNextBTN').attr("disabled", true);
    // the part that responsible for random
    "use strict";
    var i = Math.floor((Math.random() * difficultWords.length)),
        j,
        correctPlace,
        name = 0,
        counterAnswers,
        k,
        p,
        flag;
    //console.log(i);
    // now choose the word by random
//    var name;
    document.getElementById("inputTextOfWord").textContent = difficultWords[i][0];
    name = difficultWords[i][1];
    correctAnswer = i;
    generateAnswers();


    document.getElementById("answer_text").textContent = "The Answers are:          (sign in circle) ";
 
}
 
 
function cleartime() {
    "use strict";
    clearInterval(intervaltime);
 
}

// calling every question to generate answers
function timerFunc() {
    "use strict";
    intervaltime = setInterval(function () {
        timer--;
        if (timer === -1) {
            document.getElementById("next_generate_word").addEventListener("click", genrateWords());
            var i;
 
            for (i = 1; i < 5; i++) {
                if (correctAnswer === randNumbersAnswers[i - 1]) {
                    document.getElementById("textans" + i).style.color = "#00FF00";
                }
            }
            cleartime();
            timerFunc();
        }
        document.getElementById("timer").innerHTML = "Time Left : "+timer +" sec";
        $("#time").html(timer);
    }, 1000);
}
 
 
function greenTheCorrectAnswer() {
    "use strict";
    // for marking the good answer
    if (correctAnswer === randNumbersAnswers[0]) {
        document.getElementById("textans1").style.color = "#00FF00";
    }
    if (correctAnswer === randNumbersAnswers[1]) {
        document.getElementById("textans2").style.color = "#00FF00";
    }
    if (correctAnswer === randNumbersAnswers[2]) {
        document.getElementById("textans3").style.color = "#00FF00";
    }
    if (correctAnswer === randNumbersAnswers[3]) {
        document.getElementById("textans4").style.color = "#00FF00";
    }
    if (correctAnswer === randNumbersAnswers[4]) {
        document.getElementById("textans5").style.color = "#00FF00";
    }
}
 
 
function resetPage() {
    "use strict";
    // every time when we want to switch or start game from begin
    cleartime();
    document.getElementById("inputTextOfWordAns1").disabled = true;
    document.getElementById("inputTextOfWordAns2").disabled = true;
    document.getElementById("inputTextOfWordAns3").disabled = true;
    document.getElementById("inputTextOfWordAns4").disabled = true;
    document.getElementById("inputTextOfWordAns5").disabled = true;
    document.getElementById("countTrueAnswers").innerHTML = totalCorrecrt;
    document.getElementById("countFalseAnswers").innerHTML = totalMistakes;

}
 
 
var flag_cur = 0;
 
function chooseAnswer1() {
    $('#gameNextBTN').attr("disabled", false);
    "use strict";
    //document.getElementById("inputTextOfWordAns1").addEventListener("click", alert("YOU CORRECT"));
    if (correctAnswer == randNumbersAnswers[0]) {
        document.getElementById("textans1").style.color = "#00FF00";
        jData[currUSER].rightAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalCorrecrt++;
    } else {
        document.getElementById("textans1").style.color = "RED";
        greenTheCorrectAnswer();
        jData[currUSER].wrongAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalMistakes++;
    }
    localStorage.setItem('jsonData', JSON.stringify(jData));
    resetPage();
}
// still controlling the chosen answer
function chooseAnswer2() {
    $('#gameNextBTN').attr("disabled", false);
    "use strict";
    if (correctAnswer == randNumbersAnswers[1]) {
        document.getElementById("textans2").style.color = "#00FF00";
        jData[currUSER].rightAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalCorrecrt++;
    } else {
        document.getElementById("textans2").style.color = "RED";
        greenTheCorrectAnswer();
        jData[currUSER].wrongAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalMistakes++;
    }
    localStorage.setItem('jsonData', JSON.stringify(jData));
    resetPage();
}
// still controlling the chosen answer
function chooseAnswer3() {
    $('#gameNextBTN').attr("disabled", false);
    "use strict";
    if (correctAnswer == randNumbersAnswers[2]) {
        document.getElementById("textans3").style.color = "#00FF00";
        jData[currUSER].rightAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalCorrecrt++;
    } else {
        document.getElementById("textans3").style.color = "RED";
        greenTheCorrectAnswer();
        jData[currUSER].wrongAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalMistakes++;
    }
    localStorage.setItem('jsonData', JSON.stringify(jData));
    resetPage();
}
// still controlling the chosen answer
function chooseAnswer4() {
    $('#gameNextBTN').attr("disabled", false);
    "use strict";
    if (correctAnswer == randNumbersAnswers[3]) {
        document.getElementById("textans4").style.color = "#00FF00";
        jData[currUSER].rightAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalCorrecrt++;
    } else {
        document.getElementById("textans4").style.color = "RED";
        greenTheCorrectAnswer();
        jData[currUSER].wrongAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalMistakes++;
    }
    localStorage.setItem('jsonData', JSON.stringify(jData));
    resetPage();
}
function chooseAnswer5() {
    $('#gameNextBTN').attr("disabled", false);
    "use strict";
    if (correctAnswer == randNumbersAnswers[4]) {
        document.getElementById("textans5").style.color = "#00FF00";
        jData[currUSER].rightAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalCorrecrt++;
    } else {
        document.getElementById("textans5").style.color = "RED";
        greenTheCorrectAnswer();
        jData[currUSER].wrongAns++;
        jData[currUSER].totalTime += 20 - timer;
        totalMistakes++;
    }
    localStorage.setItem('jsonData', JSON.stringify(jData));
    resetPage();
}
 
//function that on load
 
function stopGame() {
    "use strict";
    resetPage();
    totalMistakes = 0;
    totalCorrecrt = 0;
    intervaltime = 0;
}
function keepContinue()
{
    document.getElementById("answer_text").textContent = "To conntinue press start";
}
 
 
 
 
function loadPage() {
     
    "use strict";
    //get data from local storage
    jData = JSON.parse(localStorage.getItem('jsonData'));
    // this part is responsible for genrate words
    $("#start_generate_word").click(genrateWords);
    $("#next_generate_word").click(genrateWords);
    $("#next_generate_word").hide();
    $("#finish_generate_word").hide();
    $("answer_text").hide();
    $("#YourWordIs").hide(1000);
    resetPage();
    // feel the chosen of the player
    $("#inputTextOfWordAns1").click(chooseAnswer1);
    $("#inputTextOfWordAns2").click(chooseAnswer2);
    $("#inputTextOfWordAns3").click(chooseAnswer3);
    $("#inputTextOfWordAns4").click(chooseAnswer4);
    $("#inputTextOfWordAns5").click(chooseAnswer5);
    $("#btn_finish").click(keepContinue);
 
    $("#start_generate_word").click(function () {
         
        $("#inputTextOfWord").show(1000);
        $("#start_generate_word").hide(500);
        $("#next_generate_word").show(1000);
        $("#finish_generate_word").show(1000);
        $("answer_text").show(1000);
        document.getElementById("countTrueAnswers").innerHTML = 0;
        document.getElementById("countFalseAnswers").innerHTML = 0;
        $("#YourWordIs").show(1000);
         
        timerFunc();
         
    });
 
 
 
    $("#loginBtn").click(function () {
        stopGame();
        $("inputTextOfWord").hide(1000);
        $("#next_generate_word").hide(1000);
        $("#finish_generate_word").hide(1000);
        $("#start_generate_word").show(1000);
        $("answer_text").hide(1000);
        $("#YourWordIs").hide(1000);
    });
 
 
    $("#trainBtn").click(function () {
        stopGame();
        $("inputTextOfWord").hide(1000);
        $("#next_generate_word").hide(1000);
        $("#finish_generate_word").hide(1000);
        $("#start_generate_word").show(1000);
        $("answer_text").hide(1000);
        $("#YourWordIs").hide(1000);
    });
 
    $("#next_generate_word").click(function () {
        cleartime();
        timerFunc();
    });
 
    $("#finish_generate_word").click(function () {
        stopGame();
        $("inputTextOfWord").hide(1000);
        $("answer_text").hide(1000);
        $("#next_generate_word").hide(1000);
        $("#finish_generate_word").hide(1000);
        $("#start_generate_word").show(1000);
        $("#YourWordIs").hide(1000);
        document.getElementById("inputTextOfWord").innerHTML = null;
    });
 
 
 
}