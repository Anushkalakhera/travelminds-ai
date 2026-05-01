import { Router } from 'express';
import { protect } from '../middleware/auth';
import Trip from '../models/Trip';
import Groq from 'groq-sdk';

const router = Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/generate', protect, async (req: any, res) => {
  try {
    const { destination, days, budget, interests } = req.body;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `Generate a ${days}-day travel itinerary for ${destination}.
Budget level: ${budget}. Interests: ${interests.join(', ')}.
Return ONLY a valid JSON object, no extra text, no markdown, no backticks.
Use this exact structure:
{
  "itinerary": [{ "day": 1, "activities": ["...", "..."] }],
  "budget": { "flights": "$X", "accommodation": "$X", "food": "$X", "activities": "$X", "total": "$X" },
  "hotels": [{ "name": "...", "type": "Budget/Mid-range/Luxury" }]
}`
        }
      ],
    });

    const text = completion.choices[0]?.message?.content || '';
    const cleaned = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleaned);

    const trip = await Trip.create({
      userId: req.userId,
      destination,
      days,
      budget,
      interests,
      itinerary: data,
    });

    res.json(trip);
  } catch (error) {
    console.error('Trip generation error:', error);
    res.status(500).json({ error: 'Failed to generate trip' });
  }
});

router.get('/', protect, async (req: any, res) => {
  try {
    const trips = await Trip.find({ userId: req.userId });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});


// Day regenerate karne ka route
router.post('/regenerate-day', protect, async (req: any, res) => {
  try {
    const { destination, day, budget, interests } = req.body;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `Generate activities for Day ${day} of a trip to ${destination}.
Budget: ${budget}. Interests: ${interests.join(', ')}.
Return ONLY a JSON array of 4-5 activities, no extra text:
["activity 1", "activity 2", "activity 3"]`
        }
      ],
    });

    const text = completion.choices[0]?.message?.content || '';
    const cleaned = text.replace(/```json|```/g, '').trim();
    const activities = JSON.parse(cleaned);

    res.json({ activities });
  } catch (error) {
    console.error('Regenerate error:', error);
    res.status(500).json({ error: 'Failed to regenerate day' });
  }
});


router.delete('/:id', protect, async (req: any, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    
    // Check karo ki ye trip us user ki hi hai
    if (trip.userId?.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});


router.get('/:id', protect, async (req: any, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    if (trip.userId?.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

export default router;