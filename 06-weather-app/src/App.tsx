import { useState } from 'react';
import axios from 'axios';
import type { WeatherResponse } from './types';

const API_KEY = '27ee993cba484f277137970e574c31eb'

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setError('');
      const res = await axios.get<WeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setData(res.data);
    } catch  {
      setError('City not found');
      setData(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Weather App</h2>
      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ marginTop: 20 }}>
          <h3>{data.name}</h3>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>{data.weather[0].main} - {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
