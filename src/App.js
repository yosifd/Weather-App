import './App.css';
import React, { useState } from "react";

const api = {
  key: "523728c5b46fa905d43e49f3002b994a",
  base: "https://api.openweathermap.org/data/2.5/",

  keyForecast: "dec99e00a48444949dd80b4e3d84d0eb",
  baseForecast: "https://api.weatherbit.io/v2.0/forecast/daily"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&unit=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
      
        fetch(`${api.baseForecast}?city=${query}&units=I&days=6&key=${api.keyForecast}`)
        .then(res => res.json())
        .then(result => {
          setForecast(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
  }

  const dayBuilder = (d) => {
    let months = ["1","2","3","4","5","6","7",
    "8","9","10","11","12"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    // let year = d.getFullYear();

    // return `${day}, ${month} ${date}`;
    return `${day}, ${month}/${date}`
  }

  // figure out what image to use
  const forecastImage = (img) => {
    let images = ["https://www.flaticon.com/svg/static/icons/svg/869/869869.svg", //sunny or clear sky
                  "https://www.flaticon.com/svg/static/icons/svg/1163/1163634.svg", // cloudy
                  "https://www.flaticon.com/svg/static/icons/svg/2948/2948216.svg", // rain
                  "https://www.flaticon.com/svg/static/icons/svg/2201/2201068.svg", //thunderstorm
                  "https://www.flaticon.com/svg/static/icons/svg/2942/2942909.svg"]; //snow

      if(typeof forecast.city_name != "undefined") {
        if(forecast.data[img].weather.description.includes("sunny")) {
          return images[0];
        } else if(forecast.data[img].weather.description.includes("cloud")) {
          return images[1];
        } else if(forecast.data[img].weather.description.includes("rain")) {
          return images[2];
        } else if(forecast.data[img].weather.description.includes("thunder")) {
          return images[3];
        } else if(forecast.data[img].weather.description.includes("snow")) {
          return images[4];
        } else {
          return images[0];
        }
      }
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? ((((weather.main.temp-273.15) * (9/5) + 32) > 69) 
          ? 'app warm' : 'app') 
        : 'app'}>
      <main>
        <div className="name">
          <img className="logo" src="https://www.flaticon.com/svg/static/icons/svg/1585/1585791.svg" alt=" "/>
          <span className="app-name">Glacial</span>
        </div>
        <div class="search-box">
          <input type="text" className="search-bar" placeholder="Search City..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round((weather.main.temp-273.15) * (9/5) + 32)}°F
                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div>
            </div>
          </div>
        ) : ('')}
      <div>
        {(typeof forecast.city_name != "undefined") ? (
          <div className="forecast-box">
            4 Day Forecast:
            <div className="day-row">
              <div className="date-forecast">
                {dayBuilder(new Date(forecast.data[2].datetime))}
              </div>
              <div className="day-box">
              <span className="forecast-temp">{Math.round(forecast.data[2].temp)}°F</span> <br></br>
                <img className="forecast-img" src={forecastImage(2)} alt=" "/><br></br>
                {forecast.data[2].weather.description}
              </div>
              <div className="date-forecast">
                {dayBuilder(new Date(forecast.data[3].datetime))}
              </div>
              <div className="day-box">
                <span className="forecast-temp">{Math.round(forecast.data[3].temp)}°F</span> <br></br>
                <img className="forecast-img" src={forecastImage(3)} alt=" "/><br></br>
                {forecast.data[3].weather.description}
              </div>
              <div className="date-forecast">
                {dayBuilder(new Date(forecast.data[4].datetime))}
              </div>
              <div className="day-box">
              <span className="forecast-temp">{Math.round(forecast.data[4].temp)}°F</span> <br></br>
                <img className="forecast-img" src={forecastImage(4)} alt=" "/><br></br>
                {forecast.data[4].weather.description}
              </div>
              <div className="date-forecast">
                {dayBuilder(new Date(forecast.data[5].datetime))}
              </div>
              <div className="day-box">
              <span className="forecast-temp">{Math.round(forecast.data[5].temp)}°F</span> <br></br>
                <img className="forecast-img" src={forecastImage(5)} alt=" "/><br></br>
                {forecast.data[5].weather.description}
              </div>
            </div>
          </div>
        ) : ('')}
      </div>
            </main>
          </div>
        );
}

export default App;