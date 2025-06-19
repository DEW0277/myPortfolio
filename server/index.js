const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure nodemailer (you'll need to set up your email credentials)
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio Backend Server Running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email configuration
    const mailOptions = {
      from: email,
      to: process.env.CONTACT_EMAIL || 'your-email@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Portfolio data endpoint
app.get('/api/portfolio', (req, res) => {
  const portfolioData = {
    projects: [
      {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'fullstack',
        description: 'Modern e-commerce platform with React, Node.js, and MongoDB.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        featured: true
      },
      {
        id: 2,
        title: 'Task Management App',
        category: 'frontend',
        description: 'Beautiful task management application with drag-and-drop functionality.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        featured: true
      }
    ],
    stats: {
      yearsExperience: 5,
      projectsCompleted: 50,
      happyClients: 30
    }
  };

  res.json(portfolioData);
});

// Experience data endpoint
app.get('/api/experience', (req, res) => {
  const experience = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      duration: '2022 - Present',
      description: 'Led development of scalable web applications using React and Node.js',
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker']
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions LLC',
      location: 'Austin, TX',
      duration: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using MERN stack',
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'GraphQL']
    }
  ];

  res.json(experience);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});