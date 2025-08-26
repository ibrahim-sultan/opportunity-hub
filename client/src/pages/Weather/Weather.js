import React, { useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo-key';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, we'll use mock data
      // In production, replace with actual API call
      const mockWeather = {
        name: city,
        main: {
          temp: Math.floor(Math.random() * 30) + 10,
          humidity: Math.floor(Math.random() * 100),
          feels_like: Math.floor(Math.random() * 30) + 10
        },
        weather: [{
          main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
          description: 'Mock weather data for demo'
        }],
        wind: {
          speed: Math.floor(Math.random() * 20)
        }
      };
      
      setTimeout(() => {
        setWeather(mockWeather);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️'
    };
    return icons[main] || '🌤️';
  };

  return (
    <div className="weather-container">
      <h1>Weather Information</h1>
      
      <form onSubmit={fetchWeather} className="weather-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="weather-input"
        />
        <button type="submit" disabled={loading} className="weather-button">
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>

      {error && <div className="weather-error">{error}</div>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <div className="weather-main">
            <span className="weather-icon">
              {getWeatherIcon(weather.weather[0].main)}
            </span>
            <span className="weather-temp">
              {Math.round(weather.main.temp)}°C
            </span>
          </div>
          
          <div className="weather-details">
            <p><strong>Condition:</strong> {weather.weather[0].description}</p>
            <p><strong>Feels like:</strong> {Math.round(weather.main.feels_like)}°C</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind speed:</strong> {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
