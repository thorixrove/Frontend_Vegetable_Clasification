import React from 'react';
import './HistoryDetailModal.css';

const HistoryDetailModal = ({ item, onClose, onDelete }) => {
  const [activeTab, setActiveTab] = React.useState('species');

  if (!item) return null;

  // Logic warning sama seperti sebelumnya
  const getWarningInfo = (label) => {
    if (label.includes('Busuk')) return { type: 'danger', icon: '🚫', title: 'PERINGATAN: JANGAN DIKONSUMSI', msg: 'Sayuran sudah busuk. Berisiko menyebabkan keracunan makanan. Segera buang!' };
    if (label.includes('Layu')) return { type: 'warning', icon: '⚠️', title: 'PERHATIAN: SEGERA OLAH', msg: 'Kesegaran menurun. Nutrisi berkurang. Boleh dikonsumsi setelah dimasak.' };
    if (label.includes('Matang')) return { type: 'success', icon: '✅', title: 'AMAN: KONDISI OPTIMAL', msg: 'Sayuran segar dan siap makan. Kandungan nutrisi maksimal.' };
    if (label.includes('Muda')) return { type: 'info', icon: 'ℹ️', title: 'AMAN: BISA DIKONSUMSI', msg: 'Sayuran muda. Tekstur keras, cocok untuk acar atau masakan yang butuh perebusan lama.' };
    return { type: 'info', icon: 'ℹ️', title: 'Informasi', msg: '-' };
  };

  const warning = getWarningInfo(item.result.quality);
  
  const formatDate = (ts) => new Date(ts).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header Actions */}
        <div className="modal-header-actions">
          <button className="modal-delete-btn" onClick={onDelete}> Hapus</button>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Image */}
        <div className="modal-image-container">
          <img src={item.image} alt="Preview" className="modal-image" />
          <div className="modal-badges">
            <span className="badge-lg species">{item.result.species}</span>
            <span className="badge-lg quality">{item.result.quality}</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="modal-info-section">
          <h3> Detail Prediksi</h3>
          <div className="confidence-bars">
            <div className="conf-row">
              <span className="conf-label">Spesies</span>
              <div className="conf-bar-wrapper">
                <div className="conf-bar-fill" style={{ width: `${item.result.species_confidence * 100}%` }}></div>
              </div>
              <span className="conf-value">{(item.result.species_confidence * 100).toFixed(1)}%</span>
            </div>
            <div className="conf-row">
              <span className="conf-label">Kualitas</span>
              <div className="conf-bar-wrapper">
                <div className="conf-bar-fill" style={{ width: `${item.result.quality_confidence * 100}%` }}></div>
              </div>
              <span className="conf-value">{(item.result.quality_confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Alert Banner (HOVER EFFECT HERE) */}
        <div className={`modal-alert-banner ${warning.type}`}>
          <span className="modal-alert-icon">{warning.icon}</span>
          <div className="modal-alert-text">
            <strong>{warning.title}</strong>
            <p>{warning.msg}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          <button className={`tab-btn ${activeTab === 'species' ? 'active' : ''}`} onClick={() => setActiveTab('species')}>🌿 Spesies</button>
          <button className={`tab-btn ${activeTab === 'quality' ? 'active' : ''}`} onClick={() => setActiveTab('quality')}>🥗 Kualitas</button>
        </div>

        {/* Content */}
        <div className="modal-explanation">
          {activeTab === 'species' && item.result.species_explanation && (
            <div className="explanation-box species">
              <h4>{item.result.species_explanation.nama}</h4>
              <p className="explanation-desc">{item.result.species_explanation.deskripsi}</p>
              <div className="explanation-details">
                <div className="detail-item">
                  <strong> Kandungan:</strong>
                  <p>{item.result.species_explanation.kandungan}</p>
                </div>
                <div className="detail-item">
                  <strong> Tips Penyimpanan:</strong>
                  <p>{item.result.species_explanation.tips}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'quality' && item.result.quality_explanation && (
            <div className={`explanation-box quality ${item.result.quality_confidence > 0.7 ? 'safe' : 'warning'}`}>
              <h4>Status: {item.result.quality_explanation.status}</h4>
              <p className="explanation-desc">{item.result.quality_explanation.deskripsi}</p>
              <div className="explanation-details">
                <div className="detail-item recommendation">
                  <strong> Rekomendasi:</strong>
                  <p>{item.result.quality_explanation.rekomendasi}</p>
                </div>
              </div>
            </div>
          )}
          <p className="modal-timestamp"> {formatDate(item.timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetailModal;