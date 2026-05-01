'use client';
import { useState } from 'react';
import { generateTrip } from '@/lib/api';
import Navbar from '@/components/Navbar';
import WeatherInfo from '@/components/WeatherInfo';

const INTERESTS = [
  'Food 🍜',
  'Culture 🎭',
  'Adventure 🧗',
  'Shopping 🛍️',
  'Nature 🌿',
  'History 🏛️',
  'Nightlife 🌃',
  'Beaches 🏖️',
  'Mountains 🏔️',
  'Photography 📸',
  'Luxury 💎',
  'Budget 💰',
  'Spiritual 🛕',
  'Wildlife 🐘',
  'Road Trips 🚗',
  'Festivals 🎉',
];

const POPULAR_DESTINATIONS = [
  { name: 'Paris, France', emoji: '🗼', tag: 'Romance' },
  { name: 'Tokyo, Japan', emoji: '🗾', tag: 'Culture' },
  { name: 'Bali, Indonesia', emoji: '🌴', tag: 'Nature' },
  { name: 'New York, USA', emoji: '🗽', tag: 'City' },
  { name: 'Dubai, UAE', emoji: '🏙️', tag: 'Luxury' },
  { name: 'Rome, Italy', emoji: '🏛️', tag: 'History' },
  { name: 'Bangkok, Thailand', emoji: '🛕', tag: 'Food' },
  { name: 'London, UK', emoji: '🎡', tag: 'Culture' },
];

export default function PlanPage() {
  const [form, setForm] = useState({
    destination: '',
    days: 3,
    budget: 'Medium',
    interests: [] as string[],
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [newActivity, setNewActivity] = useState<{ [key: number]: string }>({});

  const toggleInterest = (interest: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    const res = await generateTrip(form);
    setResult(res.itinerary);
    setLoading(false);
  };

  const removeActivity = (dayIndex: number, actIndex: number) => {
    const updated = { ...result };
    updated.itinerary[dayIndex].activities.splice(actIndex, 1);
    setResult({ ...updated });
  };

  const regenerateDay = async (dayIndex: number) => {
    const day = result.itinerary[dayIndex];
    const token = localStorage.getItem('token')!;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/regenerate-day`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        destination: form.destination,
        day: day.day,
        budget: form.budget,
        interests: form.interests,
      }),
    });
    const data = await res.json();
    const updated = { ...result };
    updated.itinerary[dayIndex].activities = data.activities;
    setResult({ ...updated });
  };

    
  return (
    <div className="min-h-screen 
    bg-gradient-to-br from-orange-50 via-gray-400 to-rose-50 
    dark:from-gray-950 dark:via-gray-900 dark:to-black 
    relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-400 opacity-25 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>

      <Navbar />

      <div className="max-w-3xl mx-auto p-6 relative z-10">

        <h1 className="text-3xl font-bold mb-2 
        bg-gradient-to-r from-orange-600 to-pink-500 
        text-transparent bg-clip-text">
          Plan a New Trip
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Fill details & let AI create magic ✨
        </p>

        {/* Popular Destinations */}
        {!result && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
              🌍 Popular Destinations
            </p>

            <div className="grid grid-cols-4 gap-3">
              {POPULAR_DESTINATIONS.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => setForm({ ...form, destination: dest.name })}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur 
                  rounded-xl p-3 hover:shadow-lg hover:-translate-y-1 transition border border-gray-100 dark:border-gray-800"
                >
                  <div className="text-2xl">{dest.emoji}</div>
                  <div className="text-xs font-medium text-gray-800 dark:text-white">
                    {dest.name.split(',')[0]}
                  </div>
                  <div className="text-xs text-gray-400">{dest.tag}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FORM */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur 
        p-6 rounded-2xl shadow-xl flex flex-col gap-4 border border-gray-100 dark:border-gray-800">

          <input
            className="border-2 border-gray-300 dark:border-gray-700 rounded-xl p-4 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none"
            placeholder="Destination"
            value={form.destination}
            onChange={e => setForm({ ...form, destination: e.target.value })}
          />

          <input
            className="border-2 border-gray-300 dark:border-gray-700 rounded-xl p-4 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none"
            type="number"
            min={1}
            max={30}
            value={form.days}
            onChange={e => setForm({ ...form, days: +e.target.value })}
          />

          <select
            className="border-2 border-gray-300 dark:border-gray-700 rounded-xl p-4 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none"
            onChange={e => setForm({ ...form, budget: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          {/* Interests */}
          <div>
            <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">Interests</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(i => (
                <button
                  key={i}
                  onClick={() => toggleInterest(i)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    form.interests.includes(i)
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-pink-500 
            text-white p-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            {loading ? 'Generating...' : 'Generate Itinerary ✨'}
          </button>
        </div>

        {/* ✅ WEATHER (FIXED) */}
        {form.destination && (
          <div className="mt-6">
            {result && <WeatherInfo destination={form.destination} />}
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur 
          p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">

            <h2 className="text-xl font-bold mb-4 
            bg-gradient-to-r from-orange-500 to-pink-500 
            text-transparent bg-clip-text">
              Your Itinerary
            </h2>

            {result.itinerary?.map((day: any, dayIndex: number) => (
              <div key={day.day} className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">

                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-orange-500">Day {day.day}</h3>
                  <button onClick={() => regenerateDay(dayIndex)}>🔄</button>
                </div>

                {day.activities.map((act: string, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>• {act}</span>
                    <button onClick={() => removeActivity(dayIndex, i)}>✕</button>
                  </div>
                ))}

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}