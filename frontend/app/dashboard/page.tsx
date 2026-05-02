'use client';
import { useEffect, useState } from 'react';
import { getMyTrips, deleteTrip, getProfile } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const TRAVEL_TIPS = [
  'Pack light and keep essentials handy 🎒',
  'Always carry a power bank! 🔋',
  'Book hotels early for better deals 🏨',
  'Try local street food — it\'s the best! 🍜',
  'Keep digital copies of your documents 📄',
  'Learn a few words of the local language 🗣️',
];

export default function Dashboard() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<any>(null);
  const [tipIndex, setTipIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    getMyTrips().then(data => {
      setTrips(data);
      setLoading(false);
    });
    getProfile().then(setUser);

    // Rotate tips every 5 seconds
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % TRAVEL_TIPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Delete this trip?');
    if (!confirm) return;
    await deleteTrip(id);
    setTrips(prev => prev.filter(t => t._id !== id));
  };

  const filteredTrips = trips.filter(t =>
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  const totalDays = trips.reduce((a, t) => a + t.days, 0);
  const budgetTrips = trips.filter(t => t.budget === 'Low').length;

  return (
    <div className="min-h-screen
    bg-gradient-to-br from-orange-50 via-white to-rose-50
    dark:from-gray-950 dark:via-gray-900 dark:to-black
    relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>

      <Navbar />

      {/* HERO BANNER */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80"
          className="w-full h-full object-cover"
          alt="Travel"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-black/50 to-pink-900/60"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white">
              Welcome back, {user?.name?.split(' ')[0] || 'Traveler'} 👋
            </h2>
            <p className="text-orange-200 mt-2">
              Ready to explore your next adventure?
            </p>
            <Link
              href="/plan"
              className="mt-4 inline-block bg-gradient-to-r from-orange-500 to-pink-500
              text-white px-6 py-2 rounded-xl text-sm font-semibold shadow-lg hover:scale-105 transition"
            >
              + Plan New Trip
            </Link>
          </motion.div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6 relative z-10">

        {/* LEFT */}
        <div className="md:col-span-2">

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Trips', value: trips.length, icon: '✈️' },
              { label: 'Total Days', value: totalDays, icon: '📅' },
              { label: 'Budget Trips', value: budgetTrips, icon: '💰' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow text-center border border-gray-100 dark:border-gray-700"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                  {stat.value}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* HEADER + SEARCH */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold
            bg-gradient-to-r from-orange-600 to-pink-500
            text-transparent bg-clip-text">
              My Trips
            </h1>
            <Link
              href="/plan"
              className="bg-gradient-to-r from-orange-500 to-pink-500
              text-white px-5 py-2 rounded-xl text-sm font-semibold
              shadow-lg hover:scale-105 transition"
            >
              + New Trip
            </Link>
          </div>

          <input
            type="text"
            placeholder="🔍 Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
            bg-white/80 dark:bg-gray-900/80 backdrop-blur outline-none
            focus:ring-2 focus:ring-orange-400 text-sm text-gray-700 dark:text-gray-300"
          />

          {/* TRIPS */}
          {loading ? (
            <div className="text-center text-gray-500 mt-20">Loading...</div>

          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌍</div>
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No trips yet!
              </h2>
              <p className="text-gray-500 mb-6">Start planning your first adventure</p>
              <Link
                href="/plan"
                className="bg-gradient-to-r from-orange-500 to-pink-500
                text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition font-semibold"
              >
                Plan a Trip ✨
              </Link>
            </div>

          ) : (
            <div className="grid gap-4">
              {filteredTrips.map((trip: any, index: number) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-2xl
                  bg-white/80 dark:bg-gray-900/80 backdrop-blur
                  shadow-md hover:shadow-xl hover:-translate-y-1
                  transition border border-orange-100 dark:border-gray-800
                  flex justify-between items-center"
                >
                  <Link href={`/trips/${trip._id}`} className="flex-1">
                    <h2 className="text-lg font-semibold
                    bg-gradient-to-r from-orange-500 to-pink-500
                    text-transparent bg-clip-text">
                      ✈️ {trip.destination}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      📅 {trip.days} days · 💰 {trip.budget} · 🎯 {trip.interests?.slice(0, 2).join(', ')}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      🗓️ {new Date(trip.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  </Link>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="ml-4 px-3 py-2 rounded-lg
                    text-red-400 hover:text-white hover:bg-red-500 transition text-sm"
                  >
                    🗑️
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">

          {/* USER CARD */}
          <div className="p-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {initials}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">{user?.name || 'Traveler'}</h3>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Link
              href="/profile"
              className="w-full block text-center text-sm border border-orange-200 dark:border-gray-700 text-orange-500 py-2 rounded-xl hover:bg-orange-50 dark:hover:bg-gray-800 transition"
            >
              View Profile →
            </Link>
          </div>

          {/* RECENT TRIPS */}
          <div className="p-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold mb-3 text-gray-800 dark:text-white">📍 Recent Trips</h3>
            {trips.length === 0 ? (
              <p className="text-sm text-gray-400">No trips yet</p>
            ) : (
              trips.slice(0, 4).map(t => (
                <Link key={t._id} href={`/trips/${t._id}`}>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 hover:text-orange-500 transition py-1 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    ✈️ {t.destination}
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* EXPLORE */}
          <div className="p-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold mb-3 text-gray-800 dark:text-white">🌍 Explore Ideas</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Goa 🏖️', 'Manali 🏔️', 'Jaipur 🏰', 'Kerala 🌴', 'Leh 🗻', 'Varanasi 🛕'].map((place, i) => (
                <Link key={i} href="/plan">
                  <div className="bg-orange-50 dark:bg-gray-800 hover:bg-orange-100 dark:hover:bg-gray-700 p-2 rounded-xl text-center text-gray-700 dark:text-gray-300 transition cursor-pointer text-xs">
                    {place}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ROTATING TRAVEL TIP */}
          <motion.div
            key={tipIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl shadow"
          >
            <h3 className="font-bold mb-2">💡 Travel Tip</h3>
            <p className="text-sm opacity-90">{TRAVEL_TIPS[tipIndex]}</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}