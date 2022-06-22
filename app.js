
$(document).ready(function() {
  var delay = false;
  var currentPage = 1;
  var pageCount = $(".section").length;
  var swipe = document.getElementsByTagName('.section');

  $(document).on('mousewheel DOMMouseScroll', function(event) {
        event.preventDefault();
        if (delay) return;
        delay = true;
        setTimeout(function() { delay = false }, 100)

        var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
        console.log(wd);

        if (wd < 0) {
            if (currentPage < pageCount) {
                currentPage++;
            }
        } else {
            if (1 < currentPage) {
                currentPage--;
            }
        }
    
        $('html,body').animate({
            scrollTop: $('#sec' + currentPage).offset().top
        }, 700);

        $('#tag' + currentPage).addClass('active');
        for (var i = 1; i <= pageCount; i++) {
            if (i != currentPage) {
                $('#tag' + i).removeClass('active');
            }
        }
    });
}, {passive:false});  

// -------------------------------------
// script for github profile search
// -------------------------------------
const comingYear = new Date().getFullYear() + 1;
let newYearDate = new Date(`Jan 1, ${comingYear} 00:00:00`).getTime(); // start counting upto this date
// Display the upcoming year
document.getElementById('comingYear').innerText = comingYear;
// Count down function
function newYear(){
    var presentDate = new Date().getTime();
        spentDays = newYearDate - presentDate;

        var second = 1000; //millisecond 
        var minute = second * 60;
        var hour = minute * 60;
        var day = hour * 24;

        var d = Math.floor( spentDays / day );
        var h = Math.floor( (spentDays % day) / hour );
        var m = Math.floor( (spentDays % hour) / minute );
        var s = Math.floor( (spentDays % minute) / second );

        document.getElementById('day').innerText = d;
        document.getElementById('hour').innerText = h;
        document.getElementById('minute').innerText = m;
        document.getElementById('second').innerText = s;
}
// Snow Effect function
function createSnowFlake() {
    const snow_flake = document.createElement('i');
    snow_flake.classList.add('fas');
    snow_flake.classList.add('fa-snowflake');
    snow_flake.style.left = Math.random() * window.innerWidth + 'px';
    snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
    snow_flake.style.opacity = Math.random();
    snow_flake.style.fontSize = Math.random() * 10 + 10 + 'px';
    
    document.body.appendChild(snow_flake);
    
    setTimeout(() => {
        snow_flake.remove();
    }, 3000)
}  
setInterval(newYear, 1000);
setInterval(createSnowFlake, 50);

// -------------------------------------
// script for github profile search
// -------------------------------------
const githubAPIURL =  "https://api.github.com/users/";

const userProfile = document.getElementById('userProfile');
const form = document.getElementById('form');
const search = document.getElementById('search');
getUser('rajondey');
async function getUser(user) {
    const response = await fetch(githubAPIURL + user);
    const responseData = await response.json();

    getUserInfo(responseData);
}
function getUserInfo(user) {
    const userBox = `
        <div class="user-box">
            <div>
                <a href="${user.html_url}" target="_blank">
                    <img class="avetar" src="${user.avatar_url}" alt="${user.name}">
                </a>
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <div class="user-bio">
                    <p>${user.bio}</p>
                    <a href="${user.html_url}" target="_blank">View Profile</a>
                </div>
                <ul class="meta-data">
                    <li>${user.followers} <strong> Followers</strong></li>
                    <li>${user.following} <strong> Following</strong></li>
                    <li>${user.public_repos} <strong> Repos</strong></li>
                </ul>
            </div>
        </div>
    `;
    userProfile.innerHTML = userBox;
}
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if(user) {
        getUser(user);
        search.value = '';
    }
});

// -------------------------------------
// script for password generator
// -------------------------------------
// DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

// Generate random numbers
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// Generate event listener
generate.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
	// 1. init pass var
	// 2. filterout checked types
	// 3. loop over length
	// 4. add final pw
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

// Generator functions - http://www.net-comber.com/charset.html
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

// Copy password to clipboard 
clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

// -------------------------------------
// script for BMI Calculator
// -------------------------------------
function main () {
  var height = parseFloat(document.getElementById('Height').value);
  var weight = parseFloat(document.getElementById('Weight').value);

  // The formula is: IMC = weight / ( height x height )
  // IMC In French which means “Indice de Masse Corporelle”, is a measure used to evaluate body weight for adults and to evaluate the health risks associated with being overweight or underweight.

  var imc = weight / (height/100)**2;
  // ** — Double star: power operator (exponentiation)
  imc = imc.toFixed(2);
  // Ex. var num = 5.56789;
  // var n = num.toFixed(2);

  if (imc > 0 && imc <= 15) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>very severely underweight</span>.';
  } else if (imc > 15 && imc <= 16) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>severely underweight</span>.';
  } else if (imc > 16 && imc <= 18.5) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>Underweight</span>.';
  } else if (imc > 18.5 && imc <= 25) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>Normal (healthy weight)</span>.';
  } else if (imc > 25 && imc <= 30) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>Overweight</span>.';
  } else if (imc > 30 && imc <= 35) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>Obese Class I (Moderately obese)</span>.';
  } else if (imc > 35 && imc <= 40) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>Obese Class II (Severely obese)</span>.';
  } else if (imc > 40 && imc <= 45) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>Obese Class III (Very severely obese)</span>.';
  } else if (imc > 45 && imc <= 50) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>Obese Class IV (Morbidly Obese)</span>.';
  } else if (imc > 50 && imc <= 60) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>Obese Class V (Super Obese)</span>.';
  } else if (imc > 60) {
    document.getElementById('output').innerHTML = 'Your BMI is: <b>' + imc + '</b><br>Your weight is <span>Obese Class VI (Hyper Obese)</span>.';
  } else {
    document.getElementById('output').innerHTML = 'Please type valid numbers.';
  }

  // Showing Results
  document.getElementById("modal").style.display = "block";
  document.getElementById("close").onclick = function(){
    document.getElementById("modal").style.display = "none";
    document.getElementById("myForm").reset();
  }
}


// -------------------------------------
// script for search song lyrics
// -------------------------------------
const forms = document.getElementById('formsec5');
const searchs = document.getElementById('searchsec5');
const result = document.getElementById('resultsec5');

// api URL 
const apiURL = 'https://api.lyrics.ovh';

// adding event listener in form
forms.addEventListener('submit', e=> {
    e.preventDefault();
    searchValue = searchs.value.trim()

    if(!searchValue){
        alert("There is nothing to search")
    }
    else{ 
        searchSong(searchValue)
    }
})

//search song 
async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();
    // console.log(finaldata)
    showData(data)
}

//display final result in DO
function showData(data){
  
    result.innerHTML = `
    <ul class="song-list">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <img src="${song.artist.picture}" alt="Artist image">
                        <strong>${song.artist.name}</strong> - ${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

//event listener in get lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})
// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<div class="full-lyrics"><h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p></div>`;  
}


/*
**
**
**
*/
    
$(document).ready(function() {

// Variables    
    const button = document.getElementById("startBtn6");
    const writeMessage = document.getElementById("writemessage6");
    const message = document.getElementById("message6");
    const result = document.getElementById("result6");
    const theTimer = document.getElementById("timer6");

    let startTime, endTime;

    writeMessage.disabled=true;

    // Sample dummy peragraphs:  
    const SetofWords= [ 
    "The bikers rode down the long and narrow path to reach the city park. When they reached a good spot to rest, they began to look for signs of spring. The sun was bright, and a lot of bright red and blue blooms proved to all that warm spring days were the very best. Spring rides were planned. They had a burger at the lake and then rode farther up the mountain.",
    "A paralegal is a person trained in legal matters who performs tasks requiring knowledge of the law and legal procedures. A paralegal is not a lawyer but can be employed by a law office or work freelance at a company or law office. ",
    "Closed captions were created for deaf or hard of hearing individuals to assist in comprehension. They can also be used as a tool by those learning to read, learning to speak a non-native language, or in an environment where the audio is difficult to hear or is intentionally muted." ,
    "Many touch typists also use keyboard shortcuts or hotkeys when typing on a computer. This allows them to edit their document without having to take their hands off the keyboard to use a mouse. An example of a keyboard shortcut is pressing the Ctrl key plus the S key to save a document as they type, or the Ctrl key plus the Z key to undo a mistake.",
    "A virtual assistant (typically abbreviated to VA) is generally self-employed and provides professional administrative, technical, or creative assistance to clients remotely from a home office.",
    "Because of the laboriousness of the translation process, since the 1940s efforts have been made, with varying degrees of success, to automate translation or to mechanically aid the human translator. More recently, the rise of the Internet has fostered a world-wide market for translation services and has facilitated 'language localization'.",
    "Web designers are expected to have an awareness of usability and if their role involves creating mark up then they are also expected to be up to date with web accessibility guidelines. The different areas of web design include web graphic design; interface design; authoring, including standardised code and proprietary software",
    "A late 20th century trend in typing, primarily used with devices with small keyboards (such as PDAs and Smartphones), is thumbing or thumb typing. This can be accomplished using one or both thumbs. Similar to desktop keyboards and input devices, if a user overuses keys which need hard presses and/or have small and unergonomic layouts, it could cause thumb tendonitis.",
    "Medical transcription, also known as MT, is an allied health profession dealing with the process of transcribing voice-recorded medical reports that are dictated by physicians, nurses and other healthcare practitioners. Medical reports can be voice files, notes taken during a lecture, or other spoken material.",
    "Being human makes us susceptible to the onset of feelings. The role of these emotions varies. Some of them are useful while others may be harmful. The use of social media for self-expression has reached a point that it makes us feel we can say anything. This begins when we see people expressing anything and everything that come to mind."
    ];


    // Showing random message
    const start = () => {
        let index = Math.floor(Math.random()*SetofWords.length);
        $("#message6").html(SetofWords[index]);
        let date = new Date();
        startTime = date.getTime();
    }


    // Final result showing
    const end = () => {
        let date= new Date();
        let endTime= date.getTime();
        let timeTaken= (endTime-startTime-800)/1000;
        console.log(timeTaken);

        let totalWords= (message.innerText.split(" ")).length;
        if((writeMessage.value.trim()).length>0)
        {
            var wordsCount= (writeMessage.value.split(" ")).length;
        }
        else {
            var wordsCount=0;
        }

        console.log(totalWords+ " "+wordsCount+message.innerText);
        
        let speed= Math.round(((60/timeTaken)*wordsCount));

        let correctWords=accuracy(writeMessage.value,message.innerText);
        console.log('Total Words:'+wordsCount+ 'Correct Words:'+correctWords);
        

        $("#result6 div").html(
            `🚀 WPM:  ${speed} <br> 
            ⌨️ Words Typed: ${wordsCount}  <br> 
            ✔️ Correct Words: ${correctWords} <br> 
            🎯 Accuracy:   ${Math.round((correctWords/wordsCount)*100)}%`);

        $("#message6").html("Text will appear here once you click on Start");
        $("#writemessage6").prop("disabled",true);

    }


    // Checking accuracy test
    const accuracy = (str,message) => {
    message=(message.split(" "));
    let count=0;
    console.log(message);
     str.trim().split(" ").forEach(function (item) { 
        console.log("item: "+item+ message.indexOf(item)); 
        if(message.indexOf(item) > -1)
            count++;
        }); 
     return count;
    }


    // Start button clicked event
    button.addEventListener('click',function(){
        console.log("Clicked ");
        if($(this).text() === "Start"){ 
            $("textarea").val("");
            console.log('Started');
            this.innerText="Stop";
            $("#result6").fadeOut();
            $("#writemessage6").prop("disabled",false);
            start();
        }
        else{   
            $("#result6").fadeIn();
            console.log('Stopped');
            $(this).html("Start");
            end();
        }
    });


    $("#close6").click(function(){
        $("#result6").css("display","none");
    });
    
});


/*****
*
*
**/

const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

showTodo("all");

function showTodo(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        liTag += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                        <p class="${completed}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                            <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
            }
        });
    }
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");
  taskBox.offsetHeight >= 300
    ? taskBox.classList.add("overflow")
    : taskBox.classList.remove("overflow");
}

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
}

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  }
});