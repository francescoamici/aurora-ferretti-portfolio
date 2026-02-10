import { Routes, Route } from 'react-router-dom';
import { SEOHead } from '@auror/shared-ui';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';
import './theme.css';

export default function App() {
  return (
    <>
      <SEOHead themeName="Maison" themeColor="#FFF8F0" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CaseStudy />} />
      </Routes>
    </>
  );
}
