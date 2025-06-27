import { connectToDatabase } from '../utils/db';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
});
const Experience =
  mongoose.models.Experience || mongoose.model('Experience', experienceSchema);

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const token = auth.split(' ')[1];
  try {
    return jwt.verify(token, 'your_jwt_secret_key_here');
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === 'GET') {
    try {
      const experiences = await Experience.find();
      return res.status(200).json(experiences);
    } catch {
      return res.status(500).json({ error: 'Failed to fetch experiences' });
    }
  }
  if (req.method === 'POST') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const experience = new Experience(req.body);
      await experience.save();
      return res.status(201).json(experience);
    } catch {
      return res.status(500).json({ error: 'Failed to create experience' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
