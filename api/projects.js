import { connectToDatabase } from '../utils/db';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  featured: { type: Boolean, default: false },
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
  if (req.method === 'GET') {
    try {
      const projects = await Project.find();
      return res.status(200).json(projects);
    } catch {
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }
  if (req.method === 'POST') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const project = new Project(req.body);
      await project.save();
      return res.status(201).json(project);
    } catch {
      return res.status(500).json({ error: 'Failed to create project' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
 