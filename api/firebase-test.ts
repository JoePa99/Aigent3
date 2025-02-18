import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
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

    response.status(200).json({ 
      message: 'Firebase connection successful',
      documents
    });
  } catch (error) {
    console.error('Firebase test error:', error);
    response.status(500).json({ 
      error: 'Firebase connection failed',
      details: error.message 
    });
  }
} 