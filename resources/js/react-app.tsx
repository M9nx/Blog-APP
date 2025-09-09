import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider, useSidebar } from './contexts/SidebarContext';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { CreatePostPage } from './pages/posts/CreatePostPage';
import { LibraryPage } from './pages/LibraryPage';
import { StoriesPage } from './pages/StoriesPage';
import { StatsPage } from './pages/StatsPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { SettingsPage } from './pages/SettingsPage';

// CSS
import '../css/app.css';

const AppContent: React.FC = () => {
  const { isSidebarOpen } = useSidebar();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:slug" element={<PostDetailPage />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/posts/create" 
                element={
                  <ProtectedRoute>
                    <CreatePostPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/library" 
                element={
                  <ProtectedRoute>
                    <LibraryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/stories" 
                element={
                  <ProtectedRoute>
                    <StoriesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/stats" 
                element={
                  <ProtectedRoute>
                    <StatsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                      <p className="mt-2 text-gray-600">Welcome to your dashboard!</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Settings Routes - Handle both exact /settings and nested routes */}
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings/*" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Page */}
              <Route 
                path="*" 
                element={
                  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">404 - Page Not Found</h1>
                    <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
                  </div>
                } 
              />
            </Routes>
          </main>
        </div>
      );
    };

    const App: React.FC = () => {
      return (
        <BrowserRouter>
          <AuthProvider>
            <SidebarProvider>
              <AppContent />
            </SidebarProvider>
          </AuthProvider>
        </BrowserRouter>
      );
    };

// Mount the app
console.log('React app script is loading...');
const appElement = document.getElementById('react-app');

if (appElement) {
  const root = ReactDOM.createRoot(appElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Could not find element with ID "react-app"');
}
