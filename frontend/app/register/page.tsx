'use client';
import { useState } from 'react';
import { registerUser } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const res = await registerUser(form);
    if (res.message) {
      router.push('/login');
    } else {
      setError(res.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-pink-500 opacity-20 blur-3xl rounded-full"></div>

      {/* Card */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl w-full max-w-md relative z-10">

        <h1 className="text-2xl font-bold mb-2 text-center text-white">
          Create Account 🚀
        </h1>

        <p className="text-center text-gray-400 text-sm mb-6">
          Start planning your trips with AI
        </p>

        {error && (
          <p className="text-red-400 mb-4 text-sm text-center">{error}</p>
        )}

        <div className="flex flex-col gap-4">

          {/* Name */}
          <input
            className="bg-black/30 border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-500"
            placeholder="Full Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          {/* Email */}
          <input
            className="bg-black/30 border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-500"
            placeholder="Email"
            type="email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          {/* Password */}
          <input
            className="bg-black/30 border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-500"
            placeholder="Password"
            type="password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          {/* Button */}
          <button
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-3 rounded-xl font-semibold hover:scale-105 transition"
            onClick={handleRegister}
          >
            Register
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-orange-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}