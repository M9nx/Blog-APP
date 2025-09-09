import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from './Layout';

interface Props {
  user?: Record<string, unknown>;
}

export default function Password({ user }: Props) {
  const { data, setData, put, errors, processing, reset } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put('/settings/password', {
      onSuccess: () => reset('current_password', 'password', 'password_confirmation'),
    });
  };

  return (
    <Layout user={user}>
      <Head title="Password Settings" />

      <h2 className="text-xl font-bold mb-6">Update Password</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Ensure your account is using a long, random password to stay secure.
      </p>

      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="current_password">
            Current Password
          </label>
          <div className="relative">
            <input
              id="current_password"
              type={showCurrentPassword ? "text" : "password"}
              value={data.current_password}
              onChange={(e) => setData('current_password', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showCurrentPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.current_password && (
            <p className="mt-2 text-sm text-red-600">{errors.current_password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showNewPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showNewPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="password_confirmation">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
          )}
        </div>

        <div className="pt-5">
          <button
            type="submit"
            disabled={processing}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Layout>
  );
}
