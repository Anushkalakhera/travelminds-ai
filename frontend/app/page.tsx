'use client';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import Link from 'next/link';


function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-orange-100 dark:bg-gray-900/80 backdrop-blur rounded-2xl
      border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 text-left"
      >
        <span className="font-semibold text-gray-800 dark:text-white text-sm">{q}</span>
        <span className="text-orange-500 text-xl font-bold ml-4">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen 
    bg-gradient-to-br from-orange-50 via-gray-500 to-rose-50 
    dark:from-gray-950 dark:via-gray-900 dark:to-black 
    relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-orange-400 opacity-25 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>

      <Navbar />

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-24 relative z-10">

        <span className="bg-white/80 dark:bg-gray-800/80 text-sm px-5 py-2 rounded-full shadow backdrop-blur">
          🤖 Powered by AI
        </span>

        <h2 className="text-5xl md:text-6xl font-extrabold mt-6 
        bg-gradient-to-r 
        from-orange-600 via-pink-500 to-red-500 
        dark:from-orange-300 dark:via-pink-300 dark:to-yellow-300 
        text-transparent bg-clip-text leading-tight 
        drop-shadow-[0_2px_12px_rgba(255,120,50,0.3)]">
          Plan Your Dream Trip <br /> in Seconds
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mt-4">
          Get AI-powered itineraries, budget estimates, and hotel suggestions — instantly.
        </p>

        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          <Link
            href="/register"
            className="bg-gradient-to-r from-orange-500 to-pink-500 
            text-white px-8 py-3 rounded-xl text-lg font-semibold 
            shadow-xl hover:scale-105 hover:shadow-2xl transition"
          >
            Start Planning
          </Link>

          <Link
            href="/login"
            className="border border-gray-300 dark:border-gray-600 
            px-8 py-3 rounded-xl text-lg font-semibold 
            hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Login
          </Link>
        </div>

        {/* Hero Image */}
        <div className="mt-14 w-full max-w-5xl rounded-3xl overflow-hidden 
        shadow-[0_20px_60px_rgba(255,120,50,0.2)] hover:scale-[1.02] transition">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
            alt="Travel"
            className="w-full h-[420px] object-cover"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 relative z-10">
        <h3 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Why TravelMinds AI?
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "🗺️",
              title: "AI Itinerary",
              desc: "Day-by-day travel plans tailored to your interests."
            },
            {
              icon: "💰",
              title: "Budget Control",
              desc: "Know exactly how much your trip will cost."
            },
            {
              icon: "🏨",
              title: "Hotel Picks",
              desc: "Best stays based on your budget & location."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl 
              bg-white/80 dark:bg-gray-900/80 backdrop-blur 
              shadow-lg hover:shadow-2xl hover:-translate-y-2 
              transition text-center border border-gray-100 dark:border-gray-800"
            >
              <div className="text-5xl mb-4">{item.icon}</div>

              <h4 className="text-xl font-semibold mb-2 
              bg-gradient-to-r from-orange-500 to-pink-500 
              text-transparent bg-clip-text">
                {item.title}
              </h4>

              <p className="text-gray-500 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur">
        <h3 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            "Enter your trip details",
            "AI generates your plan",
            "Customize & travel"
          ].map((step, i) => (
            <div
              key={i}
              className="p-8 text-center 
              bg-gradient-to-br from-orange-50 to-pink-50 
              dark:from-gray-800 dark:to-gray-900 
              rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="text-4xl font-bold 
              bg-gradient-to-r from-orange-500 to-pink-500 
              text-transparent bg-clip-text mb-4">
                {i + 1}
              </div>

              <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                {step}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '10K+', label: 'Trips Planned' },
            { number: '150+', label: 'Destinations' },
            { number: '50K+', label: 'Happy Travelers' },
            { number: '4.9★', label: 'Average Rating' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl
              bg-white/80 dark:bg-gray-900/80 backdrop-blur
              shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <p className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                {stat.number}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur">
        <h3 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          What Travelers Say 💬
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: 'Priya Sharma',
              location: 'Mumbai, India',
              review: 'TravelMinds AI saved me hours of research! My Bali trip was perfectly planned in minutes.',
              rating: 5,
              avatar: 'PS',
            },
            {
              name: 'Rahul Verma',
              location: 'Delhi, India',
              review: 'The budget breakdown was spot on. I knew exactly what to expect before even booking anything!',
              rating: 5,
              avatar: 'RV',
            },
            {
              name: 'Ananya Singh',
              location: 'Bangalore, India',
              review: 'Love the editable itinerary feature. I could customize every day exactly how I wanted.',
              rating: 5,
              avatar: 'AS',
            },
          ].map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl
              bg-white/80 dark:bg-gray-900/80 backdrop-blur
              shadow-lg hover:shadow-2xl hover:-translate-y-1
              transition border border-gray-100 dark:border-gray-800"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, j) => (
                  <span key={j} className="text-orange-400">★</span>
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                "{t.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 relative z-10">
        <h3 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Frequently Asked Questions ❓
        </h3>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {[
            {
              q: 'Is TravelMinds AI free to use?',
              a: 'Yes! You can create an account and start planning trips completely free.',
            },
            {
              q: 'How does the AI generate itineraries?',
              a: 'We use advanced AI models to create personalized day-by-day plans based on your destination, budget, interests, and number of days.',
            },
            {
              q: 'Can I edit the generated itinerary?',
              a: 'Absolutely! You can add, remove, or regenerate activities for any day. The itinerary is fully customizable.',
            },
            {
              q: 'Is my data safe?',
              a: 'Yes, we use JWT authentication and all your data is securely stored. Only you can access your trips.',
            },
            {
              q: 'Which destinations are supported?',
              a: 'TravelMinds AI supports 150+ destinations worldwide. Simply type your destination and let AI do the rest!',
            },
          ].map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h3 className="text-4xl font-bold mb-4 
        bg-gradient-to-r from-orange-600 to-pink-500 
        text-transparent bg-clip-text">
          Ready for your next trip?
        </h3>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Let AI handle planning while you enjoy the journey ✈️
        </p>

        <Link
          href="/register"
          className="bg-gradient-to-r from-orange-500 to-pink-500 
          text-white px-10 py-4 rounded-xl text-lg font-semibold 
          shadow-xl hover:scale-105 hover:shadow-2xl transition"
        >
          Get Started Free
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-200 dark:border-gray-800">
        © 2026 TravelMinds AI ✨
      </footer>

    </main>
  );
}