import { connectToDatabase } from '../../utils/db';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const blogSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  image: String,
  date: String,
});
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

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
      const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      if (!blog) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(blog);
    } catch {
      return res.status(500).json({ error: 'Failed to update blog' });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await Blog.findByIdAndDelete(id);
      return res.status(204).end();
    } catch {
      return res.status(500).json({ error: 'Failed to delete blog' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
