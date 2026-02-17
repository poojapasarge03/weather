import React from 'react';
import '../styles/CurrentWeather.css';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const { location, current } = data;

  return (
    <div className="current-weather">
      <div className="location-info">
        <h2>{location.name}, {location.country}</h2>
        <p>{location.region}</p>
        <p className="coordinates">
          Lat: {location.lat}, Lon: {location.lon} | Timezone: {location.timezone_id}
        </p>
        <p className="local-time">Local Time: {location.localtime}</p>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <img src={current.weather_icons[0]} alt={current.weather_descriptions[0]} />
          <div className="temp-display">
            <h1>{current.temperature}°C</h1>
            <p>{current.weather_descriptions[0]}</p>
            <p className="feels-like">Feels like {current.feelslike}°C</p>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="label">Humidity</span>
            <span className="value">{current.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Wind Speed</span>
            <span className="value">{current.wind_speed} km/h</span>
          </div>
          <div className="detail-item">
            <span className="label">Wind Direction</span>
            <span className="value">{current.wind_dir}</span>
          </div>
          <div className="detail-item">
            <span className="label">Pressure</span>
            <span className="value">{current.pressure} mb</span>
          </div>
          <div className="detail-item">
            <span className="label">Visibility</span>
            <span className="value">{current.visibility} km</span>
          </div>
          <div className="detail-item">
            <span className="label">UV Index</span>
            <span className="value">{current.uv_index}</span>
          </div>
          <div className="detail-item">
            <span className="label">Cloud Cover</span>
            <span className="value">{current.cloudcover}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Precipitation</span>
            <span className="value">{current.precip} mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
