import { useState, useEffect } from 'react';
const WeatherCard = ({ darkMode }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(new Date());

  // Update time every second (simple clock)
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch Kigali weather one time when the component loads
  useEffect(() => {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=-1.949&longitude=30.058&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&timezone=Africa%2FKigali';

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather fetch failed');

        const json = await res.json();
        const c = json.current;

        // Map Open-Meteo weather_code into simple words
        const code = c.weather_code;
        let condition = 'Clouds';
        if (code === 0) condition = 'Clear';
        else if (code === 45 || code === 48) condition = 'Fog';
        else if (
          (code >= 51 && code <= 57) ||
          (code >= 61 && code <= 67) ||
          (code >= 80 && code <= 82)
        )
          condition = 'Rain';
        else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) condition = 'Snow';
        else if (code >= 95 && code <= 99) condition = 'Thunderstorm';

        setData({
          city: 'Kigali',
          country: 'RW',
          temp: Math.round(c.temperature_2m),
          feels: Math.round(c.temperature_2m),
          wind: Math.round(c.wind_speed_10m),
          humidity: c.relative_humidity_2m ?? null,
          condition,
        });
      } catch (e) {
        setError('Could not load weather');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const box = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const sub = darkMode ? 'text-gray-400' : 'text-gray-500';

  // UI states
  if (loading) {
    return <div className={`p-4 rounded-lg shadow ${box}`}>Loading weather…</div>;
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg shadow ${box}`}>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Plain
  return (
    <div className={`p-4 rounded-lg shadow ${box}`}>
      <h3 className="text-lg font-semibold">{data.city}, {data.country}</h3>
      <p className={`text-sm ${sub}`}>{data.condition}</p>

      <div className="mt-2 text-4xl font-bold">{data.temp}°C</div>
      <p className={`text-sm ${sub}`}>Feels like {data.feels}°C</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <p className="text-sm">Wind: {data.wind} km/h</p>
        <p className="text-sm">Humidity: {data.humidity !== null ? `${data.humidity}%` : '—'}</p>
      </div>

      <div className={`mt-4 text-sm ${sub}`}>
        {now.toLocaleDateString()} • {now.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default WeatherCard;