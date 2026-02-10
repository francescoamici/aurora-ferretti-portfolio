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
      <SEOHead themeName="Architetto" themeColor="#DA291C" />
      <div className="min-h-screen flex flex-col bg-white text-black">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<CaseStudy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
