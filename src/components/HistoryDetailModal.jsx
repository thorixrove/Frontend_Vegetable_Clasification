import { Trash2, X } from 'lucide-react';
import { useEffect } from 'react';
import { formatDate } from '../utils/format';
import PredictionResult from './PredictionResult';

export default function HistoryDetailModal({ item, onClose, onDelete }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const src = item.image?.startsWith('data:') ? item.image : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Detail riwayat prediksi"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-head">
          <div>
            <h2>Detail prediksi</h2>
            <p className="modal-date">{formatDate(item.timestamp)}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </header>

        {src && <img className="modal-img" src={src} alt="Foto yang diprediksi" />}

        <PredictionResult result={item.result} />

        <button
          className="btn btn-ghost"
          onClick={() => {
            const confirmed = window.confirm('Apakah Anda yakin ingin menghapus riwayat ini?');
            if (confirmed) onDelete();
          }}
        >
          <Trash2 size={18} />
          Hapus dari riwayat
        </button>
      </div>
    </div>
  );
}