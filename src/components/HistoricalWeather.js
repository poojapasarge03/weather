import React, { useState } from 'react';
import '../styles/HistoricalWeather.css';

const HistoricalWeather = ({ onFetchHistorical, historicalData, loading }) => {
  const [date, setDate] = useState('');

  const handleFetch = () => {
    if (date) {
      onFetchHistorical(date);
    }
  };

  return (
    <div className="historical-section">
      <div className="historical-controls">
        <h3>Historical Weather</h3>
        <div className="controls">
          <label>
            Select Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </label>
          <button onClick={handleFetch} disabled={loading || !date}>
            {loading ? 'Loading...' : 'Get Historical Data'}
          </button>
        </div>
      </div>

      {historicalData && historicalData.historical && (
        <div className="historical-data">
          {Object.entries(historicalData.historical).map(([date, data]) => (
            <div key={date} className="historical-card">
              <h4>{date}</h4>
              <div className="historical-details">
                <div className="detail-row">
                  <img src={data.weather_icons?.[0]} alt={data.weather_descriptions?.[0]} />
                  <div>
                    <p className="description">{data.weather_descriptions?.[0]}</p>
                    <p className="temp">Temperature: {data.avgtemp}°C</p>
                  </div>
                </div>
                <div className="detail-grid">
                  <p>Max Temp: {data.maxtemp}°C</p>
                  <p>Min Temp: {data.mintemp}°C</p>
                  <p>Humidity: {data.avghumidity}%</p>
                  <p>Wind Speed: {data.maxwind_speed} km/h</p>
                  <p>Visibility: {data.avgvis} km</p>
                  <p>Pressure: {data.avgpressure} mb</p>
                  <p>Precipitation: {data.totalprecip} mm</p>
                  <p>UV Index: {data.uv_index}</p>
                  <p>Sunrise: {data.astro?.sunrise}</p>
                  <p>Sunset: {data.astro?.sunset}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricalWeather;
