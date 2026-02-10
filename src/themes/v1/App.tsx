import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SEOHead } from '@auror/shared-ui';
import Nav from './components/Nav';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';
import './theme.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CaseStudy />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <SEOHead themeName="Nero Assoluto" themeColor="#0A0A0A" />
      <Nav />
      <AnimatedRoutes />
    </>
  );
}
