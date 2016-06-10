//<!--------------this website created by the authors:---------------------------->
//<!------------------Yoad Shiran   ID: 302978713--------------------------------->
//<!------------------Elya Bar-on   ID: 200553790--------------------------------->
//<!------------------Lior Sapir    ID: 304916562--------------------------------->
//<!------------------------------------------------------------------------------>
var jData2 = JSON.parse(localStorage.getItem('jsonData'));
var currUSER2 = localStorage.getItem('currentUserIndex');

var game2Words = [["בא אל אבותיו ", "נפטר"],
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
    ["לאבק   ", "לנקות מאבק"],
    ["סובטילי    ", "מעודן"],
    ["לדלוק    ", "לרדוף"],
    ["סוקר   ", "מתבונן"],
    ["נוקש  ", "נכשל"],
    ["וולונטרי  ", "נעשה מרצון, בהתנדבות"],
    ["וריאציה  ", " שינוי, נוסח אחר"]];
//first place represent the question and last 4 are the questions
var game2WordsArr = [-1,-1,-1,-1,-1];
var correctAnswer2 = 0;
var clickedFlag = false;
function initAnswers2() {
    "use strict";
    var i = 1;
    for (i; i < 5; i = i + 1) {
        game2WordsArr[i] = -1;
    }
}

function generateAnswers2() {
    //initial the randNumbersAnswers
    "use strict";
    initAnswers2();

    //this function will generate randomize answers but remember  the correct answer

    //random the place for the correct answer
    var j = Math.floor((Math.random() * 5)),
        correctPlace,
        k,
        flag,
        p = 0,
        counterAnswers = 0;
    game2WordsArr[j] = correctAnswer2; //place the correct answer in random place
    correctPlace = j;



    //count the good numbers randomize for the array
    while (counterAnswers < 5) {
        //for case of positiong the wrong answer in correct answer
        if (counterAnswers === correctPlace) {
            counterAnswers = counterAnswers + 1;
            continue;
        }

        // random another place of word in array difficultWords for answer
        k = Math.floor((Math.random() * game2Words.length));


        //check if it is not the correct answer cause now I need wrong answers for my array
        if (correctAnswer2 !== k) { //valid of not  randon the correct answer
            //check if there is no previous random numbers for avoiding same answers
            flag = false;
            for (p = 0; p < 5; p++) {
                if (game2WordsArr[p] === k) {
                    flag = true;
                    break;
                }
            }
            // this is good for now cause I place the wrong answer after validation
            if (!flag) {
                game2WordsArr[counterAnswers] = k;
                counterAnswers++;
            } else {
                continue;
            }
        } else {
            continue;
        }
    }
    document.getElementById("ans1Game2").innerHTML = game2Words[game2WordsArr[0]][1];
    document.getElementById("ans2Game2").innerHTML = game2Words[game2WordsArr[1]][1];
    document.getElementById("ans3Game2").innerHTML = game2Words[game2WordsArr[2]][1];
    document.getElementById("ans4Game2").innerHTML = game2Words[game2WordsArr[3]][1];
    document.getElementById("ans5Game2").innerHTML = game2Words[game2WordsArr[4]][1];
}

//this is function that suppose  to generate words
// we will change the senteces to words
function genrateWords2() {
    // the part that responsible for random
    "use strict";
    var i = Math.floor((Math.random() * game2Words.length));
    // now choose the word by random
    document.getElementById("wordGame2").textContent = game2Words[i][0];
    document.getElementById("wordGame3").textContent = "לחץ על הפירוש";
    correctAnswer2 = i;
    generateAnswers2();
}
//disable the buttom while the game
function disableStart() {

    $('#startBtnGame2').attr("disabled", false);
    clearInterval(intervaltimeGame2);
    document.getElementById("startBtnGame2").textContent = "Play Again";
    document.getElementById("wordGame3").textContent = "למשחק חוזר לחץ play again";

}
// the onload function when the page start
$( document ).ready(function() {

    //need to random question and 4 answers
    //random a question;
    var randWordGame2 = Math.floor((Math.random() * game2Words.length ));
    game2WordsArr[0] = randWordGame2;

    //first let's random place for real answer
    var randPlaceforAnswer = Math.floor((Math.random() * 5)) + 1;

    game2WordsArr[randPlaceforAnswer] = -2;

    //hide all the words
    $("#ans1Game2").hide();
    $("#ans2Game2").hide();
    $("#ans3Game2").hide();
    $("#ans4Game2").hide();
    $("#ans5Game2").hide();
    //generate the game
    $("#startBtnGame2").click(function () {
        //set colors back to black
        document.getElementById("ans1Game2").style.color = "#F2B632";
        document.getElementById("ans2Game2").style.color = "#F2B632";
        document.getElementById("ans3Game2").style.color = "#F2B632";
        document.getElementById("ans4Game2").style.color = "#F2B632";
        document.getElementById("ans5Game2").style.color = "#F2B632";

        //reset click
        clickedFlag = false;

        $('#startBtnGame2').attr("disabled", true);
        document.getElementById("wordGame3").textContent = "לחץ על הפירוש";

        intervaltimeGame2 = setInterval(disableStart , 9000);
        //show the words that slide
        genrateWords2();
        $("#ans1Game2").show();
        $("#ans2Game2").show();
        $("#ans3Game2").show();
        $("#ans4Game2").show();
        $("#ans5Game2").show();

        //random movemet
        $("#ans1Game2").hide('slide', {direction: 'right'}, (Math.random()*3000) + 6500);
        $("#ans2Game2").hide('slide', {direction: 'right'}, (Math.random()*3000) + 6500);
        $("#ans3Game2").hide('slide', {direction: 'right'}, (Math.random()*3000) + 6500);
        $("#ans4Game2").hide('slide', {direction: 'right'}, (Math.random()*3000) + 6500);
        $("#ans5Game2").hide('slide', {direction: 'right'}, (Math.random()*3000) + 6500);
    });

    //click the first answer
    $("#ans1Game2").click(function () {
        if(!clickedFlag){
            clickedFlag = true;
            if(game2WordsArr[0] === correctAnswer2)  // correct answer
            {
                document.getElementById("ans1Game2").style.color = "#00FF00";
                document.getElementById("ans1Game2").innerHTML = "Correct";
                jData[currUSER].rightAns++;
            }
            else // bad answer
            {
                document.getElementById("ans1Game2").style.color = "RED";
                document.getElementById("ans1Game2").innerHTML = "Wrong!";
                jData[currUSER].wrongAns++;
            }
        }

    });
    //click the second answer
    $("#ans2Game2").click(function () {
        if(!clickedFlag) {
            clickedFlag = true;
            if(game2WordsArr[1] === correctAnswer2) // correct answer
            {
                document.getElementById("ans2Game2").style.color = "#00FF00";
                document.getElementById("ans2Game2").innerHTML = "Correct";
                jData[currUSER].rightAns++;
            }
            else // bad answer
            {
                document.getElementById("ans2Game2").style.color = "RED";
                document.getElementById("ans2Game2").innerHTML = "Wrong!";
                jData[currUSER].wrongAns++;
            }
        }
    });
    //click the third answer
    $("#ans3Game2").click(function () {
        if(!clickedFlag) {
            clickedFlag = true;
            if(game2WordsArr[2] === correctAnswer2) // correct answer
            {
                document.getElementById("ans3Game2").style.color = "#00FF00";
                document.getElementById("ans3Game2").innerHTML = "Correct";
                jData[currUSER].rightAns++;
            }
            else // bad answer
            {
                document.getElementById("ans3Game2").style.color = "RED";
                document.getElementById("ans3Game2").innerHTML = "Wrong!";
                jData[currUSER].wrongAns++;
            }
        }
    });
    //click the four answer
    $("#ans4Game2").click(function () {
        if(!clickedFlag) {
            clickedFlag = true;
            if(game2WordsArr[3] === correctAnswer2) // correct answer
            {
                document.getElementById("ans4Game2").style.color = "#00FF00";
                document.getElementById("ans4Game2").innerHTML = "Correct";
                jData[currUSER].rightAns++;
            }
            else // bad answer
            {
                document.getElementById("ans4Game2").style.color = "RED";
                document.getElementById("ans4Game2").innerHTML = "Wrong!";
                jData[currUSER].wrongAns++;
            }
        }

    });
    //click the fifth answer
    $("#ans5Game2").click(function () {
        if(!clickedFlag) {
            clickedFlag = true;
            if(game2WordsArr[4] === correctAnswer2) // correct answer
            {
                document.getElementById("ans5Game2").style.color = "#00FF00";
                document.getElementById("ans5Game2").innerHTML = "Correct";
                jData[currUSER].rightAns++;
            }
            else // bad answer
            {
                document.getElementById("ans5Game2").style.color = "RED";
                document.getElementById("ans5Game2").innerHTML = "Wrong!";
                jData[currUSER].wrongAns++;
            }
        }
    });


});
