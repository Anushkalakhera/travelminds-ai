'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function TripDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        setTrip(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-gray-300   to-rose-50">
      <Navbar />
      <div className="flex items-center justify-center mt-20 text-gray-500">
        Loading trip...
      </div>
    </div>
  );

  if (!trip) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-gray-300   to-rose-50">
      <Navbar />
      <div className="flex items-center justify-center mt-20 text-gray-500">
        Trip not found
      </div>
    </div>
  );

  return (
    <div className="min-h-screen 
    bg-gradient-to-br from-orange-50 via-gray-300 to-rose-50 
    dark:from-gray-950 dark:via-gray-900 dark:to-black 
    relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-300 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-pink-300 opacity-20 blur-3xl rounded-full"></div>

      <Navbar />

      <div className="max-w-3xl mx-auto p-6 relative z-10">

        {/* Back */}
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-500 hover:text-orange-500 text-sm mb-6 flex items-center gap-1 transition"
        >
          ← Back to Dashboard
        </button>

        {/* HEADER CARD */}
        <div className="bg-white/80 backdrop-blur border border-orange-100 rounded-3xl p-6 shadow-md mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ✈️ {trip.destination}
          </h1>

          <p className="text-gray-600">
            📅 {trip.days} days · 💰 {trip.budget}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {trip.interests?.map((interest: string) => (
              <span
                key={interest}
                className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* ITINERARY */}
        {trip.itinerary?.itinerary?.map((day: any) => (
          <div
            key={day.day}
            className="mb-5 bg-orange-100/70 border border-orange-200 
            rounded-2xl p-5 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-gray-800 text-lg mb-3">
              🗓️ Day {day.day}
            </h3>

            <ul className="flex flex-col gap-2">
              {day.activities.map((activity: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-700 text-sm 
                  bg-white border border-orange-100 px-3 py-2 rounded-lg"
                >
                  <span className="text-orange-500 mt-0.5">•</span>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* BUDGET */}
        {trip.itinerary?.budget && (
          <div className="bg-white/80 border border-orange-100 rounded-2xl p-5 mt-6 shadow-sm">
            <h3 className="font-semibold mb-3 text-gray-800">💰 Estimated Budget</h3>

            {Object.entries(trip.itinerary.budget).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between text-sm text-gray-600 py-2 border-b border-orange-100 last:border-0 capitalize"
              >
                <span>{k}</span>
                <span className="font-semibold text-orange-500">{v as string}</span>
              </div>
            ))}
          </div>
        )}

        {/* HOTELS */}
        {trip.itinerary?.hotels && (
          <div className="bg-white/80 border border-orange-100 rounded-2xl p-5 mt-6 mb-8 shadow-sm">
            <h3 className="font-semibold mb-3 text-gray-800">🏨 Hotel Suggestions</h3>

            {trip.itinerary.hotels.map((h: any, i: number) => (
              <div
                key={i}
                className="flex justify-between text-sm text-gray-600 py-2 border-b border-orange-100 last:border-0"
              >
                <span>{h.name}</span>
                <span className="text-orange-500 font-medium">{h.type}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}