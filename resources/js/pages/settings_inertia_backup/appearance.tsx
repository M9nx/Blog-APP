import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Layout from './Layout';
import { useAppearance } from '@/hooks/use-appearance';

interface Props {
  user?: Record<string, unknown>;
}

export default function Appearance({ user }: Props) {
  const { appearance, updateAppearance } = useAppearance();
  const [selectedAppearance, setSelectedAppearance] = useState(appearance);
  
  useEffect(() => {
    setSelectedAppearance(appearance);
  }, [appearance]);

  const handleAppearanceChange = (newAppearance: 'light' | 'dark' | 'system') => {
    setSelectedAppearance(newAppearance);
    updateAppearance(newAppearance);
  };

  return (
    <Layout>
      <Head title="Appearance Settings" />

      <h2 className="text-xl font-bold mb-6">Appearance</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Customize your interface appearance and theme preferences.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Theme</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Select how you'd like the app to appear
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div 
              className={`relative rounded-lg border p-4 flex flex-col items-center cursor-pointer ${
                selectedAppearance === 'light' 
                  ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => handleAppearanceChange('light')}
            >
              <div className="w-full h-24 bg-white border border-gray-200 rounded-md mb-4 shadow-sm">
                <div className="h-3 bg-gray-100 rounded-t-md"></div>
                <div className="p-2">
                  <div className="h-2 w-3/4 bg-gray-100 rounded mb-1.5"></div>
                  <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Light</span>
              {selectedAppearance === 'light' && (
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>

            <div 
              className={`relative rounded-lg border p-4 flex flex-col items-center cursor-pointer ${
                selectedAppearance === 'dark' 
                  ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => handleAppearanceChange('dark')}
            >
              <div className="w-full h-24 bg-gray-900 border border-gray-700 rounded-md mb-4 shadow-sm">
                <div className="h-3 bg-gray-800 rounded-t-md"></div>
                <div className="p-2">
                  <div className="h-2 w-3/4 bg-gray-800 rounded mb-1.5"></div>
                  <div className="h-2 w-1/2 bg-gray-800 rounded"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Dark</span>
              {selectedAppearance === 'dark' && (
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>

            <div 
              className={`relative rounded-lg border p-4 flex flex-col items-center cursor-pointer ${
                selectedAppearance === 'system' 
                  ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => handleAppearanceChange('system')}
            >
              <div className="w-full h-24 bg-gradient-to-br from-white to-gray-900 border border-gray-200 dark:border-gray-700 rounded-md mb-4 shadow-sm">
                <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-800 rounded-t-md"></div>
                <div className="p-2">
                  <div className="h-2 w-3/4 bg-gradient-to-r from-gray-100 to-gray-800 rounded mb-1.5"></div>
                  <div className="h-2 w-1/2 bg-gradient-to-r from-gray-100 to-gray-800 rounded"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">System</span>
              {selectedAppearance === 'system' && (
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
