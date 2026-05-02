import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import tripRoutes from './routes/trips'; // ✅ ADD THIS
import weatherRoutes from './routes/weather';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/trips', tripRoutes); 
app.use('/weather', weatherRoutes);

app.get("/check", (req, res) => {
  res.send("OK");
});

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log('MongoDB connected');
  const PORT = Number(process.env.PORT) || 10000;
  app.listen(PORT , '0.0.0.0', () =>
    console.log('Server running on port ' + PORT)
  );
}).catch(err => console.error('MongoDB connection error:', err));