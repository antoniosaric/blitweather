$( document ).ready(function() {
    document.getElementById("button").addEventListener('click', searchWeather);

    var weatherAdditional = document.querySelector('#additional-info');
    var weatherCity = document.querySelector('#weatherCity');
    var weatherDescription = document.querySelector('#weatherDescription');
    var weatherTemperature = document.querySelector('#weatherTemperature');
    var high = document.getElementById('high');
    var low = document.getElementById('low');
    var display = document.getElementById('display');
    
});

//http api request
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
      console.log(data.main);
      var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
      weatherData.temperature = data.main.temp;
      weatherData.high = data.main.temp_max;
      weatherData.low = data.main.temp_min;
      updateWeather(weatherData);
    }else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200){
      console.log("ERROR");
    }
  };
  http.send();
}

//Displays weather search to screen
function updateWeather(weatherData){
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;
  high.textContent = weatherData.high;
  low.textContent = weatherData.low;

  display.style.display = 'block';
}

//Weather
function Weather(cityName, description){
  this.cityName = cityName;
  this.description = description;
  this._description = '';
}


//sets temperature in F
Object.defineProperty(Weather.prototype, 'temperature', {
  get:function(){
    return this._temperature;
  },
  set: function(value){
    console.log(value)
    var kelvin = value;
    var fahrenheit = ((kelvin)*(9/5))-459.67;
    this._temperature = Math.round(fahrenheit*10)/10 + " F";
  }

//sets high temp in F
});Object.defineProperty(Weather.prototype, 'high', {
  get:function(){
    return this._high;
  },
  set: function(value){
    console.log(value)
    var kelvin = value;
    var fahrenheit = ((kelvin)*(9/5))-459.67;
    this._high = Math.round(fahrenheit*10)/10 + " F";
  }

//sets low temp in F
});Object.defineProperty(Weather.prototype, 'low', {
  get:function(){
    return this._low;
  },
  set: function(value){
    console.log(value)
    var kelvin = value;
    var fahrenheit = ((kelvin)*(9/5))-459.67;
    this._low = Math.round(fahrenheit*10)/10 + " F";
  }
});