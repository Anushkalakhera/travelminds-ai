import { Router } from 'express';
import { protect } from '../middleware/auth';
import axios from 'axios';

const router = Router();

router.get('/:city', protect, async (req: any, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    console.log('Fetching weather for:', city);
    console.log('API Key:', apiKey);

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric',
          cnt: 5,
        },
        timeout: 15000,
      }
    );

    const data = response.data;

    const weather = {
      city: data.city.name,
      country: data.city.country,
      forecast: data.list.map((item: any) => ({
        date: item.dt_txt,
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        wind: item.wind.speed,
      })),
    };

    res.json(weather);
  } catch (error: any) {
    console.error('Weather error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

export default router;