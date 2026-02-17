import React, { useState } from 'react';
import '../styles/Forecast.css';

const Forecast = ({ onFetchForecast, forecastData, loading }) => {
  const [days, setDays] = useState(7);

  const handleFetch = () => {
    onFetchForecast(days);
  };

  return (
    <div className="forecast-section">
      <div className="forecast-controls">
        <h3>Weather Forecast</h3>
        <div className="controls">
          <label>
            Forecast Days:
            <input
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </label>
          <button onClick={handleFetch} disabled={loading}>
            {loading ? 'Loading...' : 'Get Forecast'}
          </button>
        </div>
      </div>

      {forecastData && forecastData.forecast && (
        <div className="forecast-grid">
          {Object.entries(forecastData.forecast).map(([date, data]) => (
            <div key={date} className="forecast-card">
              <h4>{date}</h4>
              <img src={data.weather_icons?.[0]} alt={data.weather_descriptions?.[0]} />
              <p className="description">{data.weather_descriptions?.[0]}</p>
              <div className="temp-range">
                <span className="max-temp">{data.maxtemp}°C</span>
                <span className="min-temp">{data.mintemp}°C</span>
              </div>
              <div className="forecast-details">
                <p>Avg Temp: {data.avgtemp}°C</p>
                <p>Humidity: {data.avghumidity}%</p>
                <p>Wind: {data.maxwind_speed} km/h</p>
                <p>Precip: {data.totalprecip} mm</p>
                <p>UV Index: {data.uv_index}</p>
                <p>Sunrise: {data.astro?.sunrise}</p>
                <p>Sunset: {data.astro?.sunset}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
