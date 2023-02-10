
var cityInput = document.querySelector("#city");
var stateInput = document.querySelector("#state");
var btn = document.getElementById("btn");
var weatherContainer1 = document.getElementById("weather1");
var weatherContainer2 = document.getElementById("weather2");
var searchContainer = document.getElementById("pastSearchContainer");
var searches = [];

function getWeather() {

  if (cityInput === null || stateInput === null) {
    alert("Please enter a city and state.")
    return;
  }
  getSearches();
  var cityName = cityInput.value;
  var stateCode = stateInput.value;
  var apiGeocoding = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + ",US&limit=1&appid=4315027db90832a73bc7efdc84229fae";

  fetch(apiGeocoding)
  .then(function(response) {
    if (response.ok) {
    return response.json();
    } else {
        alert("error:" + response.message);
    }
  })
  .then(function(data) {
    window.lat = data[0].lat;
    window.lon = data[0].lon;
  })
 .then(function(){
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=4315027db90832a73bc7efdc84229fae";
fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
    return response.json();
    } else {
        alert("error:" + response.message);
    }
  })
  .then(function(data) {
    console.log(data);
    var date = document.createElement("h2");
    var temp = document.createElement("p");
    date.textContent = data.list[0].dt_txt;
    temp.textContent = ("The current temp is " + data.list[0].main.temp + "°F with " + data.list[0].weather[0].description);
    weatherContainer1.append(date);
    weatherContainer1.append(temp);

   for (var i = 8; i < 50; i += 8) {
    var div2 = document.createElement("div");
    var date2 = document.createElement("h2");
    var temp2 = document.createElement("p");


    date2.textContent = data.list[i].dt_txt;
    temp2.textContent = ("The current temp is " + data.list[i].main.temp + "°F with " + data.list[i].weather[0].description);

    weatherContainer2.append(date2);
    weatherContainer2.append(temp2);
    }

    console.log("The current temp is " + data.list[0].main.temp + "°F with " + data.list[0].weather[0].description);
  })
})
}

function getSearches() {

  var savedSearches = (cityInput.value.trim() + ", " + stateInput.value.trim());
  searches.push(savedSearches);
  localStorage.setItem("savedSearches", JSON.stringify(searches));

}

function displaySearch() {
  storedSearches = JSON.parse(localStorage.getItem("savedSearches"));
  if (storedSearches !== null) {
    searches = storedSearches;
  }

  searchContainer.innerHTML = "";
  for (var i = 0; i < searches.length; i++) {
    var search = searches[i];
    var li = document.createElement("li");
    li.textContent = search;
    console.log(li);
    li.setAttribute('class', 'shadow-sm rounded bg-secondary btn d-block my-1');
    searchContainer.appendChild(li);
  }
}

displaySearch();

btn.addEventListener("click", getWeather);