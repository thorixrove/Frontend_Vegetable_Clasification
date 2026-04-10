import React from 'react';
import './Dashboard.css';

const Dashboard = ({ history }) => {
  const totalPredictions = history.length;
  
  // Hitung rata-rata confidence (spesies + kualitas)
  const avgConfidence = totalPredictions > 0
    ? (history.reduce((sum, item) => sum + item.result.species_confidence + item.result.quality_confidence, 0) / (totalPredictions * 2) * 100).toFixed(1)
    : 0;

  // Hitung frekuensi kemunculan
  const countOccurrences = (arr) => {
    return arr.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  };

  const speciesCounts = countOccurrences(history.map(h => h.result.species));
  const qualityCounts = countOccurrences(history.map(h => h.result.quality));

  const topSpecies = Object.keys(speciesCounts).length > 0 
    ? Object.keys(speciesCounts).reduce((a, b) => speciesCounts[a] > speciesCounts[b] ? a : b) 
    : 'Belum ada';
    
  const topQuality = Object.keys(qualityCounts).length > 0 
    ? Object.keys(qualityCounts).reduce((a, b) => qualityCounts[a] > qualityCounts[b] ? a : b) 
    : 'Belum ada';

  return (
    <div className="dashboard-container">

      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Prediksi</h3>
            <p className="stat-value">{totalPredictions}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Rata-rata Confidence</h3>
            <p className="stat-value">{avgConfidence}%</p>
          </div>
        </div>
        
        <div className="stat-card">
    
          <div className="stat-info">
            <h3>Spesies Terbanyak</h3>
            <p className="stat-value">{topSpecies}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Kualitas Dominan</h3>
            <p className="stat-value">{topQuality}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-info-box">
        <h4> Tips Penggunaan</h4>
        <ul>
          <li>Pastikan gambar sayuran jelas dengan pencahayaan yang cukup</li>
          <li>Hindari background yang ramai agar model lebih fokus pada objek</li>
          <li>Gunakan gambar close-up untuk akurasi klasifikasi terbaik</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;