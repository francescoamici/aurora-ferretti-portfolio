import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop, SEOHead } from '@auror/shared-ui';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';

export default function App() {
  return (
    <BrowserRouter basename="/v13">
      <SEOHead themeName="Lumiere" themeColor="#FFFFFF" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}
