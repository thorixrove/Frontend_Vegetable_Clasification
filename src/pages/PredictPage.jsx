import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import PredictionResult from '../components/PredictionResult';
import HistoryItem from '../components/HistoryItem';
import HistoryDetailModal from '../components/HistoryDetailModal';
import Footer from '../components/Footer';
import './PredictPage.css';

function PredictPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('predictionHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedHistory, setSelectedHistory] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError('');
    }
  };

  const handlePredict = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Gagal memproses gambar');
      const data = await res.json();
      setResult(data);
      
      const historyItem = {
        id: Date.now(),
        image: preview,
        result: data,
        timestamp: new Date().toISOString()
      };
      
      const newHistory = [historyItem, ...history].slice(0, 20);
      setHistory(newHistory);
      localStorage.setItem('predictionHistory', JSON.stringify(newHistory));
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('predictionHistory');
  };

  const deleteHistoryItem = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('predictionHistory', JSON.stringify(newHistory));
    if (selectedHistory && selectedHistory.id === id) {
      setSelectedHistory(null);
    }
  };

  const openHistoryDetail = (item) => setSelectedHistory(item);
  const closeHistoryDetail = () => setSelectedHistory(null);

  return (
    <>
      <div className="app-container">
           {/* Header Section */}
      <section className="about-header">
        <div className="hero-badge">📖 Klasifikasi Spesies & Kualitas</div>
        <h1>Memulai Prediksi</h1>
      </section>
       

        {/* Dashboard Section */}
        <Dashboard history={history} />

        {/* Upload Section */}
        <div className="upload-section">
          <div className="image-preview-container">
            {preview ? (
              <div className="preview-wrapper">
                <img src={preview} alt="Preview" className="preview-image" />
                <button 
                  className="remove-btn" 
                  onClick={() => { setImage(null); setPreview(null); setResult(null); }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="placeholder-container">
                <div className="upload-icon">📷</div>
                <p className="placeholder-text">Pilih gambar sayuran</p>
                <p className="placeholder-subtext">Format: JPG, PNG (Max 5MB)</p>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <label className="btn-upload">
               Pilih Gambar
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="file-input" 
              />
            </label>
            <button 
              className="btn-predict" 
              disabled={!image || loading} 
              onClick={handlePredict}
            >
              {loading ? (
                <span className="loading-text">
                  <span className="spinner">⏳</span> Memproses...
                </span>
              ) : (
                <> Prediksi Sekarang</>
              )}
            </button>
          </div>
          {error && <div className="error-message">⚠️ {error}</div>}
        </div>

        {/* Result Section */}
        {result && <PredictionResult result={result} />}

        {/* History Section */}
        {history.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3> Riwayat Prediksi ({history.length})</h3>
              <button className="btn-clear" onClick={clearHistory}>
                 Hapus Semua
              </button>
            </div>
            <div className="history-grid">
              {history.map((item) => (
                <HistoryItem
                  key={item.id}
                  item={item}
                  onClick={() => openHistoryDetail(item)}
                  onDelete={() => deleteHistoryItem(item.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Detail History */}
        {selectedHistory && (
          <HistoryDetailModal
            item={selectedHistory}
            onClose={closeHistoryDetail}
            onDelete={() => {
              deleteHistoryItem(selectedHistory.id);
              closeHistoryDetail();
            }}
          />
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

export default PredictPage;