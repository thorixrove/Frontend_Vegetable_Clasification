import { TriangleAlert } from 'lucide-react';
import QualityScale from './QualityScale';
import { parseQuality, splitLabel, stageClass, toPercent } from '../utils/format';

const LOW_CONFIDENCE = 0.6;

const toTitle = (key) => key.replace(/[_-]+/g, ' ').replace(/^./, (c) => c.toUpperCase());

function renderValue(value) {
  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((item, i) => (
          <li key={i}>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>
        ))}
      </ul>
    );
  }
  if (value && typeof value === 'object') return <Explanation data={value} />;
  return <p>{String(value)}</p>;
}

// Isi explanations.json belum saya lihat, jadi field dirender apa adanya.
function Explanation({ data }) {
  if (!data) return null;
  if (typeof data === 'string') return <p>{data}</p>;
  const entries = Object.entries(data);
  if (!entries.length) return null;
  return (
    <dl className="explain">
      {entries.map(([key, value]) => (
        <div key={key}>
          <dt>{toTitle(key)}</dt>
          <dd>{renderValue(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

function Confidence({ label, value, color }) {
  const pct = toPercent(value);
  return (
    <div className="conf" style={color ? { '--conf-color': color } : undefined}>
      <div className="conf-head">
        <span>{label}</span>
        <strong>{pct}%</strong>
      </div>
      <div className="conf-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="conf-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function PredictionResult({ result }) {
  const { crop, stage, index } = parseQuality(result.quality);
  const speciesName = splitLabel(result.species);
  const lowConfidence =
    Math.min(result.species_confidence, result.quality_confidence) < LOW_CONFIDENCE;
  const mismatch = !result.species.startsWith(crop);

  return (
    <article className="result">
      <div className="result-summary">
        <section className="result-block">
          <p className="result-label">Spesies</p>
          <h2 className="result-title">{speciesName}</h2>
          <div className="conf-group">
            <Confidence label="Keyakinan spesies" value={result.species_confidence} />
            <Confidence
              label="Keyakinan kualitas"
              value={result.quality_confidence}
              color={stage ? `var(--${stageClass(stage)})` : undefined}
            />
          </div>
        </section>

        <section className="result-block">
          <p className="result-label">Kualitas</p>
          <div>
            <span className={`chip chip-lg ${stageClass(stage)}`}>{stage || splitLabel(result.quality)}</span>
          </div>
          {index !== null && <QualityScale active={index} />}
        </section>

        {mismatch && (
          <p className="notice" role="note">
            <TriangleAlert size={18} />
            Model spesies mengenali {speciesName}, sedangkan model kualitas menilai {crop.toLowerCase()}.
            Hasil kurang dapat dipercaya, coba foto lain.
          </p>
        )}
        {lowConfidence && !mismatch && (
          <p className="notice" role="note">
            <TriangleAlert size={18} />
            Keyakinan model rendah. Coba foto dengan cahaya lebih terang dan satu sayuran di tengah gambar.
          </p>
        )}
      </div>

      <div className="explain-wrap">
        <details open>
          <summary>Tentang {speciesName}</summary>
          <Explanation data={result.species_explanation} />
        </details>
        <details>
          <summary>Kondisi {stage ? stage.toLowerCase() : 'sayuran'}</summary>
          <Explanation data={result.quality_explanation} />
        </details>
      </div>
    </article>
  );
}