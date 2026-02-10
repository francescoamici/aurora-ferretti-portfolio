import { Routes, Route } from 'react-router-dom';
import { SEOHead } from '@auror/shared-ui';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';
import './theme.css';

export default function App() {
  return (
    <>
      <SEOHead themeName="Cinematica" themeColor="#0D0D0D" />
      <div className="min-h-screen bg-film-black text-warm-white">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
