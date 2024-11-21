import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Testing connection...');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test basic query
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, role')
        .limit(1);

      if (error) {
        throw error;
      }

      setStatus('success');
      setMessage('Successfully connected to Supabase!');
      console.log('Test query result:', data);
    } catch (error) {
      console.error('Connection test failed:', error);
      setStatus('error');
      setMessage('Failed to connect to Supabase. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supabase Connection Test</h2>
        
        <div className={`p-4 rounded-lg ${
          status === 'loading' ? 'bg-blue-100 text-blue-700' :
          status === 'success' ? 'bg-green-100 text-green-700' :
          'bg-red-100 text-red-700'
        }`}>
          <div className="flex items-center">
            {status === 'loading' && (
              <div className="mr-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
              </div>
            )}
            <p className="font-medium">{message}</p>
          </div>
        </div>

        <button
          onClick={testConnection}
          className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Test Again
        </button>
      </div>
    </div>
  );
}