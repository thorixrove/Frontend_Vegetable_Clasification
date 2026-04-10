import React, { useState } from 'react';
import './PredictionResult.css';

const PredictionResult = ({ result }) => {
  if (!result) return null;

  const [activeTab, setActiveTab] = useState('species');

  // --- LOGIKA PERINGATAN KONSUMSI ---
  const getWarningInfo = (qualityLabel) => {
    // Deteksi kata kunci 'Busuk'
    if (qualityLabel.includes('Busuk')) {
      return {
        type: 'danger',
        icon: '🚫',
        title: 'PERINGATAN: JANGAN DIKONSUMSI',
        msg: 'Sayuran sudah busuk. Berisiko menyebabkan keracunan makanan. Segera buang!'
      };
    }
    // Deteksi kata kunci 'Layu'
    if (qualityLabel.includes('Layu')) {
      return {
        type: 'warning',
        icon: '⚠️',
        title: 'PERHATIAN: SEGERA OLAH',
        msg: 'Kesegaran menurun. Nutrisi berkurang. Boleh dikonsumsi setelah dimasak.'
      };
    }
    // Deteksi kata kunci 'Matang'
    if (qualityLabel.includes('Matang')) {
      return {
        type: 'success',
        icon: '✅',
        title: 'AMAN: KONDISI OPTIMAL',
        msg: 'Sayuran segar dan siap makan. Kandungan nutrisi maksimal.'
      };
    }
    // Deteksi kata kunci 'Muda'
    if (qualityLabel.includes('Muda')) {
      return {
        type: 'info',
        icon: 'ℹ️',
        title: 'AMAN: BISA DIKONSUMSI',
        msg: 'Sayuran muda. Tekstur keras, cocok untuk acar atau masakan yang butuh perebusan lama.'
      };
    }
    // Default fallback
    return {
      type: 'info',
      icon: 'ℹ️',
      title: 'Informasi Kualitas',
      msg: 'Periksa penjelasan detail untuk mengetahui kondisi sayuran.'
    };
  };

  const warning = getWarningInfo(result.quality);
  // ----------------------------------

  return (
    <div className="prediction-result-card">
      {/* Header Hasil */}
      <div className="result-header">
        <h2>📊 Hasil Klasifikasi</h2>
        <div className="badges">
          <span className="badge species-badge">{result.species}</span>
          <span className="badge quality-badge">{result.quality}</span>
        </div>
      </div>

      {/* Confidence Bars */}
      <div className="confidence-section">
        <div className="conf-item">
          <span className="conf-label">Keyakinan Spesies</span>
          <div className="conf-bar-bg">
            <div className="conf-bar-fill" style={{ width: `${result.species_confidence * 100}%` }}></div>
          </div>
          <span className="conf-value">{(result.species_confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="conf-item">
          <span className="conf-label">Keyakinan Kualitas</span>
          <div className="conf-bar-bg">
            <div className="conf-bar-fill" style={{ width: `${result.quality_confidence * 100}%` }}></div>
          </div>
          <span className="conf-value">{(result.quality_confidence * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* --- BAGIAN BARU: BANNER PERINGATAN --- */}
      <div className={`alert-banner ${warning.type}`}>
        <span className="alert-icon">{warning.icon}</span>
        <div className="alert-text">
          <strong>{warning.title}</strong>
          <p>{warning.msg}</p>
        </div>
      </div>
      {/* ------------------------------------ */}

      {/* Tab Penjelasan */}
      <div className="explanation-tabs">
        <button 
          className={`tab-btn ${activeTab === 'species' ? 'active' : ''}`}
          onClick={() => setActiveTab('species')}
        >
          🌿 Spesies
        </button>
        <button 
          className={`tab-btn ${activeTab === 'quality' ? 'active' : ''}`}
          onClick={() => setActiveTab('quality')}
        >
           🥗 Kualitas
        </button>
      </div>

      {/* Konten Penjelasan */}
      <div className="explanation-content">
        {activeTab === 'species' && result.species_explanation && (
          <div className="info-box species-info">
            <h3>{result.species_explanation.nama}</h3>
            <p className="desc">{result.species_explanation.deskripsi}</p>
            <div className="info-grid">
              <div className="info-item">
                <strong>Kandungan:</strong> {result.species_explanation.kandungan}
              </div>
              <div className="info-item">
                <strong>Tips Simpan:</strong> {result.species_explanation.tips}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quality' && result.quality_explanation && (
          <div className={`info-box quality-info ${result.quality_confidence > 0.7 ? 'safe' : 'warning'}`}>
            <h3>Status: {result.quality_explanation.status}</h3>
            <p className="desc">{result.quality_explanation.deskripsi}</p>
            <div className="recommendation">
              <strong>Rekomendasi:</strong> {result.quality_explanation.rekomendasi}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionResult;