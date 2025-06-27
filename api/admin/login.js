import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (username === 'JaloliddinDev' && password === 'JaloliddinDev0277') {
    const token = jwt.sign({ username }, 'your_jwt_secret_key_here', {
      expiresIn: '1d',
    });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
