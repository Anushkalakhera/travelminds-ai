'use client';
import { useEffect, useState } from 'react';
import { getProfile, updateProfile, getMyTrips } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }

    getProfile().then(data => {
      setUser(data);
      setName(data.name);
    });

    getMyTrips().then(setTrips);
  }, []);

  const handleSave = async () => {
    const updated = await updateProfile({ name });
    setUser(updated);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return (
    <div className="min-h-screen bg-warm-50 dark:bg-gray-950">
      <Navbar />
      <div className="flex items-center justify-center mt-20 text-warm-300 dark:text-gray-400">
        Loading...
      </div>
    </div>
  );

  // Avatar initials
  const initials = user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  // Stats
  const totalDays = trips.reduce((sum, t) => sum + (t.days || 0), 0);
  const destinations = [...new Set(trips.map(t => t.destination))].length;
  const budgets = trips.map(t => t.budget);
  const favBudget = ['High', 'Medium', 'Low'].find(b => budgets.includes(b)) || '—';

  return (
    <div className="min-h-screen 
    bg-gradient-to-br from-orange-50 via-gray-400 to-rose-50 
    dark:from-gray-950 dark:via-gray-900 dark:to-black 
    relative overflow-hidden">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-warm-100 dark:border-gray-800 mb-6">

          {/* Avatar + Info */}
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full bg-warm-400 dark:bg-warm-300 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {initials}
            </div>
            <div className="flex-1">
              {editing ? (
                <input
                  className="border border-warm-100 dark:border-gray-700 bg-warm-50 dark:bg-gray-800 text-warm-400 dark:text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-warm-300 text-lg font-semibold"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              ) : (
                <h1 className="text-2xl font-bold text-warm-400 dark:text-white">{user.name}</h1>
              )}
              <p className="text-warm-300 dark:text-gray-400 text-sm mt-1">✉️ {user.email}</p>
              {saved && <p className="text-green-500 text-sm mt-1">✅ Profile updated!</p>}
            </div>
          </div>

          {/* Edit Buttons */}
          <div className="flex gap-2">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-warm-400 hover:bg-warm-300 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => { setEditing(false); setName(user.name); }}
                  className="border border-warm-100 dark:border-gray-700 text-warm-300 dark:text-gray-400 px-4 py-2 rounded-lg text-sm transition hover:bg-warm-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="border border-warm-100 dark:border-gray-700 text-warm-400 dark:text-gray-300 px-4 py-2 rounded-lg text-sm transition hover:bg-warm-50 dark:hover:bg-gray-800"
              >
                ✏️ Edit Name
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center border border-warm-100 dark:border-gray-800 shadow-sm">
            <p className="text-3xl font-bold text-warm-400 dark:text-white">{trips.length}</p>
            <p className="text-xs text-warm-300 dark:text-gray-400 mt-1">Total Trips</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center border border-warm-100 dark:border-gray-800 shadow-sm">
            <p className="text-3xl font-bold text-warm-400 dark:text-white">{totalDays}</p>
            <p className="text-xs text-warm-300 dark:text-gray-400 mt-1">Days Planned</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center border border-warm-100 dark:border-gray-800 shadow-sm">
            <p className="text-3xl font-bold text-warm-400 dark:text-white">{destinations}</p>
            <p className="text-xs text-warm-300 dark:text-gray-400 mt-1">Destinations</p>
          </div>
        </div>

        {/* Recent Trips */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-warm-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-warm-400 dark:text-white text-lg">Recent Trips</h2>
            <Link href="/dashboard" className="text-sm text-warm-300 dark:text-gray-400 hover:underline">
              View all →
            </Link>
          </div>

          {trips.length === 0 ? (
            <div className="text-center py-8 text-warm-300 dark:text-gray-500">
              <p>No trips yet!</p>
              <Link href="/plan" className="text-warm-400 dark:text-warm-200 font-semibold hover:underline text-sm">
                Plan your first trip →
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {trips.slice(0, 4).map((trip: any) => (
                <Link
                  key={trip._id}
                  href={`/trips/${trip._id}`}
                  className="flex justify-between items-center bg-warm-50 dark:bg-gray-800 px-4 py-3 rounded-xl hover:bg-warm-100 dark:hover:bg-gray-700 transition"
                >
                  <div>
                    <p className="font-medium text-warm-400 dark:text-white text-sm">✈️ {trip.destination}</p>
                    <p className="text-xs text-warm-300 dark:text-gray-400">{trip.days} days · {trip.budget}</p>
                  </div>
                  <span className="text-warm-200 dark:text-gray-500 text-xs">
                    {new Date(trip.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}