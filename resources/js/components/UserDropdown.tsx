import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  Star,
  Users,
  MessageSquare,
  FileText
} from 'lucide-react';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen, onClose, onToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="User menu"
      >
        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-gray-600">
            {user.name?.charAt(0) || 'U'}
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-gray-600">
                  {user.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                <Link 
                  to={`/profile/${user.id}`}
                  onClick={handleLinkClick}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  View profile
                </Link>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Main Navigation */}
            <Link
              to="/posts/create"
              onClick={handleLinkClick}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Write</span>
            </Link>

            <Link
              to="/stories"
              onClick={handleLinkClick}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Stories</span>
            </Link>

            <Link
              to="/stats"
              onClick={handleLinkClick}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Stats</span>
            </Link>

            <Link
              to="/library"
              onClick={handleLinkClick}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Library</span>
            </Link>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Settings & Help */}
            <Link
              to="/settings"
              onClick={handleLinkClick}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Settings</span>
            </Link>

            <button
              onClick={() => {/* Handle help */}}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <HelpCircle className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Help</span>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Premium Features */}
            <button
              onClick={() => {/* Handle membership */}}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-700">Become a Medium member</span>
              </div>
              <Star className="h-4 w-4 text-yellow-500" />
            </button>

            <button
              onClick={() => {/* Handle partner program */}}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Apply to the Partner Program</span>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Sign Out */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div>
                <div className="text-gray-700">Sign out</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
              <LogOut className="h-4 w-4 text-gray-500" />
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Footer Links */}
            <div className="px-4 py-3">
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <button className="hover:text-gray-700">About</button>
                <button className="hover:text-gray-700">Blog</button>
                <button className="hover:text-gray-700">Careers</button>
                <button className="hover:text-gray-700">Privacy</button>
                <button className="hover:text-gray-700">Terms</button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                <button className="hover:text-gray-700">Text to speech</button>
                <button className="hover:text-gray-700">More</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
