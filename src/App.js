import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/auth/Welcome';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import Properties from './components/properties/Properties';
import Layout from './components/layout/Layout';
import Booking from './components/booking/Booking';
import Contact from './components/Contact';
import Clients from './components/clients/Clients';
import Messages from './components/messages/Messages';
import AccountManagement from './components/accounts/AccountManagement';
import Reports from './components/reports/Reports';
import { Toaster } from './components/ui/Toaster';
import './App.css';
import './components/ui/uiComponents.css';

// Configure React Router v7 future flags
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <Router future={routerConfig.future}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clients" element={<Navigate to="/dashboard/clients" replace />} />
        <Route path="/messages" element={<Navigate to="/dashboard/messages" replace />} />
        <Route path="/accounts" element={<Navigate to="/dashboard/accounts" replace />} />
        <Route path="/dashboard" element={
          <Layout>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="booking/:id" element={<Booking />} />
              <Route path="booking" element={<Booking />} />
              <Route path="bookings" element={<Navigate to="/dashboard/booking" replace />} />
              <Route path="clients" element={<Clients />} />
              <Route path="clients/:id" element={<Clients />} />
              <Route path="messages" element={<Messages />} />
              <Route path="messages/:id" element={<Messages />} />
              <Route path="accounts/:id" element={<AccountManagement />} />
              <Route path="accounts" element={<AccountManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/:reportId" element={<Reports />} />
            </Routes>
          </Layout>
        } />
        <Route path="/dashboard/*" element={
          <Layout>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="booking/:id" element={<Booking />} />
              <Route path="booking" element={<Booking />} />
              <Route path="bookings" element={<Navigate to="/dashboard/booking" replace />} />
              <Route path="clients" element={<Clients />} />
              <Route path="clients/:id" element={<Clients />} />
              <Route path="messages" element={<Messages />} />
              <Route path="messages/:id" element={<Messages />} />
              <Route path="accounts/:id" element={<AccountManagement />} />
              <Route path="accounts" element={<AccountManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/:reportId" element={<Reports />} />
            </Routes>
          </Layout>
        } />
        <Route path="/properties" element={<Navigate to="/dashboard/properties" replace />} />
        <Route path="/reports" element={<Navigate to="/dashboard/reports" replace />} />
      </Routes>
    </Router>
  );
}

export default App;