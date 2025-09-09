import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSidebar } from '../contexts/SidebarContext';
import { Sidebar } from './Sidebar';
import { UserDropdown } from './UserDropdown';
import { Menu, Search, Edit3 } from 'lucide-react';

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <>
      <header className="border-b bg-white shadow-sm sticky top-0 z-30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Hamburger + Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
              
              <Link to="/" className="text-3xl font-bold text-gray-900">
                Medium
              </Link>
            </div>

            {/* Center - Search (only on desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border-0 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all"
                />
              </div>
            </div>

            {/* Right side - Write, Notifications, User */}
            <div className="flex items-center space-x-6">
              {isAuthenticated ? (
                <>
                  {/* Write Button */}
                  <Link 
                    to="/posts/create"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Edit3 className="h-5 w-5" />
                    <span className="hidden sm:block text-sm">Write</span>
                  </Link>
                  
                  {/* Notifications */}
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a7 7 0 10-9.9 0L10 17h5zm-7-4a5 5 0 1110 0v1.5l1.5 1.5H6.5L8 14v-1z" />
                    </svg>
                  </button>
                  
                  {/* User Dropdown */}
                  <UserDropdown
                    isOpen={isUserDropdownOpen}
                    onClose={() => setIsUserDropdownOpen(false)}
                    onToggle={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  />
                </>
              ) : (
                <>
                  {/* Write (for non-authenticated) */}
                  <Link 
                    to="/login"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Edit3 className="h-5 w-5" />
                    <span className="hidden sm:block text-sm">Write</span>
                  </Link>
                  
                  <Link 
                    to="/login"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign in
                  </Link>
                  
                  <Link 
                    to="/register"
                    className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => toggleSidebar()} 
      />
    </>
  );
};
