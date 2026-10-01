import { Link } from 'react-router-dom';
import { ScanSearch } from 'lucide-react';
import QualityScale from '../components/QualityScale';

const steps = [
  {
    title: 'Pilih foto',
    text: 'Unggah atau ambil foto satu jenis sayuran. Cahaya cukup dan latar polos memberi hasil terbaik.',
  },
  {
    title: 'Tekan Prediksi',
    text: 'Foto dikirim ke server dan dianalisis oleh dua model: satu untuk spesies, satu untuk kualitas.',
  },
  {
    title: 'Tunggu beberapa detik',
    text: 'Biasanya selesai dalam hitungan detik. Permintaan pertama bisa lebih lama jika server baru aktif.',
  },
  {
    title: 'Baca hasilnya',
    text: 'Lihat spesies, tingkat kualitas, keyakinan model, dan penjelasan tambahan.',
  },
];

const crops = [
  { emoji: '🌶️', name: 'Cabai', types: 'Cabai keriting dan cabai rawit' },
  { emoji: '🥬', name: 'Kubis', types: 'Kubis hijau dan kubis merah' },
  { emoji: '🍆', name: 'Terong', types: 'Terong gelatik hijau dan terong kopek ungu' },
  { emoji: '🍅', name: 'Tomat', types: 'Tomat cherry dan tomat roma' },
];

export default function LandingPage() {
  return (
    <>
      <section className="container hero">
        <div className='hero-copy'>
        <h1>Kenali jenis dan kesegaran sayuran dari satu foto</h1>
        <p className="hero-lead">
          Unggah foto cabai, kubis, terong, atau tomat. Model MobileNetV2 menentukan spesiesnya,
          lalu menilai apakah sayuran itu masih muda, matang, layu, atau sudah busuk.
        </p>
        <div className="hero-actions">
          <Link to="/predict" className="btn btn-primary">
            <ScanSearch size={18} />
            Mulai prediksi
          </Link>
          <a href="#cara-pakai" className="btn btn-ghost">Lihat cara pakai</a>
        </div>
        </div>

        <div className="hero-scale">
          <p className="hero-scale-title">Setiap foto dinilai pada skala kualitas ini</p>
          <QualityScale active={1} />
          <p className="hero-scale-note">
            Penanda menunjukkan posisi hasil. Makin ke kanan, makin jauh dari segar.
          </p>
        </div>
      </section>

      <section id="cara-pakai" className="container section">
        <div className="section-head">
          <h2>Cara memakai</h2>
          <p>Empat langkah, tanpa perlu membuat akun.</p>
        </div>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section crops-section">
        <div className="section-head">
          <h2>Sayuran yang dikenali</h2>
          <p>Empat jenis sayuran, masing-masing dengan dua spesies.</p>
        </div>
        <div className="crops">
          {crops.map((c) => (
            <div key={c.name} className="crop">
              <span className="crop-emoji" aria-hidden="true">{c.emoji}</span>
              <h3>{c.name}</h3>
              <p>{c.types}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container cta-section">
        <div className="cta">
          <h2>Coba dengan foto sayuranmu sendiri</h2>
          <Link to="/predict" className="btn btn-primary">Buka halaman prediksi</Link>
        </div>
      </section>
    </>
  );
}