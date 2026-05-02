'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dark, toggleTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-warm-100 dark:border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link href="/" className="text-xl font-bold text-warm-400 dark:text-warm-200">
        ✈️ TravelMinds AI
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/" className="text-warm-300 dark:text-gray-300 hover:text-warm-400 dark:hover:text-warm-200 text-sm transition">
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="text-warm-300 dark:text-gray-300 hover:text-warm-400 dark:hover:text-warm-200 text-sm transition">
              Dashboard
            </Link>
          
            <Link href="/plan" className="text-warm-300 dark:text-gray-300 hover:text-warm-400 dark:hover:text-warm-200 text-sm transition">
              New Trip
            </Link>
            <button
              onClick={logout}
              className="bg-warm-400 hover:bg-warm-300 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
            >
              Logout
            </button>
             <Link
                href="/profile"
                className="px-3 py-1.5 rounded-full text-sm font-medium 
                bg-gray-100 dark:bg-gray-800 
                text-gray-700 dark:text-gray-300 
                hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 
                hover:text-white transition"
              >
                👤 Profile
              </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="text-warm-300 dark:text-gray-300 hover:text-warm-400 dark:hover:text-warm-200 text-sm transition">
              Login
            </Link>
            <Link href="/register" className="bg-warm-400 hover:bg-warm-300 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition">
              Register
            </Link>
          </>
        )}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-warm-50 dark:bg-gray-800 text-warm-400 dark:text-gray-300 hover:bg-warm-100 dark:hover:bg-gray-700 transition"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}