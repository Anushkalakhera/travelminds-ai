import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destination: String,
  days: Number,
  budget: String,
  interests: [String],
  itinerary: Object,   // stores AI response
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Trip', tripSchema);