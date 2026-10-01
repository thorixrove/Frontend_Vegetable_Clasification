import { parseQuality, splitLabel } from '../utils/format';

export default function Dashboard({ history }) {
  if (!history.length) return null;

  const total = history.length;
  const fresh = history.filter(({ result }) =>
    ['Muda', 'Matang'].includes(parseQuality(result.quality).stage),
  ).length;

  const counts = {};
  history.forEach(({ result }) => {
    counts[result.species] = (counts[result.species] || 0) + 1;
  });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const topSpecies = top ? top[0] : '';

  return (
    <div className="stats">
      <div className="stat">
        <p className="stat-value">{total}</p>
        <p className="stat-label">Prediksi tersimpan</p>
      </div>
      <div className="stat">
        <p className="stat-value">{fresh} dari {total}</p>
        <p className="stat-label">Masih segar (muda atau matang)</p>
      </div>
      <div className="stat">
        <p className="stat-value">{splitLabel(topSpecies)}</p>
        <p className="stat-label">Spesies paling sering</p>
      </div>
    </div>
  );
}