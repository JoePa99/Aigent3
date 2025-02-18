import express from 'express';
import { db } from './config/firebase';

const app = express();
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    // Test Firebase connection
    await db.collection('test').doc('health').set({
      timestamp: new Date(),
      status: 'ok'
    });
    
    res.json({ status: 'healthy', message: 'Firebase connection successful' });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Firebase connection failed',
      error: error.message 
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; 