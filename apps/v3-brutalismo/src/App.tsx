import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop, SEOHead } from '@auror/shared-ui';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';

export default function App() {
  return (
    <BrowserRouter basename="/v3">
      <ScrollToTop />
      <SEOHead themeName="Brutalismo" themeColor="#000000" />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
