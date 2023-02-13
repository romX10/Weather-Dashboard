
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
    weatherContainer1.innerHTML = "";
    weatherContainer2.innerHTML = "";

    var div1 = document.createElement("div");
    var date = document.createElement("h2");
    var temp = document.createElement("p");
    var icon1 = document.createElement("img");
    var icon1code = data.list[0].weather[0].icon;
    var icon1url = "http://openweathermap.org/img/w/" + icon1code + ".png"

    div1.setAttribute("class", "bg-light rounded");
    div1.setAttribute("style", "color: black;");
    date.textContent = data.list[0].dt_txt;
    temp.textContent = ("The current temp is " + data.list[0].main.temp + "°F with " + data.list[0].main.humidity + "% humidity and a windspeed of " + data.list[0].wind.speed + " mph");
    icon1.setAttribute("src", icon1url);
    icon1.setAttribute("style", "img-thumbnail");

    weatherContainer1.append(div1);
    div1.append(icon1);
    div1.append(date);
    div1.append(temp);

   for (var i = 8; i < 50; i += 8) {

    var div2 = document.createElement("div");
    div2.setAttribute("class", "card border border-white col mx-1");
    var date2 = document.createElement("h2");
    date2.setAttribute("class", "card-title");
    var temp2 = document.createElement("p");
    temp2.setAttribute("class", "card-text");
    var icon2 = document.createElement("img");
    icon2.setAttribute("class", "card-img-top img-thumbnail");
    var icon2code = data.list[i].weather[0].icon;
    var icon2url = "http://openweathermap.org/img/w/" + icon2code + ".png";
    icon2.setAttribute("src", icon2url);


    date2.textContent = data.list[i].dt_txt;
    temp2.textContent = ("The current temp is " + data.list[i].main.temp + "°F with " + data.list[i].main.humidity + "% humidity and a windspeed of " + data.list[i].wind.speed + " mph");
//need name, date, icon, temp, humidity, windspeed
    weatherContainer2.append(div2);
    div2.append(icon2);
    div2.append(date2);
    div2.append(temp2);
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
    li.setAttribute('class', 'shadow-sm rounded bg-secondary btn d-block my-1');
    searchContainer.appendChild(li);
  }
}

displaySearch();

btn.addEventListener("click", getWeather);