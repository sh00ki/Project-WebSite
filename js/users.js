//<!--------------this website created by the authors:---------------------------->
//<!------------------Yoad Shiran   ID: 302978713--------------------------------->
//<!------------------Elya Bar-on   ID: 200553790--------------------------------->
//<!------------------Lior Sapir    ID: 304916562--------------------------------->
//<!------------------------------------------------------------------------------>
/*jslint browser: true*/
/*global $, jQuery, alert*/

var jData = {"users": [
    {
        "userName": "admin",
        "firstName": "Shai",
        "lastName": "Tavor",
        "password": "admin",
        "wrongAns": 3,
        "rightAns": 3,
        "totalTime": 3
    },
    {
        "userName": "liorsap1",
        "firstName": "Lior",
        "lastName": "111",
        "password": "111",
        "wrongAns": 3,
        "rightAns": 3,
        "totalTime": 3
    }
]
};
var currUSER = 0;


/* init the parametes of*/

function deleteForms() {
    "use strict";
    var form = document.getElementById("reg_firstname");
    form.value = '';
    form = document.getElementById("reg_lastname");
    form.value = '';
    form = document.getElementById("reg_username");
    form.value = '';
    form = document.getElementById("reg_password");
    form.value = '';
    form = document.getElementById("signin_username");
    form.value = '';
    form = document.getElementById("signin_password");
    form.value = '';
}

/* update the parameters of currUser of signin to system */

function updateStats() {
    $("#rightAnsStat").html("Right Answers : " + jData[currUSER].rightAns);
    $("#wrongAnsStat").html("Wrong Answers : " + jData[currUSER].wrongAns);
    $("#totalTimeStat").html("Total Time : " + jData[currUSER].totalTime);
    var z =jData[currUSER].totalTime/(jData[currUSER].rightAns + jData[currUSER].wrongAns);
    $("#timeForAns").html("Time per Answer : " + z.toFixed(2) + " seconds");

}
$(document).ready(function () {
    "use strict";
    $("#loginPage").hide();
    $("#gamePage").hide();
    $("#trainingPage").hide();
    $("#statsPage").hide();
    $("#gameWindow").hide();

   // get the data from user.json file

    if (localStorage.getItem('active') == null) {
            //default user
            localStorage.setItem('currentUserIndex', "0");
            //don't load it again flag
            localStorage.setItem('active', "1");
            //copy to local storage
            localStorage.setItem('jsonData', JSON.stringify(jData.users));
            //set data globaly
            jData = JSON.parse(localStorage.getItem('jsonData'));

    } else {
        //get data from local storage
        jData = JSON.parse(localStorage.getItem('jsonData'));
        currUSER = localStorage.getItem('currentUserIndex');
        //STATISTICS PAGE
        $("#myNameStats").html("Hi, " + jData[currUSER].firstName + " " + jData[currUSER].lastName);

        $("#rightAnsStat").html("Right Answers : " + jData[currUSER].rightAns);
        $("#wrongAnsStat").html("Wrong Answers : " + jData[currUSER].wrongAns);
        $("#totalTimeStat").html("Total Time : " + jData[currUSER].totalTime + " Seconds");

        if((jData[currUSER].rightAns + jData[currUSER].wrongAns) > 0){
            var x = (jData[currUSER].totalTime/60)/(jData[currUSER].rightAns + jData[currUSER].wrongAns);
            $("#timeForAns").html("Time per Answer : " + x.toFixed(2) + " Seconds");
        }
        else
            $("#timeForAns").html("Time per Answer : answer questions first");


    }
    
    //statistics default value
    $("#myNameStats").html("Hi USER, log in please (admin,admin or create a new user)");
    
    $("#loginBtn").click(function () {
        $("#loginPage").show(500);
        $("#gamePage").hide(500);
        $("#trainingPage").hide(500);
        $("#statsPage").hide(500);
        $("#gameWindow").hide(500);
        $("#help").hide(500);
    });
    $("#gameBtn").click(function () {
        $("#loginPage").hide(500);
        $("#gamePage").show(500);
        $("#trainingPage").hide(500);
        $("#statsPage").hide(500);
        $("#gameWindow").hide(500);
        $("#help").hide(500);
    });
    $("#trainBtn").click(function () {
        $("#loginPage").hide(500);
        $("#gamePage").hide(500);
        $("#trainingPage").show(500);
        $("#statsPage").hide(500);
        $("#gameWindow").hide(500);
        $("#help").hide(500);
    });
    $("#statsBtn").click(function () {
        $("#loginPage").hide(500);
        $("#gamePage").hide(500);
        $("#trainingPage").hide(500);
        updateStats();
        $("#statsPage").show(500);
        $("#gameWindow").hide(500);
        $("#help").hide(500);
    });
    $("#game2Btn").click(function () {
        $("#loginPage").hide(500);
        $("#gamePage").hide(500);
        $("#trainingPage").hide(500);
        updateStats();
        $("#statsPage").hide(500);
        $("#gameWindow").show(500);
        $("#help").hide(500);
    });
    $("#helpBtn").click(function () {
        $("#loginPage").hide(500);
        $("#gamePage").hide(500);
        $("#trainingPage").hide(500);
        updateStats();
        $("#statsPage").hide(500);
        $("#gameWindow").hide(500);
        $("#help").show(500);
    });

    //END COPPEEYY
    
    $("#reg_submit").click(function () {
        //collect userName and password entered by users
        var name = $('#reg_firstname').val(),
            lastName = $('#reg_lastname').val(),
            userName = $('#reg_username').val(),
            password = $('#reg_password').val(),
            newUser = {"userName" : userName, "firstName" : name, "lastName" : lastName, "password" : password, "wrongAns" : 0, "rightAns" : 0, "totalTime" : 0};
        if (name === '' || lastName === '' || userName === '') {
            alert("Empty Fields");
            return;
        }

        // create new object to users and push it
        jData.push(newUser);
        // Put the object into storage and call it - jasonData
        localStorage.setItem('jsonData', JSON.stringify(jData));
        alert(userName + " is now regitred, please login!");
        //clear the forms
        deleteForms();
    });

    $("#signin_submit").click(function () {

        // Retrieve the object from storage
        var retrievedObject = localStorage.getItem('jsonData'),
            flag = false,
            i,
            userName = $('#signin_username').val(),
            password = $('#signin_password').val();

        if (userName === "" || userName === null) {
            alert("Empty USER NAME");
            return;
        }
       
        for (i = 0; i < jData.length; i = i + 1) {
            if (userName === jData[i].userName && password === jData[i].password) {
                alert("Hi " + jData[i].firstName + " " + jData[i].lastName);
                //we have found a match
                flag = true;
                //this will save the index of the username that's just logged in
                localStorage.setItem('currentUserIndex', i);
                currUSER = i;
                //STATISTICS PAGE
                $("#myNameStats").html("Hi, " + jData[currUSER].firstName + " " + jData[currUSER].lastName);

                $("#rightAnsStat").html("Right Answers : " + jData[currUSER].rightAns);
                $("#wrongAnsStat").html("Wrong Answers : " + jData[currUSER].wrongAns);
                $("#totalTimeStat").html("Total Time : " + jData[currUSER].totalTime + " Seconds");
                
                if((jData[currUSER].rightAns + jData[currUSER].wrongAns) > 0){
                    var y = (jData[currUSER].totalTime/60)/(jData[currUSER].rightAns + jData[currUSER].wrongAns);
                    $("#timeForAns").html("Time per Answer : " + y.toFixed(2) + " Seconds");
                }
                else
                    $("#timeForAns").html("Time per Answer : answer questions first");
                        
                //go to statistics
                $("#loginPage").hide(500);
                $("#gamePage").hide(500);
                $("#trainingPage").hide(500);
                $("#statsPage").show(500);
            }
        }
        //no user and password match
        if (!flag) {
            alert("username or password does not exist!");
        }

        //alert(retrievedObject);
    });

    $("#test").click(function () {
        alert(localStorage.getItem("jsonData"));
        //var index = localStorage.getItem('currentUserIndex');
        //jData.users[index].wrongAns++;
        //alert("USERNAME: " + jData.users[index].userName + " WrongAnswers : " +jData.users[index].wrongAns);
    });

    //clears all forms
   
});
