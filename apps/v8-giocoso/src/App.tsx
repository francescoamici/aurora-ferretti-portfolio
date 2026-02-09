import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from '@auror/shared-ui';
import { SEOHead } from '@auror/shared-ui';
import Nav from './components/Nav';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';

export default function App() {
  return (
    <BrowserRouter basename="/v8">
      <SEOHead themeName="Giocoso" themeColor="#FFB4C8" />
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}
