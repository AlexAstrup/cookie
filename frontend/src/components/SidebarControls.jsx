// src/components/SidebarControls.jsx
import { useEffect, useState } from 'react';
import { useModeling } from '../context/ModelingContext';

export default function SidebarControls() {
  const { params, setParams, simulate, status, error } = useModeling();
  const [datasets, setDatasets] = useState([]);
  const MODELS = ['xgboost', 'random_forest', 'lstm'];

  const disabled = status === 'running';
  const canSimulate = params.dataset && params.model && !disabled;

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const res = await fetch('/data/tables/test');
        const data = await res.json();
        setDatasets(data || []);
      } catch (err) {
        console.error('Error fetching datasets:', err);
      }
    };
    fetchDatasets();
  }, []);

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Controls</h3>
      <label className="field">
        <span>Dataset (Table)</span>
        <select
          value={params.dataset || ''}
          onChange={(e) => setParams((p) => ({ ...p, dataset: e.target.value }))}
        >
          <option value="">Select table</option>
          {datasets.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Model</span>
        <select
          value={params.model}
          onChange={(e) => setParams((p) => ({ ...p, model: e.target.value }))}
        >
          <option value="">Select model</option>
          {MODELS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Horizon (months)</span>
        <input
          type="number"
          min={1}
          max={60}
          value={params.horizon}
          onChange={(e) =>
            setParams((p) => ({ ...p, horizon: Number(e.target.value) || 0 }))
          }
        />
      </label>

      <label className="field">
        <span>Regularization</span>
        <input
          type="number"
          step="0.01"
          min={0}
          max={10}
          value={params.regularization}
          onChange={(e) =>
            setParams((p) => ({ ...p, regularization: Number(e.target.value) || 0 }))
          }
        />
      </label>

      <fieldset className="field">
        <legend>Features</legend>
        {['promo', 'holiday', 'temp', 'trend'].map((feat) => (
          <label key={feat} className="checkbox">
            <input
              type="checkbox"
              checked={params.features.includes(feat)}
              onChange={(e) =>
                setParams((p) => {
                  const selected = new Set(p.features);
                  if (e.target.checked) selected.add(feat);
                  else selected.delete(feat);
                  return { ...p, features: Array.from(selected) };
                })
              }
            />
            <span>{feat}</span>
          </label>
        ))}
      </fieldset>

      {error && <div className="error">{error}</div>}

      <button
        className="simulate-btn"
        onClick={simulate}
        disabled={!canSimulate}
        aria-busy={status === 'running'}
      >
        {status === 'running' ? 'Simulating…' : 'Simulate'}
      </button>

      {status === 'running' && <p className="muted">This may take a moment…</p>}
    </aside>
  );
}
