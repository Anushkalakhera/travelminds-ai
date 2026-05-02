# TravelMinds AI ✈️

An AI-powered travel planning web application that generates personalized day-by-day itineraries, budget estimates, and hotel suggestions instantly.

🌐 **Live Demo:** [travelminds-ai.vercel.app](https://travelminds-ai.vercel.app)

---

## Features

- 🤖 **AI Itinerary Generation** — Personalized day-by-day travel plans using Groq (LLaMA 3.3)
- 💰 **Budget Estimation** — Detailed cost breakdown for flights, hotels, food, and activities
- 🏨 **Hotel Suggestions** — AI-recommended stays based on budget and destination
- 🌤️ **Live Weather Info** — Real-time weather forecast for your destination
- ✏️ **Editable Itinerary** — Add, remove, or regenerate activities for any day
- 🔐 **Secure Authentication** — JWT-based login and registration
- 🌙 **Dark/Light Mode** — Beautiful UI in both themes
- 📊 **Trip Dashboard** — View, search, and manage all your trips
- 👤 **User Profile** — Stats, recent trips, and profile management

---

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt

### APIs & Services
- **Groq API** (LLaMA 3.3 70B) — AI itinerary generation
- **OpenWeatherMap API** — Weather forecasts
- **MongoDB Atlas** — Cloud database

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Architecture
trip-planner/
├── frontend/          ← Next.js app (deployed on Vercel)
│   ├── app/           ← Pages (App Router)
│   ├── components/    ← Reusable UI components
│   └── lib/           ← API helper functions
└── backend/           ← Express API (deployed on Render)
└── src/
├── models/    ← MongoDB schemas
├── routes/    ← API routes
└── middleware/← Auth middleware

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key
- OpenWeatherMap API key

### Installation

**Clone the repo:**
```bash
git clone https://github.com/Anushkalakhera/travelminds-ai.git
cd travelminds-ai
```

**Backend setup:**
```bash
cd backend
npm install
```

Create `backend/.env`:


MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_key
OPENWEATHER_API_KEY=your_openweather_key
PORT=5000

```bash
npm run dev
```

**Frontend setup:**
```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

NEXT_PUBLIC_API_URL=http://localhost:5000

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/profile` | Get profile | Yes |
| PUT | `/auth/profile` | Update profile | Yes |
| POST | `/trips/generate` | Generate AI itinerary | Yes |
| GET | `/trips` | Get all trips | Yes |
| GET | `/trips/:id` | Get single trip | Yes |
| DELETE | `/trips/:id` | Delete trip | Yes |
| POST | `/trips/regenerate-day` | Regenerate one day | Yes |
| GET | `/weather/:city` | Get weather forecast | Yes |

---

## Custom Feature — Live Weather Integration

As a custom creative feature, I integrated the **OpenWeatherMap API** to show real-time weather forecasts for the travel destination after generating an itinerary. This helps travelers know what to expect weather-wise before their trip, making planning more practical and informed.

---

## Security

- Passwords hashed with **bcrypt**
- JWT tokens with 7-day expiry
- Protected routes — users can only access their own data
- Environment variables for all sensitive keys

---

## Trade-offs & Decisions

- **Groq over OpenAI** — Free tier, faster inference, no billing required for development
- **JWT over sessions** — Stateless, works well with separate frontend/backend deployment
- **MongoDB over SQL** — Flexible schema for storing varied AI-generated itinerary structures
- **Next.js App Router** — Modern routing with server components support

---

## Developer

**Anushka Lakhera**
- GitHub: [@Anushkalakhera](https://github.com/Anushkalakhera)

---

© 2026 TravelMinds AI ✨

