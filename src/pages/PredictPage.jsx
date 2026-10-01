import { useEffect, useRef, useState } from 'react';
import { Camera, LoaderCircle, ScanSearch, TriangleAlert, Upload, X } from 'lucide-react';
import Dashboard from '../components/Dashboard';
import PredictionResult from '../components/PredictionResult';
import QualityScale from '../components/QualityScale';
import HistoryItem from '../components/HistoryItem';
import HistoryDetailModal from '../components/HistoryDetailModal';
import { makeThumbnail } from '../utils/format';

// URL API dari environment variable (production), fallback ke localhost saat development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const MAX_MB = 5;
const HISTORY_KEY = 'predictionHistory';

// buang riwayat lama atau rusak yang bentuknya tidak sesuai
const isValidEntry = (h) =>
  typeof h?.result?.species === 'string' && typeof h?.result?.quality === 'string';

const loadHistory = () => {
  try {
    const data = JSON.parse(localStorage.getItem(HISTORY_KEY));
    return Array.isArray(data) ? data.filter(isValidEntry) : [];
  } catch {
    return [];
  }
};

const saveHistory = (list) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch {
    // penyimpanan penuh: riwayat tetap tampil selama halaman terbuka
  }
};

export default function PredictPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [history, setHistory] = useState(loadHistory);
  const [selected, setSelected] = useState(null);

  const fileRef = useRef(null);
  const cameraRef = useRef(null);
  const resultRef = useRef(null);

  // lepaskan object URL lama saat gambar diganti atau halaman ditutup
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  // di layar kecil, geser ke hasil setelah prediksi selesai
  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [result]);

  const chooseFile = (f) => {
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setError('File harus berupa gambar JPG atau PNG.');
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`Ukuran gambar maksimal ${MAX_MB} MB.`);
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError('');
  };

  const resetImage = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
  };

  const predict = async () => {
    if (!file || loading) return;
    setLoading(true);
    setError('');
    setResult(null);

    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch(`${API_URL}/predict`, { method: 'POST', body });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || 'Server gagal memproses gambar.');
      }
      const data = await res.json();
      setResult(data);

      const thumbnail = await makeThumbnail(file);
      const entry = {
        id: Date.now(),
        image: thumbnail,
        result: data,
        timestamp: new Date().toISOString(),
      };
      const next = [entry, ...history].slice(0, 20);
      setHistory(next);
      saveHistory(next);
    } catch (e) {
      setError(
        e instanceof TypeError
          ? 'Tidak dapat terhubung ke server. Periksa koneksi internet, lalu coba lagi. Server yang baru aktif bisa butuh beberapa saat.'
          : e.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = (id) => {
    const next = history.filter((h) => h.id !== id);
    setHistory(next);
    saveHistory(next);
    if (selected?.id === id) setSelected(null);
  };

  const clearAll = () => {
    if (!window.confirm('Hapus semua riwayat prediksi?')) return;
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    chooseFile(e.dataTransfer.files[0]);
  };

  const onPick = (e) => {
    chooseFile(e.target.files[0]);
    e.target.value = '';
  };

  return (
    <div className="container predict">
      <header className="page-head">
        <h1>Prediksi</h1>
        <p>Unggah satu foto sayuran untuk mengetahui spesies dan kualitasnya.</p>
      </header>

      <Dashboard history={history} />

      <div className="predict-grid">
        <section className="panel" aria-label="Unggah gambar">
          {preview ? (
            <div className="preview">
              <img src={preview} alt="Pratinjau gambar yang dipilih" />
              <button className="icon-btn preview-remove" onClick={resetImage} aria-label="Hapus gambar">
                <X size={18} />
              </button>
            </div>
          ) : (
            <div
              className={`dropzone ${dragging ? 'is-dragging' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
            >
              <Upload size={32} />
              <p className="dropzone-title">Seret foto ke sini atau klik untuk memilih</p>
              <p className="dropzone-hint">JPG atau PNG, maksimal {MAX_MB} MB</p>
            </div>
          )}

          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} />
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={onPick} />

          <div className="panel-actions">
            <button className="btn btn-primary" onClick={predict} disabled={!file || loading}>
              {loading ? (
                <>
                  <LoaderCircle className="spin" size={18} />
                  Memproses...
                </>
              ) : (
                <>
                  <ScanSearch size={18} />
                  Prediksi sekarang
                </>
              )}
            </button>
            <button className="btn btn-ghost btn-camera" onClick={() => cameraRef.current?.click()}>
              <Camera size={18} />
              Kamera
            </button>
          </div>

          {error && (
            <p className="alert" role="alert">
              <TriangleAlert size={18} />
              {error}
            </p>
          )}
        </section>

        <section className="panel result-panel" ref={resultRef} aria-live="polite">
          {loading ? (
            <div className="state">
              <LoaderCircle className="spin" size={28} />
              <p>Menganalisis foto...</p>
            </div>
          ) : result ? (
            <PredictionResult result={result} />
          ) : (
            <div className="state">
              <p className="state-title">Hasil muncul di sini</p>
              <p>Pilih foto, lalu tekan Prediksi sekarang.</p>
              <QualityScale />
            </div>
          )}
        </section>
      </div>

      {history.length > 0 && (
        <section className="history" aria-label="Riwayat prediksi">
          <div className="history-head">
            <h2>Riwayat ({history.length})</h2>
            <button className="btn btn-ghost btn-sm" onClick={clearAll}>Hapus semua</button>
          </div>
          <div className="history-grid">
            {history.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                onClick={() => setSelected(item)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}
          </div>
        </section>
      )}

      {selected && (
        <HistoryDetailModal
          item={selected}
          onClose={() => setSelected(null)}
          onDelete={() => deleteItem(selected.id)}
        />
      )}
    </div>
  );
}