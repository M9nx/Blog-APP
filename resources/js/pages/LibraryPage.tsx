import React from 'react';
import { BookOpen } from 'lucide-react';

export const LibraryPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center">
        <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Library</h1>
        <p className="text-gray-600 mb-8">
          Save stories to read later and organize your reading list
        </p>
        <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-8">
          <p className="text-gray-500">
            Your saved stories will appear here. Start by saving some stories from the homepage!
          </p>
        </div>
      </div>
    </div>
  );
};
