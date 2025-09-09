import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Welcome to your dashboard! You're now using the main Inertia.js application.
                            </p>
                            
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">Posts</h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">Manage your blog posts</p>
                                </div>
                                
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <h3 className="font-semibold text-green-900 dark:text-green-100">Comments</h3>
                                    <p className="text-sm text-green-700 dark:text-green-300 mt-2">View and moderate comments</p>
                                </div>
                                
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                    <h3 className="font-semibold text-purple-900 dark:text-purple-100">Analytics</h3>
                                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">View your blog statistics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
