$( document ).ready(function() {
    document.getElementById("button").addEventListener('click', searchWeather);

    var searchButton = document.querySelector('button');
    var searchCity = document.querySelector('#city');
    var weatherBox = document.querySelector('#weather');
    var weatherAdditional = document.querySelector('#additional-info');
    var weatherCity = document.querySelector('#weatherCity');
    var weatherDescription = document.querySelector('#weatherDescription');
    var weatherTemperature = document.querySelector('#weatherTemperature');
    
});

function searchWeather(){
  var cityName = city.value;

  if (cityName.trim().length == 0){
    return alert('Please enter a city name')
  }
  var http = new XMLHttpRequest();
  var apiKey = "";
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
  var method = 'GET'

  http.open(method, url);
  http.onreadystatechange = function(){
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200){
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
      weatherData.temperature = data.main.temp;
      updateWeather(weatherData);
    }else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200){
      console.log("ERROR");
    }
  };
  http.send();
}


function updateWeather(weatherData){
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;


}

function Weather(cityName, description){
  this.cityName = cityName;
  this.description = description;
  this._description = '';
}

Object.defineProperty(Weather.prototype, 'temperature', {
  get:function(){
    return this._temperature;
  },
  set: function(value){
    console.log(value)
    var kelvin = value;
    var fahrenheit = ((kelvin)*(9/5))-459.67;
    this._temperature = Math.round(fahrenheit*10)/10 + "F";
  }
});