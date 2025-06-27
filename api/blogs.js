import { connectToDatabase } from '../utils/db';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
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
  if (req.method === 'GET') {
    try {
      const blogs = await Blog.find();
      return res.status(200).json(blogs);
    } catch {
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  }
  if (req.method === 'POST') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const blog = new Blog(req.body);
      await blog.save();
      return res.status(201).json(blog);
    } catch {
      return res.status(500).json({ error: 'Failed to create blog' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
