import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HistoricalWeather from './components/HistoricalWeather';
import HistoricalTimeSeries from './components/HistoricalTimeSeries';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ThemeToggle from './components/ThemeToggle';
import {
  getCurrentWeather,
  getWeatherForecast,
  getHistoricalWeather,
  getHistoricalTimeSeries
} from './services/weatherService';
import './styles/App.css';

function App() {
  const [currentLocation, setCurrentLocation] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');
  const [favorites, setFavorites] = useState([]);

  // Load theme and favorites from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setTheme(savedTheme);
    setFavorites(savedFavorites);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  const handleSearch = async (location) => {
    setLoading(true);
    setError('');
    setCurrentLocation(location);
    
    try {
      const data = await getCurrentWeather(location);
      if (data.error) {
        setError(data.error.info);
      } else {
        setCurrentWeatherData(data);
        // Reset other data when searching new location
        setForecastData(null);
        setHistoricalData(null);
        setTimeSeriesData(null);
      }
    } catch (err) {
      setError(err.message);
      setCurrentWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchForecast = async (days) => {
    if (!currentLocation) {
      setError('Please search for a location first');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getWeatherForecast(currentLocation, days);
      if (data.error) {
        setError(data.error.info);
      } else {
        setForecastData(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchHistorical = async (date) => {
    if (!currentLocation) {
      setError('Please search for a location first');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getHistoricalWeather(currentLocation, date);
      if (data.error) {
        setError(data.error.info);
      } else {
        setHistoricalData(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchTimeSeries = async (startDate, endDate) => {
    if (!currentLocation) {
      setError('Please search for a location first');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getHistoricalTimeSeries(currentLocation, startDate, endDate);
      if (data.error) {
        setError(data.error.info);
      } else {
        setTimeSeriesData(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (currentWeatherData && !favorites.includes(currentLocation)) {
      const newFavorites = [...favorites, currentLocation];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (location) => {
    const newFavorites = favorites.filter(fav => fav !== location);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather Dashboard</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <div className="container">
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {error && <ErrorMessage message={error} onClose={() => setError('')} />}
        
        {loading && <LoadingSpinner />}

        {currentWeatherData && (
          <>
            <div className="favorites-section">
              {!favorites.includes(currentLocation) ? (
                <button className="favorite-btn" onClick={addToFavorites}>
                  ⭐ Add to Favorites
                </button>
              ) : (
                <button className="favorite-btn active" onClick={() => removeFromFavorites(currentLocation)}>
                  ⭐ Remove from Favorites
                </button>
              )}
            </div>

            <CurrentWeather data={currentWeatherData} />
            
            <div className="tabs-section">
              <Forecast 
                onFetchForecast={handleFetchForecast}
                forecastData={forecastData}
                loading={loading}
              />
              
              <HistoricalWeather
                onFetchHistorical={handleFetchHistorical}
                historicalData={historicalData}
                loading={loading}
              />
              
              <HistoricalTimeSeries
                onFetchTimeSeries={handleFetchTimeSeries}
                timeSeriesData={timeSeriesData}
                loading={loading}
              />
            </div>
          </>
        )}

        {favorites.length > 0 && (
          <div className="favorites-list">
            <h3>Favorite Locations</h3>
            <div className="favorite-items">
              {favorites.map(fav => (
                <div key={fav} className="favorite-item">
                  <span onClick={() => handleSearch(fav)}>{fav}</span>
                  <button onClick={() => removeFromFavorites(fav)}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
