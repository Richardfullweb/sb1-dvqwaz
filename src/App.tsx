import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import DashboardTickets from './components/dashboard/DashboardTickets';
import DashboardEvents from './components/dashboard/DashboardEvents';
import DashboardCategories from './components/dashboard/DashboardCategories';
import DashboardCoupons from './components/dashboard/DashboardCoupons';
import DashboardReports from './components/dashboard/DashboardReports';
import DashboardUsers from './components/dashboard/DashboardUsers';
import DashboardSettings from './components/dashboard/DashboardSettings';
import SupabaseTest from './components/SupabaseTest';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/supabase-test" element={<SupabaseTest />} />
          
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <EventList />
            </div>
          } />

          <Route path="/event/:id" element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <EventDetails />
            </div>
          } />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardOverview />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/tickets" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardTickets />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/events" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardEvents />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/categories" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardCategories />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/coupons" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardCoupons />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/reports" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardReports />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/users" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardUsers />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardSettings />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;