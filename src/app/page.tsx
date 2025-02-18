'use client'
import { db } from '../config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useState } from 'react'

export default function Home() {
  const [status, setStatus] = useState('')

  const testFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, 'test'), {
        message: 'Hello Firebase',
        timestamp: new Date()
      })
      setStatus('Success! Document written with ID: ' + docRef.id)
    } catch (e) {
      setStatus('Error: ' + e.message)
      console.error('Error adding document: ', e)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4 items-center">
        <button 
          onClick={testFirebase}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Firebase
        </button>
        {status && <p>{status}</p>}
      </div>
    </main>
  )
} 