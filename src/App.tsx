import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/layout/Navbar';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LandingPage from '@/pages/LandingPage';
import ChatbotsPage from '@/pages/dashboard/ChatbotsPage';
import ChatbotDetailsPage from '@/pages/dashboard/ChatbotDetailsPage';
import AnalyticsPage from '@/pages/dashboard/AnalyticsPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import WidgetPage from '@/pages/WidgetPage';

function AppContent() {
  const location = useLocation();
  const isWidget = location.pathname.startsWith('/widget');

  return (
    <div className={`min-h-screen ${isWidget ? '' : 'bg-white selection:bg-zinc-950 selection:text-white'}`}>
      {!isWidget && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/widget" element={<WidgetPage />} />
        
        {/* Dashboard Routes (Protected by Layout) */}
        <Route path="/dashboard" element={<DashboardLayout><ChatbotsPage /></DashboardLayout>} />
        <Route path="/dashboard/chatbots/:id" element={<DashboardLayout><ChatbotDetailsPage /></DashboardLayout>} />
        <Route path="/dashboard/chatbots/:id/test" element={<DashboardLayout><div className="h-[600px] w-full max-w-md mx-auto shadow-2xl rounded-3xl overflow-hidden border border-zinc-200"><WidgetPage /></div></DashboardLayout>} />
        <Route path="/dashboard/analytics" element={<DashboardLayout><AnalyticsPage /></DashboardLayout>} />
        <Route path="/dashboard/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
        <Route path="/dashboard/billing" element={<DashboardLayout><div className="text-center py-20 bg-white border border-dashed rounded-2xl"><h2 className="text-xl font-bold">Billing coming soon</h2></div></DashboardLayout>} />
      </Routes>
      <Toaster position="top-center" richColors />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
