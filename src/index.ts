import express from 'express';
import { db } from './config/firebase';

const app = express();
app.use(express.json());

// Root route
app.get('/', async (req, res) => {
  res.json({ message: 'Welcome to Aigency API' });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    res.json({ status: 'ok', message: 'Server is running' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// For Vercel serverless deployment
export default app;

// For local development
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} 