import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY;
const BASE_URL = 'http://api.weatherstack.com';

// Format date to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return '';
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  // Convert from other formats
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Handle API errors with user-friendly messages
const handleApiError = (error, endpoint) => {
  console.error(`API Error (${endpoint}):`, error.response?.data || error.message);
  
  const errorData = error.response?.data?.error;
  if (errorData) {
    const { code, info } = errorData;
    
    // Check for plan limitation errors
    if (code === 605 || info?.includes('not supported') || info?.includes('upgrade')) {
      throw new Error(`⚠️ This feature requires a paid Weatherstack plan. Your current plan doesn't support ${endpoint}. Please upgrade at weatherstack.com`);
    }
    
    throw new Error(info || 'API request failed');
  }
  
  throw new Error(`Failed to fetch ${endpoint} data. Please check your connection.`);
};

// Current Weather
export const getCurrentWeather = async (location) => {
  try {
    console.log('Fetching current weather for:', location);
    const response = await axios.get(`${BASE_URL}/current`, {
      params: {
        access_key: API_KEY,
        query: location
      }
    });
    console.log('Current weather response:', response.data);
    
    // Check for API error in response
    if (response.data.error) {
      throw { response: { data: response.data } };
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'current weather');
  }
};

// Historical Weather (single date)
export const getHistoricalWeather = async (location, date) => {
  try {
    const formattedDate = formatDate(date);
    console.log('Fetching historical weather for:', location, 'Date:', formattedDate);
    
    const response = await axios.get(`${BASE_URL}/historical`, {
      params: {
        access_key: API_KEY,
        query: location,
        historical_date: formattedDate
      }
    });
    console.log('Historical weather response:', response.data);
    
    if (response.data.error) {
      throw { response: { data: response.data } };
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'historical weather');
  }
};

// Historical Time-Series (date range)
export const getHistoricalTimeSeries = async (location, startDate, endDate) => {
  try {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    console.log('Fetching time-series for:', location, 'From:', formattedStartDate, 'To:', formattedEndDate);
    
    const response = await axios.get(`${BASE_URL}/historical`, {
      params: {
        access_key: API_KEY,
        query: location,
        historical_date_start: formattedStartDate,
        historical_date_end: formattedEndDate
      }
    });
    console.log('Time-series response:', response.data);
    
    if (response.data.error) {
      throw { response: { data: response.data } };
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'time-series');
  }
};

// Weather Forecast
export const getWeatherForecast = async (location, days = 7) => {
  try {
    console.log('Fetching forecast for:', location, 'Days:', days);
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        access_key: API_KEY,
        query: location,
        forecast_days: days
      }
    });
    console.log('Forecast response:', response.data);
    
    if (response.data.error) {
      throw { response: { data: response.data } };
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'forecast');
  }
};

// Location Lookup
export const lookupLocation = async (location) => {
  try {
    console.log('Looking up location:', location);
    const response = await axios.get(`${BASE_URL}/autocomplete`, {
      params: {
        access_key: API_KEY,
        query: location
      }
    });
    console.log('Location lookup response:', response.data);
    
    if (response.data.error) {
      throw { response: { data: response.data } };
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'location lookup');
  }
};
