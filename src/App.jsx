import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LeaveReviewPage from './pages/LeaveReviewPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PinnedItemsPage from './pages/PinnedItemsPage';
import DealsPage from './pages/DealsPage';
import ComparePage from './pages/ComparePage';
import NotFoundPage from './pages/NotFoundPage';
import FloatingChat from './components/common/FloatingChat';
import WelcomeModal from './components/common/WelcomeModal';
import { AuthModalProvider } from './context/AuthModalContext';

// Root App - Client-side routing with Global AuthModalProvider
export default function App() {
  return (
    <BrowserRouter>
      <AuthModalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/leave-a-review" element={<LeaveReviewPage />} />
          <Route path="/review" element={<LeaveReviewPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/category/:slug" element={<CategoryDetailPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/assistant/landing" element={<PinnedItemsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* Global floating chat — visible on every page */}
        <FloatingChat />
        {/* Automatic 3-minute Welcome Modal */}
        <WelcomeModal />
      </AuthModalProvider>
    </BrowserRouter>
  );
}



