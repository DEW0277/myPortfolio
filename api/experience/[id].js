import { connectToDatabase } from '../../utils/db';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  duration: String,
  description: String,
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
  const { id } = req.query;
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'PUT') {
    try {
      const experience = await Experience.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!experience) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(experience);
    } catch {
      return res.status(500).json({ error: 'Failed to update experience' });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await Experience.findByIdAndDelete(id);
      return res.status(204).end();
    } catch {
      return res.status(500).json({ error: 'Failed to delete experience' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
