'use strict';

// Get the DOM element
const QUERY = document.getElementById("query");

// Listen for search entries, get matching locations
QUERY.addEventListener("keyup", function () {
    let value = QUERY.value;

    // Create a new script element
    const SCRIPT_ELEMENT = document.createElement('script');

    // Set its source to the Autocomplete API using JSONP
    // Include the value being typed and
    // Return the results to the processJSON function
    SCRIPT_ELEMENT.src = "https://autocomplete.wunderground.com/aq?query=" + value + "&cb=processJSON";

    // Inject the script element into the page <head>
    // where it will be executed
    document.getElementsByTagName('head')[0].appendChild(SCRIPT_ELEMENT);

}); // ends the eventListener

// Build the list of matching locations
function processJSON(json) {
    // Log what is returned
    console.log(json);

    // Build an unordered list
    // Use a for loop to include the results in list items
    let list = "<ul>";
    for (let i = 0, n = json.RESULTS.length; i < n; i++) {
        list += "<li><a data-location='zmw:"+ json.RESULTS[i].zmw +"' href='https://wunderground.com/" + json.RESULTS[i].l + "' title='See weather information for " + json.RESULTS[i].name + "' target='_blank'>" + json.RESULTS[i].name + "</a></li>";
    };
    list += "</ul>";

    // Inject list into the searchResults section of the web page
    searchResults.innerHTML = list;
    searchResults.classList.remove("hide"); //show search results
}; // ends the processJSON function

const searchResults = document.getElementById("searchResults"); // get search result div from search page

//listens when any of the elements inside search results div is clicked
searchResults.addEventListener("click", function(event){
    let loc = event.target.dataset.location; //gets locations information from the link that was clicked
    event.preventDefault(); //prevents from going to a different page on weather underground website



    getData(loc); // function to get data from weather website and further reflect it on the page

});


