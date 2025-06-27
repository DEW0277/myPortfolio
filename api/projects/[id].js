import { connectToDatabase } from '../../utils/db';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const projectSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  technologies: [String],
  featured: Boolean,
  image: String,
  link: String,
  github: String,
});
const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);

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
      const project = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!project) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(project);
    } catch {
      return res.status(500).json({ error: 'Failed to update project' });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await Project.findByIdAndDelete(id);
      return res.status(204).end();
    } catch {
      return res.status(500).json({ error: 'Failed to delete project' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
