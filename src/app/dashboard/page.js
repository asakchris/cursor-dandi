'use client'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newKeyName, setNewKeyName] = useState('')
  const [showKey, setShowKey] = useState({})

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys')
      const data = await response.json()
      setApiKeys(data)
    } catch (error) {
      toast.error('Failed to fetch API keys')
    } finally {
      setIsLoading(false)
    }
  }

  // ... rest of your component code ...
} 