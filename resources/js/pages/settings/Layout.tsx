import { Link } from '@inertiajs/react';

// Using a more flexible type for the user prop
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigation = [
    { name: 'Profile Information', href: '/settings/profile' },
    { name: 'Password', href: '/settings/password' },
    { name: 'Appearance', href: '/settings/appearance' },
    { name: 'Account', href: '/settings/account' },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <h2 className="text-lg font-bold mb-4">Settings</h2>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200 ${
                  window.location.pathname === item.href
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <main className="mt-8 lg:col-span-9 lg:mt-0">
          <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
