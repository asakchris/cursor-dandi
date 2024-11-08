import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function ApiKeyList({ apiKeys, onUpdate, onDelete }) {
  const [showKey, setShowKey] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const handleUpdate = async (keyId, name) => {
    const success = await onUpdate(keyId, name);
    if (success) {
      setEditingKey(null);
      setEditName('');
    }
  };

  if (apiKeys.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-[#e6f8f9] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#00c4cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No API Keys</h3>
        <p className="text-gray-500">Create your first API key to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="grid grid-cols-[2fr_1fr_3fr_1fr] gap-4 text-sm font-medium text-gray-500">
          <div>NAME</div>
          <div>USAGE</div>
          <div>KEY</div>
          <div className="text-right">ACTIONS</div>
        </div>
      </div>
      <div>
        {apiKeys.map((key) => (
          <div key={key.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-[2fr_1fr_3fr_1fr] gap-4 items-center">
              <div>
                {editingKey === key.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-[#00c4cc] focus:border-[#00c4cc]"
                    onBlur={() => handleUpdate(key.id, editName)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdate(key.id, editName)}
                    autoFocus
                  />
                ) : (
                  <div 
                    className="font-medium text-gray-900 cursor-pointer hover:text-[#00c4cc]"
                    onClick={() => {
                      setEditingKey(key.id);
                      setEditName(key.name);
                    }}
                  >
                    {key.name}
                  </div>
                )}
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#e6f8f9] text-[#00c4cc]">
                  {key.usage || 0}%
                </span>
              </div>
              <div className="font-mono text-sm">
                {showKey[key.id] ? (
                  <span className="text-gray-700">{key.key}</span>
                ) : (
                  <span className="text-gray-400">dandi-••••••••••••••••</span>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowKey({ ...showKey, [key.id]: !showKey[key.id] })}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  onClick={() => copyToClipboard(key.key)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(key.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 