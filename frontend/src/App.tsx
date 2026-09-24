import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot/Chatbot';

import Home from './pages/Home';
import Services from './pages/Services';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

export function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <Router>
      <div className="app-layout">
        {/* Navigation Bar */}
        <Navbar onOpenChat={handleOpenChat} />

        {/* Page Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home onOpenChat={handleOpenChat} />} />
            <Route path="/services" element={<Services onOpenChat={handleOpenChat} />} />
            <Route path="/courses" element={<Courses onOpenChat={handleOpenChat} />} />
            <Route path="/contact" element={<Contact onOpenChat={handleOpenChat} />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Global Floating Rule-Based AI Chatbot */}
        <Chatbot
          isOpenExternal={isChatOpen}
          onToggleExternal={(open) => setIsChatOpen(open)}
        />
      </div>
    </Router>
  );
}

export default App;
