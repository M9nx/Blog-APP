import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api/config';
import { 
  Home, 
  BookOpen, 
  User, 
  FileText, 
  BarChart3, 
  Users, 
  X,
  Edit3
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FollowingUser {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  const [followingUsers, setFollowingUsers] = useState<FollowingUser[]>([]);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', show: true },
    { icon: BookOpen, label: 'Library', path: '/library', show: isAuthenticated },
    { icon: User, label: 'Profile', path: user ? `/profile/${user.id}` : '/profile', show: isAuthenticated },
    { icon: FileText, label: 'Stories', path: '/stories', show: isAuthenticated },
    { icon: BarChart3, label: 'Stats', path: '/stats', show: isAuthenticated },
    { icon: Edit3, label: 'Write', path: '/posts/create', show: isAuthenticated },
  ];

  // Fetch following users from API
  useEffect(() => {
    const fetchFollowingUsers = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await api.get(`/users/${user.id}/following`);
          if (response.data.success) {
            setFollowingUsers(response.data.data.data || []);
          }
        } catch (error) {
          console.error('Error fetching following users:', error);
        }
      }
    };

    fetchFollowingUsers();
  }, [isAuthenticated, user]);

  if (!isOpen) return null;

  return (
    <>
      {/* Sidebar - Always visible, no backdrop when default open */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-100 z-40 transform transition-transform duration-300 ease-in-out shadow-lg ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight" onClick={onClose}>
            Medium
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-50 transition-all duration-200"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Medium"
              className="w-full pl-4 pr-4 py-3 bg-gray-50 border-0 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-200 text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="px-6 py-4 border-b border-gray-100">
          <nav className="space-y-2">
            {menuItems.map((item) => 
              item.show && (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-600 hover:text-gray-900 group"
                >
                  <item.icon className="h-5 w-5 group-hover:text-green-600 transition-colors" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Following Section */}
        {isAuthenticated && followingUsers.length > 0 && (
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Following</span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {followingUsers.map((followUser) => (
                <Link
                  key={followUser.id}
                  to={`/profile/${followUser.id}`}
                  onClick={onClose}
                  className="flex items-center space-x-3 py-2 hover:bg-gray-50 rounded-lg px-3 -mx-3 transition-all duration-200 group"
                >
                  <div className="relative flex-shrink-0">
                    {followUser.avatar ? (
                      <img 
                        src={followUser.avatar} 
                        alt={followUser.name}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-xs font-semibold text-white">
                          {followUser.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 block truncate group-hover:text-green-600 transition-colors">
                      {followUser.name}
                    </span>
                    {followUser.email && (
                      <span className="text-xs text-gray-500 block truncate">
                        @{followUser.email.split('@')[0]}
                      </span>
                    )}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* User Section */}
        {isAuthenticated && user && (
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-200 bg-white">
            <Link
              to={`/profile/${user.id}`}
              onClick={onClose}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
            >
              <div className="h-10 w-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </Link>
          </div>
        )}

        {/* Login/Register for unauthenticated users */}
        {!isAuthenticated && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={onClose}
                className="block w-full px-4 py-2 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="block w-full px-4 py-2 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
