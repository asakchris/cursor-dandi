'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ApiKeyList } from '@/components/ApiKeyList';
import { CreateApiKeyModal } from '@/components/CreateApiKeyModal';
import { Sidebar } from '@/components/Sidebar';
import { useApiKeys } from '@/hooks/useApiKeys';

export default function Dashboard() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { apiKeys, isLoading, fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } = useApiKeys();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return (
    <div className="min-h-screen flex bg-[#f9f9f9]">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 mr-4"
            >
              {isSidebarOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              )}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your API keys and access tokens</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your API keys and access tokens</p>
            </div>
            <button
              onClick={() => document.getElementById('createKeyModal').showModal()}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
              bg-[#8b3dff] text-white hover:bg-[#7831ff] transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create API Key
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8b3dff]"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <ApiKeyList 
                apiKeys={apiKeys}
                onUpdate={updateApiKey}
                onDelete={deleteApiKey}
              />
            </div>
          )}
        </div>

        <CreateApiKeyModal
          onClose={() => document.getElementById('createKeyModal').close()}
          onCreate={createApiKey}
        />
      </div>
    </div>
  );
} 