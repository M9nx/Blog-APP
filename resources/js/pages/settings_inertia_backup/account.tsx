import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { User } from '@/types';
import Layout from './Layout';

interface Props {
  user?: User;
}

export default function Account({ user }: Props) {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { delete: destroy, processing } = useForm();

  const handleDeactivate = () => {
    // Would normally submit to an API endpoint to deactivate
    alert('Deactivation would happen here - this is just a demo');
    setShowDeactivateModal(false);
  };

  const handleDelete = () => {
    destroy('/settings/profile', {
      onSuccess: () => {
        // After successful deletion, the user would be logged out and redirected
      },
    });
  };

  return (
    <Layout>
      <Head title="Account Settings" />

      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account Management</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Email address */}
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">Email address</dt>
          <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:col-span-2 sm:mt-0">
            {user?.email || 'example@example.com'}
          </dd>
        </div>
        
        {/* Username and subdomain */}
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">Username and subdomain</dt>
          <dd className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:col-span-2 sm:mt-0">
            @{user?.username || 'username'}
          </dd>
        </div>
        
        {/* Profile information */}
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">Profile information</dt>
          <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:col-span-2 sm:mt-0 flex items-center justify-between">
            <span>Edit your photo, name, pronouns, short bio, etc.</span>
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
              {user && typeof user.name === 'string' ? user.name.charAt(0).toUpperCase() : 'M'}
            </span>
          </dd>
        </div>
        
        {/* Profile design */}
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">Profile design</dt>
          <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:col-span-2 sm:mt-0 flex items-center justify-between">
            <span>Customize the appearance of your profile.</span>
            <button className="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </dd>
        </div>
        
        {/* Custom domain */}
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">Custom domain</dt>
          <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:col-span-2 sm:mt-0 flex items-center justify-between">
            <div>
              <span>Upgrade to a Medium Membership to redirect your profile URL to a domain like yourdomain.com.</span>
              <div className="mt-1 text-sm font-medium text-gray-500">None</div>
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </dd>
        </div>
        
        {/* Partner Program */}
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">Partner Program</dt>
          <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:col-span-2 sm:mt-0 flex items-center justify-between">
            <span>You are not enrolled in the Partner Program.</span>
            <button className="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </dd>
        </div>
        
        {/* Medium Digest frequency */}
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-900 dark:text-white">Your Medium Digest frequency</dt>
          <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:col-span-2 sm:mt-0 flex items-center justify-between">
            <div>
              <span>Adjust how often you see a new Digest.</span>
              <div className="mt-1 text-sm font-medium text-green-600">Daily</div>
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </dd>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-500">Danger Zone</h3>
          
          <div className="mt-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Deactivate account</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Deactivating will suspend your account until you sign back in.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDeactivateModal(true)}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
              >
                Deactivate
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">Delete account</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Permanently delete your account and all of your content.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full px-4 pt-5 pb-4 sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Deactivate Account
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to deactivate your account? You can reactivate at any time by signing back in.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeactivateModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeactivate}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:col-start-2 sm:text-sm"
                >
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full px-4 pt-5 pb-4 sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Delete Account
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={processing}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
