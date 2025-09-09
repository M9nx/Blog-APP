import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import { LoadingPage } from '../components/Loading';
import { postService } from '../api/posts';
import { Post } from '../types/api';
import { useAuth } from '../contexts/AuthContext';
import { Search, TrendingUp, Users, BookOpen } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await postService.getPosts();
      setPosts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postSlug: string) => {
    try {
      await postService.likePost(postSlug);
      // Refresh posts to get updated like status
      await fetchPosts();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchPosts();
      return;
    }

    try {
      setIsLoading(true);
      const response = await postService.getPosts(1, searchTerm.trim());
      setPosts(response.data || []);
    } catch (error) {
      console.error('Failed to search posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading posts..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Medium</h1>
          <p className="text-xl mb-8 opacity-90">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          
          {!isAuthenticated ? (
            <div className="space-x-4">
              <Link
                to="/register"
                className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Start writing
              </Link>
              <Link
                to="/login"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-green-600 transition-colors"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <Link
              to="/posts/create"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Write a story
            </Link>
          )}
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stories..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trending Topics</h3>
              <p className="text-gray-600">Discover what's popular in your interests</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Writers</h3>
              <p className="text-gray-600">Follow thought leaders and industry experts</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
              <p className="text-gray-600">Read in-depth articles and stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Stories</h2>
            {isAuthenticated && (
              <Link
                to="/posts/create"
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
              >
                Write Story
              </Link>
            )}
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Try a different search term' : 'Be the first to share your story!'}
              </p>
              {isAuthenticated && (
                <Link
                  to="/posts/create"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Write the first story
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};