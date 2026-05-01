'use client';
import { useState } from 'react';
import { loginUser } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await loginUser(form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      router.push('/dashboard');
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-orange-50 via-gray-400 to-rose-50 
    dark:from-gray-950 dark:via-gray-900 dark:to-black 
    relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-400 opacity-25 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>

      {/* Card */}
      <div className="relative z-10 
      bg-white/80 dark:bg-gray-900/80 backdrop-blur 
      p-8 rounded-2xl shadow-2xl w-full max-w-md 
      border border-gray-100 dark:border-gray-800 border-2 border-pink-200">

        <h1 className="text-3xl font-bold text-center mb-2 
        bg-gradient-to-r from-orange-600 to-pink-500 
        text-transparent bg-clip-text">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
          Login to continue planning
        </p>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4">

          {/* EMAIL */}
          <input
            className="border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-gray-800 
            text-gray-800 dark:text-white 
            p-3 rounded-xl focus:outline-none 
            focus:ring-2 focus:ring-orange-400 
            placeholder:text-gray-400"
            placeholder="Email"
            type="email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          {/* PASSWORD */}
          <input
            className="border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-gray-800 
            text-gray-800 dark:text-white 
            p-3 rounded-xl focus:outline-none 
            focus:ring-2 focus:ring-pink-400 
            placeholder:text-gray-400"
            placeholder="Password"
            type="password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          {/* BUTTON */}
          <button
            className="bg-gradient-to-r from-orange-500 to-pink-500 
            text-white p-3 rounded-xl font-semibold 
            shadow-lg hover:scale-[1.02] hover:shadow-xl transition"
            onClick={handleLogin}
          >
            Login
          </button>

          {/* LINK */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="bg-gradient-to-r from-orange-500 to-pink-500 
              text-transparent bg-clip-text font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}