import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApiKeys = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/keys');
      if (!response.ok) {
        throw new Error('Failed to fetch API keys');
      }
      const data = await response.json();
      setApiKeys(data);
    } catch (error) {
      toast.error('Failed to fetch API keys');
      console.error('Error fetching API keys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createApiKey = async (name, monthlyLimit) => {
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, monthlyLimit }),
      });
      
      if (!response.ok) throw new Error('Failed to create API key');
      
      const newKey = await response.json();
      setApiKeys([newKey, ...apiKeys]);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const updateApiKey = async (keyId, name) => {
    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update API key');
      }

      const updatedKey = await response.json();
      setApiKeys(apiKeys.map(key => key.id === keyId ? updatedKey : key));
      toast.success('API key updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating API key:', error);
      toast.error(error.message);
      return false;
    }
  };

  const deleteApiKey = async (id) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete API key');
      
      setApiKeys(apiKeys.filter(key => key.id !== id));
      toast.success('API key deleted successfully');
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  return {
    apiKeys,
    isLoading,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
  };
} 