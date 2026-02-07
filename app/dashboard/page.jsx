'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Users, FileText, MessageCircle, Settings, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg font-bold text-xl">
                Kairo
              </div>
              <h1 className="ml-4 text-2xl font-bold text-gray-900">
                Welcome, {user?.name}!
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold text-gray-900">{user?.name}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{user?.email}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-gray-900">{user?.phoneNumber}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-semibold text-gray-900 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* AI Rights Assistant */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Rights Assistant</h3>
            <p className="text-gray-600 text-sm mb-4">Get instant help with legal questions and rights information</p>
            <span className="text-blue-600 text-sm font-medium">Coming Soon</span>
          </div>

          {/* Create Petition */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Create Petition</h3>
            <p className="text-gray-600 text-sm mb-4">Start a petition to drive change in your community</p>
            <span className="text-green-600 text-sm font-medium">Coming Soon</span>
          </div>

          {/* Community Issues */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community Issues</h3>
            <p className="text-gray-600 text-sm mb-4">Explore and support issues in your area</p>
            <span className="text-purple-600 text-sm font-medium">Coming Soon</span>
          </div>

          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Profile Settings</h3>
            <p className="text-gray-600 text-sm mb-4">Manage your account and preferences</p>
            <span className="text-orange-600 text-sm font-medium">Coming Soon</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600">Kairo Platform - Empowering Citizens</p>
        </div>
      </div>
    </div>
  );
}