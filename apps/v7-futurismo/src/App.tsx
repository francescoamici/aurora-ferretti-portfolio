import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from '@auror/shared-ui';
import { SEOHead } from '@auror/shared-ui';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';

function App() {
  return (
    <BrowserRouter basename="/v7">
      <ScrollToTop />
      <SEOHead
        themeName="Futurismo Italiano"
        themeColor="#0A1628"
      />
      <div className="min-h-screen bg-prussian text-white">
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

export default App;
