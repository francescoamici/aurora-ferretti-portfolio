import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SEOHead, ScrollToTop } from '@auror/shared-ui';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';

export default function App() {
  return (
    <BrowserRouter basename="/v5">
      <SEOHead themeName="Neon Roma" themeColor="#0B0B1A" />
      <ScrollToTop />
      <div className="min-h-screen bg-space text-white font-body relative">
        {/* Scanline overlay */}
        <div className="scanlines" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
