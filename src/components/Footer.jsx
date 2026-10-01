import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">Klasifikasi Sayuran</p>
          <p>Tugas Akhir Teknik Informatika, Universitas Papua, 2026.</p>
        </div>
        <nav className="footer-links" aria-label="Tautan footer">
          <Link to="/">Beranda</Link>
          <Link to="/predict">Prediksi</Link>
          <Link to="/about">Tentang</Link>
        </nav>
      </div>
    </footer>
  );
}