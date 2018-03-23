/* *************************************
*  Weather Site JavaScript Functions
************************************* */

// Variables for Function Use

//const temp = 31;
//const speed = 5;
//const direction = "NNE"; //Set your own value
//const phrase = "it is clear";
//buildWC(speed, temp);
//windDial(direction);
//let word = getCondition(phrase);
//changeSummaryImage(word);



//this function will calculate the wind chill temperature

function buildWC(SPEED, TEMP) {
    const feelTemp = document.getElementById('feelTemp');

    // Compute the windchill

    let wc = 35.74 + 0.6215 * TEMP - 35.75 * Math.pow(SPEED, 0.16) + 0.4275 * TEMP * Math.pow(SPEED, 0.16);
    console.log(wc);

    // Round the answer down to integer

    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp

    wc = (wc > TEMP)?TEMP:wc;

    // Display the windchill
    console.log(wc);
    feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(DIRECTION){
    // Get the container
    const dial = document.getElementById("dial");
    console.log(DIRECTION);
    // Determine the dial class
    switch (DIRECTION){
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

function getCondition(PHRASE) {
    // checking if the phrase has certain words
    if (PHRASE.includes("Cloudy") || PHRASE.includes("Clouds") || PHRASE.includes("Overcast")){
        let word = "clouds"; //pulling the key word for change image function
        console.log(word);//checking the console
        return word;//return the key word to use in another function

    } else if (PHRASE.includes("Rainy") || PHRASE.includes("Rain") || PHRASE.includes("Wet") || PHRASE.includes("Raining")) {
        let word = "rain";
        console.log(word);
        return word;
    } else if (PHRASE.includes("Foggy") || PHRASE.includes("Fog")) {
        let word = "fog";
        console.log(word);
        return word;
    } else if (PHRASE.includes("Clear") || PHRASE.includes("Sunny") || PHRASE.includes("sun")) {
        let word = "clear";
        console.log(word);
        return word;
    } else if (PHRASE.includes("Snowy") || PHRASE.includes("Snow") || PHRASE.includes("Blizzard")) {
        let word = "snow";
        console.log(word);
        return word;
    }
}

//Function changes the background image

function changeSummaryImage(word) {
    // get the container
    const curWeather = document.getElementById("curWeather");
    // determine background image
    switch(word){
        case "clouds":
            curWeather.setAttribute("class", "clouds"); // clouds is the css rule selector
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

// Get Data from API
function getData(LOCALE) {
    const WU_API_KEY = '297d201ab92ca249';
    const URL = "https://api.wunderground.com/api/" + WU_API_KEY + "/conditions/forecast/q/" + LOCALE + ".json";
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
        console.log('Json object from getData function:');
        console.log(data);
        displayData(data);
    })
        .catch(error => console.log('There was an error: ', error))
} // end getData function

function displayData(data) {

    // Task 1 - Feed data to WC, Dial and Image functions
        const TEMP = data.current_observation.temp_f;
        //getting temperature from API and store it in TEMP variable
        const curTemp = document.getElementById("curTemp");
        curTemp.innerHTML = Math.round(TEMP);
        //round temperature

        const DIRECTION = data.current_observation.wind_dir; //getting wind direction from API and store it in DIRECTION variable
        const windDirection = document.getElementById("windDirection");
        windDirection.innerHTML = DIRECTION;
        const SPEED = data.current_observation.wind_mph; // wind speed
        const windSpeed = document.getElementById("speed"); //getting html element for wind speed from index.html file
    windSpeed.innerHTML = Math.round(SPEED); // insert information from API to html element
        const PHRASE = data.current_observation.weather; // getting weather condition from API
        document.getElementById("weatherValue").innerHTML = PHRASE;
        console.log(TEMP + DIRECTION + SPEED + PHRASE); //checking if all elements are displayed
        buildWC(SPEED, TEMP); //calling function to calculate wind chill temperature
        windDial(DIRECTION); //calling function to rotate the wind circle
        let word = getCondition(PHRASE); //storing key word from weather condition function in word variable
        changeSummaryImage(word); // calling function to change background image

    // Task 2 - Populate location information
        const CITY = data.current_observation.display_location.city; // getting current city information from API and store it in CITY variable
        console.log(CITY); //print variable to the console
        const currentCity = document.getElementById("curCity"); //getting html element from index.html
        currentCity.innerHTML = CITY; //insert current city information from CITY variable to the accirding HTML element stored in currentCity variable
        const currentState = document.getElementById("curState"); //getting state information from API
        const STATE = data.current_observation.display_location.state; //getting html element for state info
        currentState.innerHTML = STATE; // write state info to html file
        document.title = CITY + "," + STATE + " | Weather Site";
        const currentZip = document.getElementById("zip");
        const ZIP = data.current_observation.display_location.zip;
        currentZip.innerHTML = ZIP;
        const currentElevation = document.getElementById("elevation");
        const ELEVATION = data.current_observation.display_location.elevation;
        currentElevation.innerHTML = Math.round(ELEVATION * 3.2808);
        const LATITUDE = data.current_observation.display_location.latitude;
        console.log(LATITUDE);
        const lat = document.getElementById('lat');
        lat.innerHTML = LATITUDE;
        const LONGITUDE = data.current_observation.display_location.longitude;
        const long = document.getElementById('long');
        long.innerHTML = LONGITUDE;
        const gusts = document.getElementById("windGusts");
        const WINDGUST = data.current_observation.wind_gust_mph;
    gusts.innerHTML = Math.round(WINDGUST);
        //high temperature
        const HI = data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
        console.log(HI);
    document.getElementById("hiTemp").innerHTML = Math.round(HI);
        //low temperature
        const LOW = data.forecast.simpleforecast.forecastday[0].low.fahrenheit;
        console.log(LOW);
    document.getElementById("lowTemp").innerHTML = Math.round(LOW);
        //weather icon
        const ICON = data.current_observation.icon_url;
        console.log(ICON);
        document.getElementById("weatherIcon").setAttribute("src", ICON);

    // Task 3 - Populate weather information (including the wunderground logo and text in footer)
        const LOGO = data.current_observation.image.url; // getting logo url from API
        const logoImage = document.getElementById("logoImage"); // getting html element
        logoImage.setAttribute("src", LOGO); // set src attribute to the image
        const TEXT = "Information provided by"; // text to mention where information was taken from
        const source = document.getElementById("source"); //where the information should be put
        source.innerHTML = TEXT; //writing information to html file

    // Task 4 - Hide status and show main
        const STATUS = document.getElementById('status'); // getting status element from html
        STATUS.setAttribute("class", "hide"); //set class to the element
        const mainElement = document.getElementById("main"); // getting main element from HTML
        mainElement.classList.remove("hide"); // removing class hide from main element
    const searchResults = document.getElementById("searchResults");
    searchResults.setAttribute("class", "hide");
}
