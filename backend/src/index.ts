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
  app.listen(process.env.PORT, () =>
    console.log('Server running on port ' + process.env.PORT)
  );
});