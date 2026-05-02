const BASE = 'https://travelminds-ai.onrender.com';

const getToken = () => localStorage.getItem('token') || '';

export const registerUser = (data: { name: string; email: string; password: string }) =>
  fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const loginUser = (data: { email: string; password: string }) =>
  fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const generateTrip = (data: {
  destination: string;
  days: number;
  budget: string;
  interests: string[];
  prompt?: string;  
}) =>
  fetch(`${BASE}/trips/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const getMyTrips = () =>
  fetch(`${BASE}/trips`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(r => r.json());

  export const getProfile = () =>
  fetch(`${BASE}/auth/profile`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(r => r.json());

export const updateProfile = (data: { name: string }) =>
  fetch(`${BASE}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const deleteTrip = (id: string) =>
  fetch(`${BASE}/trips/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(r => r.json());
