import { Request, Response } from 'express';
import { db } from './config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// For Vercel serverless functions
export default async function handler(req: Request, res: Response) {
  if (req.method === 'GET') {
    try {
      // Try to write a test document
      const testCollection = collection(db, 'test');
      await addDoc(testCollection, {
        message: 'Test document',
        timestamp: new Date()
      });

      // Read all documents from test collection
      const querySnapshot = await getDocs(testCollection);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      res.json({ 
        message: 'Firebase connection successful',
        documents
      });
    } catch (error) {
      console.error('Firebase test error:', error);
      res.status(500).json({ 
        error: 'Firebase connection failed',
        details: error.message 
      });
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