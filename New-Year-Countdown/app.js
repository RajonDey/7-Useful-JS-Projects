


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

// setInterval(function(){
//     newYear()  
// }, 1000) 
setInterval(newYear, 1000);
setInterval(createSnowFlake, 50);

