import { Request, Response } from 'express';
import { db } from './config/firebase';

// For Vercel serverless functions
export default async function handler(req: Request, res: Response) {
  if (req.method === 'GET') {
    if (req.url === '/api/firebase-test') {
      try {
        // Try to write to a test collection
        const testRef = db.collection('test').doc('connection-test');
        await testRef.set({
          timestamp: new Date(),
          status: 'success'
        });

        // Read it back
        const doc = await testRef.get();
        
        res.json({ 
          message: 'Firebase connection successful',
          data: doc.data()
        });
      } catch (error) {
        console.error('Firebase test error:', error);
        res.status(500).json({ 
          error: 'Firebase connection failed',
          details: error.message 
        });
      }
    } else {
      // Root route
      res.json({ message: 'Welcome to Aigency API' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Health check endpoint
export function healthCheck(req: Request, res: Response) {
  try {
    res.json({ status: 'ok', message: 'Server is running' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

// For local development
if (require.main === module) {
  const port = process.env.PORT || 3000;
  const app = require('express')();
  app.use(require('express').json());
  app.get('/api/health', healthCheck);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} 