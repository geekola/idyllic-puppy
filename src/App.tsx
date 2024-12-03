import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { FAQPage } from './pages/FAQPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { CampaignEdit } from './components/campaigns/CampaignEdit';
import { CampaignForm } from './components/campaigns/CampaignForm';
import { CampaignPreview } from './components/campaigns/CampaignPreview';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        user ? <Navigate to="/dashboard" replace /> : <LandingPage />
      } />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/campaigns/new" 
        element={
          <ProtectedRoute>
            <CampaignForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/campaigns/:id/edit" 
        element={
          <ProtectedRoute>
            <CampaignEdit />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/campaigns/:id/preview" 
        element={
          <ProtectedRoute>
            <CampaignPreview />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/faq" 
        element={
          <ProtectedRoute>
            <FAQPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;