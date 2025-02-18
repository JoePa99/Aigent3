import { Request, Response } from 'express';
import { db } from '../src/config/firebase';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to write to a test collection
    const testRef = db.collection('test').doc('connection-test');
    await testRef.set({
      timestamp: new Date(),
      status: 'success'
    });

    // Read it back
    const doc = await testRef.get();
    
    return res.json({ 
      message: 'Firebase connection successful',
      data: doc.data()
    });
  } catch (error) {
    console.error('Firebase test error:', error);
    return res.status(500).json({ 
      error: 'Firebase connection failed',
      details: error.message 
    });
  }
} 