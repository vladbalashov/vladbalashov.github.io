/* *************************************
*  Weather Site JavaScript Functions
************************************* */

// Variables for Function Use

const temp = 31;
const speed = 5;
const direction = "NNE"; //Set your own value
const phrase = "it is clear";
buildWC(speed, temp);
windDial(direction);
let word = getCondition(phrase);
changeSummaryImage(word);



//this function will calculate the wind chill temperature

function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');

    // Compute the windchill

    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer

    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp

    wc = (wc > temp)?temp:wc;

    // Display the windchill
    console.log(wc);
    feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction){
    // Get the container
    const dial = document.getElementById("dial");
    console.log(direction);
    // Determine the dial class
    switch (direction){
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}

//Function will choose the weather condition

function getCondition(phrase) {
    if (phrase.includes("cloudy") || phrase.includes("clouds")){
        let word = "clouds";
        console.log(word);
        return word;

    } else if (phrase.includes("rainy") || phrase.includes("rain") || phrase.includes("wet")) {
        let word = "rain";
        console.log(word);
        return word;
    } else if (phrase.includes("foggy") || phrase.includes("fog")) {
        let word = "fog";
        console.log(word);
        return word;
    } else if (phrase.includes("clear") || phrase.includes("sunny") || phrase.includes("sun")) {
        let word = "clear";
        console.log(word);
        return word;
    } else if (phrase.includes("snowy") || phrase.includes("snow") || phrase.includes("blizzard")) {
        let word = "snow";
        console.log(word);
        return word;
    }



}

//Function changes the background image

function changeSummaryImage(word) {
    const curWeather = document.getElementById("curWeather");
    switch(word){
        case "clouds":
            curWeather.setAttribute("class", "clouds");
            break;
        case "rain":
            curWeather.setAttribute("class", "rain");
            break;
        case "fog":
            curWeather.setAttribute("class", "fog");
            break;
        case "clear":
            curWeather.setAttribute("class", "clear");
            break;
        case "snow":
            curWeather.setAttribute("class", "snow");
            break;
    }
}

//
