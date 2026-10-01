import { ImageOff, Trash2 } from 'lucide-react';
import { formatDate, parseQuality, splitLabel, stageClass } from '../utils/format';

export default function HistoryItem({ item, onClick, onDelete }) {
  const { stage } = parseQuality(item.result.quality);
  // riwayat lama menyimpan blob URL yang sudah tidak berlaku
  const src = item.image?.startsWith('data:') ? item.image : null;

  return (
    <div className="h-item">
      <button className="h-open" onClick={onClick}>
        {src ? (
          <img className="h-thumb" src={src} alt="" />
        ) : (
          <span className="h-thumb h-noimg"><ImageOff size={20} /></span>
        )}
        <span className="h-body">
          <strong>{splitLabel(item.result.species)}</strong>
          <span className={`chip ${stageClass(stage)}`}>{stage}</span>
          <time dateTime={item.timestamp}>{formatDate(item.timestamp)}</time>
        </span>
      </button>
      <button
        className="icon-btn h-del"
        onClick={() => {
          if (window.confirm('Yakin ingin menghapus item ini dari riwayat?')) {
            onDelete();
          }
        }}
        aria-label="Hapus dari riwayat"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}