import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PostCard } from '../components/PostCard';
import { Users, FileText, Calendar, UserPlus, UserCheck } from 'lucide-react';
import { api } from '../api/config';
import { Post } from '../types/api';

interface User {
  id: number;
  name: string;
  bio: string | null;
  avatar: string | null;
  created_at: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
  is_following: boolean;
  is_own_profile: boolean;
}

interface FollowerUser {
  id: number;
  name: string;
  bio?: string;
  avatar?: string;
}

export const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following'>('posts');
  const [followers, setFollowers] = useState<FollowerUser[]>([]);
  const [following, setFollowing] = useState<FollowerUser[]>([]);

  const fetchUserProfile = useCallback(async () => {
    try {
      console.log('Fetching user profile for ID:', userId);
      const response = await api.get(`/users/${userId}`);
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        console.log('User data:', response.data.data);
        setUser(response.data.data);
        setPosts(response.data.data.posts || []);
      } else {
        console.error('API returned success: false');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId, fetchUserProfile]);

  const fetchFollowers = useCallback(async () => {
    try {
      const response = await api.get(`/users/${userId}/followers`);
      if (response.data.success) {
        setFollowers(response.data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  }, [userId]);

  const fetchFollowing = useCallback(async () => {
    try {
      const response = await api.get(`/users/${userId}/following`);
      if (response.data.success) {
        setFollowing(response.data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching following:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (user && activeTab === 'followers') {
      fetchFollowers();
    } else if (user && activeTab === 'following') {
      fetchFollowing();
    }
  }, [user, activeTab, fetchFollowers, fetchFollowing]);

  const handleFollowToggle = async () => {
    if (!isAuthenticated || !user || user.is_own_profile) {
      console.log('Cannot follow:', { isAuthenticated, user: !!user, is_own_profile: user?.is_own_profile });
      return;
    }

    setFollowLoading(true);
    try {
      if (user.is_following) {
        const response = await api.delete(`/users/${userId}/follow`);
        console.log('Unfollow response:', response.data);
        if (response.data.success) {
          setUser(prev => prev ? {
            ...prev,
            is_following: false,
            followers_count: prev.followers_count - 1
          } : null);
        }
      } else {
        const response = await api.post(`/users/${userId}/follow`);
        console.log('Follow response:', response.data);
        if (response.data.success) {
          setUser(prev => prev ? {
            ...prev,
            is_following: true,
            followers_count: prev.followers_count + 1
          } : null);
        }
      }
    } catch (error: unknown) {
      console.error('Error toggling follow:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {response?: {data?: {message?: string}}};
        if (axiosError.response?.data?.message) {
          alert(axiosError.response.data.message);
        }
      }
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User not found</h1>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
          <Link to="/" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="h-24 w-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                
                {/* Follow Button */}
                {isAuthenticated && !user.is_own_profile && (
                  <button
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors ${
                      user.is_following
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    } disabled:opacity-50`}
                  >
                    {user.is_following ? (
                      <>
                        <UserCheck className="h-4 w-4" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Bio */}
              {user.bio && (
                <p className="text-gray-600 mb-4">{user.bio}</p>
              )}

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>{user.posts_count} posts</span>
                </div>
                <button 
                  onClick={() => setActiveTab('followers')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <Users className="h-4 w-4" />
                  <span>{user.followers_count} followers</span>
                </button>
                <button 
                  onClick={() => setActiveTab('following')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <Users className="h-4 w-4" />
                  <span>{user.following_count} following</span>
                </button>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'posts'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Posts ({user.posts_count})
              </button>
              <button
                onClick={() => setActiveTab('followers')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'followers'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Followers ({user.followers_count})
              </button>
              <button
                onClick={() => setActiveTab('following')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'following'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Following ({user.following_count})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {posts.length > 0 ? (
                  posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No posts yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'followers' && (
              <div className="space-y-4">
                {followers.length > 0 ? (
                  followers.map((follower: FollowerUser) => (
                    <div key={follower.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                      <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {follower.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <Link 
                          to={`/profile/${follower.id}`}
                          className="font-medium text-gray-900 hover:text-green-600"
                        >
                          {follower.name}
                        </Link>
                        {follower.bio && (
                          <p className="text-sm text-gray-500">{follower.bio}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No followers yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'following' && (
              <div className="space-y-4">
                {following.length > 0 ? (
                  following.map((followedUser: FollowerUser) => (
                    <div key={followedUser.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                      <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {followedUser.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <Link 
                          to={`/profile/${followedUser.id}`}
                          className="font-medium text-gray-900 hover:text-green-600"
                        >
                          {followedUser.name}
                        </Link>
                        {followedUser.bio && (
                          <p className="text-sm text-gray-500">{followedUser.bio}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Not following anyone yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
