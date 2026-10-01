import { STAGES } from '../utils/format';

// active: 0-3 (indeks tahap) atau null untuk menampilkan skala tanpa penanda
export default function QualityScale({ active = null }) {
  return (
    <div className="scale">
      <div className="scale-track">
        <div className="scale-bar" />
        {active !== null && (
          <span className="scale-marker" style={{ left: `${(active * 2 + 1) * 12.5}%` }} />
        )}
      </div>
      <ol className="scale-stops">
        {STAGES.map((stage, i) => (
          <li key={stage} className={i === active ? 'is-active' : ''}>{stage}</li>
        ))}
      </ol>
    </div>
  );
}