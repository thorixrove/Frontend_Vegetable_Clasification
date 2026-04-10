import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <section className="about-header">
        <div className="hero-badge">📖 Informasi Proyek</div>
        <h1>Tentang Project</h1>
        <p className="about-subtitle">Mengenal lebih dekat dengan sistem ini</p>
      </section>

      {/* Latar Belakang & Tujuan */}
      <section className="about-section">
        <div className="content-card">
          <h2>🎯 Latar Belakang & Tujuan</h2>
          <p className="section-text">
            Proyek ini dikembangkan sebagai bagian dari Tugas Akhir program studi Teknik Informatika. 
            Tujuannya adalah membantu petani, distributor, dan konsumen dalam mengklasifikasikan spesies 
            dan menilai kualitas sayuran secara cepat, objektif, dan akurat menggunakan teknologi Deep Learning (CNN).
          </p>
          <ul className="objective-list">
            <li>Mengidentifikasi jenis sayuran serta spesiesnya secara real-time</li>
            <li>Mengklasifikasikan kualitas sayuran (Muda, Matang, Layu, Busuk)</li>
            <li>Merekomendasi penyimpanan & penanganan pasca-panen</li>
            <li>Mengimplementasikan pertanian cerdas berbasis teknologi </li>
          </ul>
        </div>
      </section>

      {/* Teknologi Stack */}
      <section className="about-section">
        <div className="section-header">
          <h2>🛠️ Teknologi yang Digunakan</h2>
        </div>
        <div className="tech-grid">
          <div className="tech-card">
            <span className="tech-icon">⚛️</span>
            <h3>Frontend</h3>
            <p>React.js + Vite, React Router, Modern CSS3, LocalStorage</p>
          </div>
          <div className="tech-card">
            <span className="tech-icon">🐍</span>
            <h3>Backend</h3>
            <p>FastAPI (Python), RESTful API, CORS, Uvicorn</p>
          </div>
          <div className="tech-card">
            <span className="tech-icon">🤖</span>
            <h3>Deep Learning</h3>
            <p>TensorFlow + Keras, MobileNetV2, Transfer Learning, Fine-tuning</p>
          </div>
          <div className="tech-card">
            <span className="tech-icon">📦</span>
            <h3>Deployment & Tools</h3>
            <p>Git, VS Code, Pillow, NumPy, Ready for Cloud (Railways)</p>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>📊 Spesifikasi Model</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Klasifikasi Spesies</h3>
            <p>Mengidentifikasi 8 jenis sayuran dan spesiesnya: Cabai, Kubis, Terong, dan Tomat.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Analisis Kualitas</h3>
            <p>Menilai kondisi sayuran dalam 4 tingkat: Muda, Matang, Layu, dan Busuk.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Penjelasan Detail</h3>
            <p>Setiap hasil dilengkapi dengan informasi lengkap, tips penyimpanan, dan rekomendasi.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Desain responsif yang optimal digunakan di smartphone maupun desktop.</p>
          </div>
        </div>
      </section>

      {/* Developer / Author */}
      <section className="about-section">
        <div className="content-card">
          <h2>👨‍ Developer & Akademik</h2>
          <div className="dev-info">
            <div className="dev-avatar">🎓</div>
            <div className="dev-details">
              <h3>Mahasiswa Teknik Informatika UNIPA</h3>
              <p>Proyek ini dikembangkan sebagai Tugas Akhir dengan fokus pada penerapan Deep Learning (CNN) untuk bidang pertanian digital.</p>
              <div className="dev-meta">
                <span>📅 Tahun: 2026</span>
                <span>🏫 Program Studi: Teknik Informatika</span>
                <span>📧 Kontak: thorixrover@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;