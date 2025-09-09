import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StoriesPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Stories</h1>
        <p className="text-gray-600">
          Write, edit, and manage your stories
        </p>
      </div>

      <div className="text-center py-12">
        <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">You haven't written any stories yet</h2>
        <p className="text-gray-600 mb-6">
          Share your thoughts and ideas with the world
        </p>
        <Link
          to="/posts/create"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Write your first story
        </Link>
      </div>
    </div>
  );
};
