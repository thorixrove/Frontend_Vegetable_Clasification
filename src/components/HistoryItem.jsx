import React from 'react';
import './HistoryItem.css';

const HistoryItem = ({ item, onClick, onDelete }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="history-item-card" onClick={onClick}>
      <div className="history-image-wrapper">
        <img src={item.image} alt={item.result.species} className="history-thumb" />
        <div className="history-badges">
          <span className="badge-sm species">{item.result.species}</span>
        </div>
      </div>
      
      <div className="history-content">
        <div className="history-main-info">
          <p className="history-species-name">{item.result.species}</p>
          <p className="history-quality-status">{item.result.quality}</p>
        </div>
        
        <div className="history-meta">
          <span className="history-time">{formatDate(item.timestamp)}</span>
          <button 
            className="btn-delete-individual"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Hapus riwayat ini"
          >
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;