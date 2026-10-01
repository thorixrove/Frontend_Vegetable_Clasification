import { useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PredictPage from './pages/PredictPage';
import AboutPage from './pages/AboutPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <section className="container notfound">
      <h1>Halaman tidak ditemukan</h1>
      <p>Alamat yang kamu buka tidak ada. Kembali ke beranda atau langsung coba prediksi.</p>
      <div className="notfound-actions">
        <Link className="btn btn-primary" to="/">Ke beranda</Link>
        <Link className="btn btn-ghost" to="/predict">Coba prediksi</Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navigation />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}