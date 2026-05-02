'use client';
import { useState } from 'react';
import { generateTrip } from '@/lib/api';
import Navbar from '@/components/Navbar';
import WeatherInfo from '@/components/WeatherInfo';

const INTERESTS = [
  'Food 🍜', 'Culture 🎭', 'Adventure 🧗', 'Shopping 🛍️',
  'Nature 🌿', 'History 🏛️', 'Nightlife 🌃', 'Beaches 🏖️',
  'Mountains 🏔️', 'Photography 📸', 'Luxury 💎', 'Budget 💰',
  'Spiritual 🛕', 'Wildlife 🐘', 'Road Trips 🚗', 'Festivals 🎉',
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

const TRAVEL_TIPS = [
  { icon: '🛂', tip: 'Check visa requirements at least 4 weeks before travel.' },
  { icon: '💳', tip: 'Notify your bank before traveling internationally.' },
  { icon: '🌐', tip: 'Download offline maps before your trip.' },
  { icon: '🧴', tip: 'Pack light — you can always buy things there!' },
  { icon: '📸', tip: 'Visit popular spots early morning to avoid crowds.' },
  { icon: '💊', tip: 'Carry a basic first aid kit and any prescriptions.' },
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

  const addActivity = (dayIndex: number) => {
    const text = newActivity[dayIndex];
    if (!text?.trim()) return;
    const updated = { ...result };
    updated.itinerary[dayIndex].activities.push(text.trim());
    setResult({ ...updated });
    setNewActivity(prev => ({ ...prev, [dayIndex]: '' }));
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
    bg-gradient-to-br from-orange-50 via-gray-300 to-rose-50
    dark:from-gray-950 dark:via-gray-900 dark:to-black
    relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-pink-400 opacity-15 blur-3xl rounded-full"></div>

      <Navbar />

      {/* BANNER */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80"
          alt="Travel Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-black/50 to-pink-900/60 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">
            ✈️ Plan Your Perfect Trip
          </h1>
          <p className="text-orange-200 mt-2 text-sm max-w-xl">
            AI-powered itineraries tailored just for you — in seconds!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">

        {/* MAIN LAYOUT — Form + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT — Main Form */}
          <div className="flex-1">

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
                      rounded-xl p-3 hover:shadow-lg hover:-translate-y-1 transition
                      border border-gray-100 dark:border-gray-800 text-center"
                    >
                      <div className="text-2xl">{dest.emoji}</div>
                      <div className="text-xs font-medium text-gray-800 dark:text-white mt-1">
                        {dest.name.split(',')[0]}
                      </div>
                      <div className="text-xs text-gray-400">{dest.tag}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trip Summary Card */}
            {result && (
              <div className="mb-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-5 text-white shadow-xl">
                <p className="text-xs uppercase tracking-widest text-orange-100 mb-2">Trip Summary</p>
                <h2 className="text-2xl font-bold mb-3">✈️ {form.destination}</h2>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold">{form.days}</p>
                    <p className="text-xs text-orange-100">Days</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold">{form.budget}</p>
                    <p className="text-xs text-orange-100">Budget</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold">{form.interests.length || '—'}</p>
                    <p className="text-xs text-orange-100">Interests</p>
                  </div>
                </div>
                {result.budget?.total && (
                  <div className="mt-3 pt-3 border-t border-white/20 flex justify-between">
                    <span className="text-orange-100 text-sm">Estimated Total</span>
                    <span className="text-xl font-bold">{result.budget.total}</span>
                  </div>
                )}
              </div>
            )}

            {/* FORM */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur
            p-6 rounded-2xl shadow-xl flex flex-col gap-4 border border-gray-100 dark:border-gray-800">

              <input
                className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl p-4 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none placeholder:text-gray-400"
                placeholder="📍 Destination (e.g. Tokyo, Japan)"
                value={form.destination}
                onChange={e => setForm({ ...form, destination: e.target.value })}
              />

              <input
                className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl p-4 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none"
                type="number"
                min={1}
                max={30}
                placeholder="📅 Number of days"
                value={form.days}
                onChange={e => setForm({ ...form, days: +e.target.value })}
              />

              <select
                className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl p-4 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none"
                onChange={e => setForm({ ...form, budget: e.target.value })}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <div>
                <p className="font-medium mb-3 text-gray-700 dark:text-gray-300">🎯 Interests</p>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map(i => (
                    <button
                      key={i}
                      onClick={() => toggleInterest(i)}
                      className={`px-3 py-1.5 rounded-full text-sm transition ${
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
                text-white p-4 rounded-xl font-semibold shadow-lg
                hover:scale-[1.02] disabled:opacity-50 transition text-lg"
              >
                {loading ? '⏳ Generating...' : 'Generate Itinerary ✨'}
              </button>
            </div>

            {/* Weather */}
            {result && <WeatherInfo destination={form.destination} />}

            {/* ITINERARY */}
            {result && (
              <div className="mt-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur
              p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold mb-4
                bg-gradient-to-r from-orange-500 to-pink-500
                text-transparent bg-clip-text">
                  🗺️ Your Itinerary
                </h2>

                {result.itinerary?.map((day: any, dayIndex: number) => (
                  <div key={day.day} className="mb-6 p-4 rounded-xl bg-orange-50 dark:bg-gray-800 border border-orange-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-orange-500">🗓️ Day {day.day}</h3>
                      <button
                        onClick={() => regenerateDay(dayIndex)}
                        className="text-xs bg-white dark:bg-gray-700 text-orange-500 px-3 py-1 rounded-full border border-orange-200 dark:border-gray-600 hover:bg-orange-50 transition"
                      >
                        🔄 Regenerate
                      </button>
                    </div>

                    <ul className="flex flex-col gap-2 mb-3">
                      {day.activities.map((act: string, i: number) => (
                        <li key={i} className="flex justify-between items-center bg-white dark:bg-gray-700 px-3 py-2 rounded-lg text-sm">
                          <span className="text-gray-700 dark:text-gray-300">• {act}</span>
                          <button
                            onClick={() => removeActivity(dayIndex, i)}
                            className="text-red-400 hover:text-red-600 ml-2 text-xs"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-2">
                      <input
                        className="border border-orange-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-lg text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-gray-400"
                        placeholder="Add activity..."
                        value={newActivity[dayIndex] || ''}
                        onChange={e => setNewActivity(prev => ({ ...prev, [dayIndex]: e.target.value }))}
                      />
                      <button
                        onClick={() => addActivity(dayIndex)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm transition"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                ))}

                {/* Budget */}
                {result.budget && (
                  <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">💰 Budget Breakdown</h3>
                    {Object.entries(result.budget).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm py-2 border-b border-gray-50 dark:border-gray-800 last:border-0 capitalize">
                        <span className="text-gray-500 dark:text-gray-400">{k}</span>
                        <span className="font-semibold text-orange-500">{v as string}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hotels */}
                {result.hotels && (
                  <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">🏨 Hotel Suggestions</h3>
                    {result.hotels.map((h: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                        <span className="text-gray-600 dark:text-gray-400">{h.name}</span>
                        <span className="text-orange-500 font-medium">{h.type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:w-80 flex flex-col gap-6">

            {/* Quick Stats */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">🌟 Why Plan with AI?</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '⚡', text: 'Itinerary in seconds' },
                  { icon: '🎯', text: 'Personalized for you' },
                  { icon: '💰', text: 'Budget-aware planning' },
                  { icon: '✏️', text: 'Fully editable plans' },
                  { icon: '🌤️', text: 'Live weather info' },
                  { icon: '🏨', text: 'Hotel suggestions' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">💡 Travel Tips</h3>
              <div className="flex flex-col gap-3">
                {TRAVEL_TIPS.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-base mt-0.5">{tip.icon}</span>
                    <span>{tip.tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Did You Know */}
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-5 text-white shadow-lg">
              <h3 className="font-bold mb-2">🌍 Did You Know?</h3>
              <p className="text-sm text-orange-100 leading-relaxed">
                Travelers who plan their trips in advance save up to <strong>30% more</strong> on accommodation and activities!
              </p>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-800 shadow-lg">
            <div className="text-4xl mb-3">🗺️</div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-1">150+ Destinations</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">From exotic beaches to mountain retreats</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-800 shadow-lg">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-1">Instant Planning</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get your full itinerary in under 30 seconds</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-800 shadow-lg">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-1">100% Personalized</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Every plan tailored to your unique interests</p>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="text-center py-6 mt-12 text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800">
        © 2025 TripPlanner AI ✨
      </footer>

    </div>
  );
}