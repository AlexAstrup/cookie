// src/components/SidebarControls.jsx
import { useModeling } from '../context/ModelingContext';

export default function SidebarControls() {
  const { params, setParams, status, error } = useModeling();

  const disabled = status === 'running';

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Controls</h3>

      <label className="field">
        <span>Horizon (months)</span>
        <input
          type="number"
          min={1}
          max={60}
          disabled={disabled}
          value={params.horizon}
          onChange={(e) =>
            setParams((p) => ({ ...p, horizon: Number(e.target.value) || 0 }))
          }
        />
      </label>

      {error && <div className="error" style={{ color: 'red' }}>{error}</div>}

      {status === 'running' && <p className="muted">Processing…</p>}
    </aside>
  );
}
