import { useState } from 'react';

export function CreateApiKeyModal({ onClose, onCreate }) {
  const [newKeyName, setNewKeyName] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState(1000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      return;
    }
    const success = await onCreate(newKeyName, monthlyLimit);
    if (success) {
      setNewKeyName('');
      setMonthlyLimit(1000);
      onClose();
    }
  };

  return (
    <dialog id="createKeyModal" className="rounded-xl shadow-xl p-0 w-full max-w-md backdrop:bg-gray-500/30">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Create API Key</h3>
            <p className="text-sm text-gray-500 mt-1">Add a new API key to your account</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">
              Key Name
            </label>
            <input
              type="text"
              id="keyName"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter a name for your API key"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-[#00c4cc] focus:border-[#00c4cc] placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="monthlyLimit" className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Request Limit
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="monthlyLimit"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                min="1"
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-[#00c4cc] focus:border-[#00c4cc]"
                required
              />
              <span className="text-sm text-gray-500">requests</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00c4cc]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-sm font-medium text-white bg-[#00c4cc] rounded-lg hover:bg-[#00b0b7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00c4cc]"
            >
              Create Key
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
} 