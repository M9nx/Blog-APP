import React from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Welcome to Laravel + React
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Your Laravel backend with React frontend is working perfectly!
                </p>
                <div className="space-y-4">
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Get Started
                    </button>
                    <button className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

// Render the React app into the div with id="root"
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
