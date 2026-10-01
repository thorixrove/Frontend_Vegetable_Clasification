const goals = [
  'Mengidentifikasi jenis dan spesies sayuran dari foto',
  'Mengklasifikasikan kualitas sayuran: muda, matang, layu, atau busuk',
  'Memberi rekomendasi penyimpanan dan penanganan pascapanen',
  'Menerapkan pertanian cerdas berbasis teknologi',
];

const specs = [
  ['Arsitektur', 'MobileNetV2 (transfer learning)'],
  ['Ukuran input', '128 × 128 piksel'],
  ['Model spesies', '8 kelas'],
  ['Model kualitas', '16 kelas (4 sayuran × 4 tingkat)'],
  ['Sayuran', 'Cabai, kubis, terong, tomat'],
  ['Tingkat kualitas', 'Muda, matang, layu, busuk'],
];

const stack = [
  { title: 'Frontend', text: 'React + Vite, React Router, CSS, LocalStorage' },
  { title: 'Backend', text: 'FastAPI (Python), REST API, CORS, Uvicorn' },
  { title: 'Deep learning', text: 'TensorFlow + Keras, MobileNetV2, transfer learning, fine-tuning' },
  { title: 'Alat dan deployment', text: 'Git, VS Code, Pillow, NumPy. Frontend di Vercel, backend siap di Railway' },
];

export default function AboutPage() {
  return (
    <div className="container about">
      <header className="page-head">
        <h1>Tentang proyek</h1>
        <p>Sistem klasifikasi spesies dan kualitas sayuran berbasis deep learning.</p>
      </header>

      <div className="about-grid">
        <section className="panel">
          <h2>Latar belakang dan tujuan</h2>
          <p className="about-text">
            Proyek ini dikembangkan sebagai Tugas Akhir program studi Teknik Informatika. Tujuannya
            membantu petani, distributor, dan konsumen mengenali spesies serta menilai kualitas
            sayuran dengan cepat dan objektif, memakai Convolutional Neural Network (CNN).
          </p>
          <ul className="goal-list">
            {goals.map((g) => <li key={g}>{g}</li>)}
          </ul>
        </section>

        <section className="panel">
          <h2>Spesifikasi model</h2>
          <dl className="spec">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="section about-stack">
        <div className="section-head">
          <h2>Teknologi yang digunakan</h2>
        </div>
        <div className="stack">
          {stack.map((s) => (
            <div key={s.title} className="stack-item">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Pengembang</h2>
        <p className="about-text">
          Mahasiswa Teknik Informatika UNIPA. Proyek ini adalah Tugas Akhir tahun 2026 dengan fokus
          penerapan deep learning untuk pertanian digital.
        </p>
        <p className="about-contact">
          Kontak: <a href="mailto:thorixrover@gmail.com">thorixrover@gmail.com</a>
        </p>
      </section>
    </div>
  );
}