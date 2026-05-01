'use client';
import { useEffect, useState } from 'react';
import { getMyTrips, deleteTrip } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

export default function Dashboard() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    getMyTrips().then(data => {
      setTrips(data);
      setLoading(false);
    });
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

  return (
    <div className="min-h-screen 
    bg-gradient-to-br from-orange-50 via-white to-rose-50 
    dark:from-gray-950 dark:via-gray-900 dark:to-black 
    relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>

      <Navbar />

      {/* HERO */}
      <div className="relative h-72 overflow-hidden mb-8">
        <img
          src="/images/cexin-ding-8ZsK6Db6ikY-unsplash.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute bottom-5 left-6 text-white">
          <h2 className="text-2xl font-bold">Welcome Back 👋</h2>
          <p className="text-sm opacity-90">
            Ready to explore your next adventure?
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6 relative z-10">

        {/* LEFT */}
        <div className="md:col-span-2">

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white/80 dark:bg-gray-800 shadow text-center">
              <p className="text-sm text-gray-500">Trips</p>
              <h2 className="text-xl font-bold">{trips.length}</h2>
            </div>

            <div className="p-4 rounded-xl bg-white/80 dark:bg-gray-800 shadow text-center">
              <p className="text-sm text-gray-500">Total Days</p>
              <h2 className="text-xl font-bold">
                {trips.reduce((a, t) => a + t.days, 0)}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-white/80 dark:bg-gray-800 shadow text-center">
              <p className="text-sm text-gray-500">Budget Trips</p>
              <h2 className="text-xl font-bold">
                {trips.filter(t => t.budget === 'low').length}
              </h2>
            </div>
          </div>

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold 
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

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 px-4 py-2 rounded-xl border 
            dark:bg-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* CONTENT */}
          {loading ? (
            <div className="text-center text-gray-500 mt-20">
              Loading...
            </div>

          ) : filteredTrips.length === 0 ? (

            <div className="space-y-8 mt-10">

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                  No trips yet ✈️
                </h2>
                <p className="text-gray-500 mb-4">
                  Start planning your first adventure
                </p>

                <Link
                  href="/plan"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 
                  text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
                >
                  Plan a Trip
                </Link>
              </div>

              {/* EXPLORE */}
              <div>
                <h3 className="text-lg font-semibold mb-3">🌍 Explore Ideas</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-orange-100 dark:bg-gray-800 p-3 rounded-xl">Goa 🏖️</div>
                  <div className="bg-orange-100 dark:bg-gray-800 p-3 rounded-xl">Manali 🏔️</div>
                  <div className="bg-orange-100 dark:bg-gray-800 p-3 rounded-xl">Jaipur 🏰</div>
                  <div className="bg-orange-100 dark:bg-gray-800 p-3 rounded-xl">Kerala 🌴</div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white/80 dark:bg-gray-900 p-5 rounded-xl shadow">
                <h3 className="font-semibold mb-3">❓ FAQs</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>👉 Create trip → Click “Plan a Trip”</p>
                  <p>👉 Edit later → Yes</p>
                  <p>👉 Auto save → Yes</p>
                </div>
              </div>

            </div>

          ) : (

            <div className="grid gap-6">
              {filteredTrips.map((trip: any) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl 
                  bg-orange-100/80 dark:bg-gray-900/80 
                  shadow-md hover:shadow-xl hover:-translate-y-1 
                  transition border border-orange-200 dark:border-gray-800 
                  flex justify-between items-center"
                >
                  <Link href={`/trips/${trip._id}`} className="flex-1">
                    <h2 className="text-xl font-semibold 
                    bg-gradient-to-r from-orange-500 to-pink-500 
                    text-transparent bg-clip-text">
                      ✈️ {trip.destination}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      📅 {trip.days} days
                    </p>
                  </Link>

                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="ml-4 px-3 py-2 rounded-lg 
                    text-red-500 hover:text-white hover:bg-red-500 transition"
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
  <div className="p-5 bg-white/80 dark:bg-gray-900 rounded-xl shadow flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
      A
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-white">
        Traveler
      </h3>
      <p className="text-xs text-gray-500">Plan your journeys ✈️</p>
    </div>
  </div>

  {/* RECENT TRIPS */}
  <div className="p-4 bg-white/80 dark:bg-gray-900 rounded-xl shadow">
    <h3 className="font-semibold mb-3">📍 Recent Trips</h3>

    {trips.length === 0 ? (
      <p className="text-sm text-gray-400">No trips yet</p>
    ) : (
      trips.slice(0, 3).map(t => (
        <div key={t._id} className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          ✈️ {t.destination}
        </div>
      ))
    )}
  </div>

  {/* QUICK STATS */}
  <div className="p-4 bg-white/80 dark:bg-gray-900 rounded-xl shadow">
    <h3 className="font-semibold mb-3">📊 Quick Stats</h3>

    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
      <span>Trips</span>
      <span>{trips.length}</span>
    </div>

    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
      <span>Total Days</span>
      <span>{trips.reduce((a,t)=>a+t.days,0)}</span>
    </div>
  </div>

  {/* EXPLORE MINI */}
  <div className="p-4 bg-white/80 dark:bg-gray-900 rounded-xl shadow">
    <h3 className="font-semibold mb-3">🌍 Explore</h3>

    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="bg-orange-100 dark:bg-gray-800 p-2 rounded-lg text-center">Goa</div>
      <div className="bg-orange-100 dark:bg-gray-800 p-2 rounded-lg text-center">Manali</div>
      <div className="bg-orange-100 dark:bg-gray-800 p-2 rounded-lg text-center">Jaipur</div>
      <div className="bg-orange-100 dark:bg-gray-800 p-2 rounded-lg text-center">Kerala</div>
    </div>
  </div>

  {/* TIP CARD */}
  <div className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl shadow">
    <h3 className="font-semibold mb-2">💡 Travel Tip</h3>
    <p className="text-sm opacity-90">
      Pack light and keep essentials handy 🎒
    </p>
  </div>

</div>

      </div>
    </div>
  );
}