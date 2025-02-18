'use client'
import { db } from '../config/firebase'
import { collection, addDoc } from 'firebase/firestore'

export default function Home() {
  const testFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, 'test'), {
        message: 'Hello Firebase',
        timestamp: new Date()
      })
      console.log('Document written with ID: ', docRef.id)
      alert('Firebase write successful!')
    } catch (e) {
      console.error('Error adding document: ', e)
      alert('Error: ' + e.message)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={testFirebase}>Test Firebase</button>
    </main>
  )
} 