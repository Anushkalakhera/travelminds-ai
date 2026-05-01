'use client';
import { useEffect, useState } from 'react';

interface WeatherProps {
  destination: string;
}

export default function WeatherInfo({ destination }: WeatherProps) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!destination) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const city = destination.split(',')[0].trim();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/weather/${city}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error('City not found');
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError('Weather data not available for this destination');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination]);

  if (!destination) return null;

  if (loading) return (
    <div className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl text-center text-gray-400">
      🌤️ Loading weather...
    </div>
  );

  if (error) return (
    <div className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm text-center">
      {error}
    </div>
  );

  if (!weather) return null;

  return (
    <div className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl shadow-xl">

      {/* Header */}
      <h3 className="font-bold text-lg mb-4 text-white">
        🌤️ Weather in {weather.city}, {weather.country}
      </h3>

      {/* Forecast */}
      <div className="flex flex-col gap-3">
        {weather.forecast.map((day: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between bg-black/30 border border-white/10 rounded-xl px-4 py-3 hover:bg-black/50 transition"
          >

            {/* Date */}
            <div className="text-sm text-gray-400 w-32">
              {new Date(day.date).toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </div>

            {/* Icon + Desc */}
            <div className="flex items-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.description}
                className="w-8 h-8"
              />
              <span className="text-sm text-gray-300 capitalize">
                {day.description}
              </span>
            </div>

            {/* Temp */}
            <div className="text-right">
              <p className="font-semibold text-orange-400">{day.temp}°C</p>
              <p className="text-xs text-gray-500">Feels {day.feels_like}°C</p>
            </div>

            {/* Extra */}
            <div className="text-right text-xs text-gray-400">
              <p>💧 {day.humidity}%</p>
              <p>💨 {day.wind} m/s</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}