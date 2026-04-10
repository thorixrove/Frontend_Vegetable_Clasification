import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">📖 Architecture MobileNetV2</div>
          <h1>Vegetable Classification</h1>
          <p className="hero-subtitle">
            Sistem Klasifikasi Spesies & Kualitas Sayuran 
          </p>
          <div className="hero-buttons">
            <Link to="/predict" className="btn-primary">
               Mulai Prediksi
            </Link>
            <a href="#panduan" className="btn-secondary">
              Pelajari Cara Pakai
            </a>
          </div>
          <div className="hero-stats">

          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-emoji emoji-1">🥬</div>
          <div className="floating-emoji emoji-2">🌶️</div>
          <div className="floating-emoji emoji-3">🍅</div>
          <div className="floating-emoji emoji-4">🍆</div>
        </div>
      </section>

      {/* Panduan Section */}
      <section id="panduan" className="panduan-section">
        <div className="section-header">
          <span className="section-badge">Mudah & Cepat</span>
          <h2>Cara Mengidentifikasi Sayuran</h2>
          <p className="section-description">
            Ikuti 4 langkah sederhana untuk mengklasifikasi spesies dan kualitas sayuran Anda
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">
              <span className="icon-circle">📸</span>
              <span className="step-number">1</span>
            </div>
            <h3>Berikan Gambar</h3>
            <p>Unggah gambar sayuran yang ingin diidentifikasi. Pastikan foto jelas dan pencahayaan cukup.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <span className="icon-circle">▶️</span>
              <span className="step-number">2</span>
            </div>
            <h3>Mulai Deteksi</h3>
            <p>Klik tombol "Prediksi Sekarang" untuk memulai proses klasifikasi oleh model.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <span className="icon-circle">⏱️</span>
              <span className="step-number">3</span>
            </div>
            <h3>Tunggu Beberapa Detik</h3>
            <p>Sistem akan menganalisis gambar menggunakan model MobileNetV2 secara otomatis.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <span className="icon-circle">✅</span>
              <span className="step-number">4</span>
            </div>
            <h3>Dapatkan Hasil</h3>
            <p>Lihat hasil identifikasi spesies, tingkat kualitas, dan penjelasan lengkap sayuran.</p>
          </div>
        </div>
      </section>





      <Footer />
    </div>
  );
};

export default LandingPage;