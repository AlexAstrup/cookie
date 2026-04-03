import { useModeling } from '../context/ModelingContext';

export default function Models() {
  const { params, setParams, simulate, status, error, result } = useModeling();
  const MODELS = ['abm', 'random_forest', 'lstm'];

  const disabled = status === 'running';
  const canSimulate = params.dataset && params.model && !disabled;

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>Models Overview</h1>

      <div className="selection-controls" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <label className="field" style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Model selection</span>
          <select
            value={params.model}
            onChange={(e) => setParams((p) => ({ ...p, model: e.target.value }))}
            style={{ padding: '0.5rem', minWidth: '200px' }}
          >
            <option value="">Select model</option>
            {MODELS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <button
          className="simulate-btn"
          onClick={simulate}
          disabled={!canSimulate}
          aria-busy={status === 'running'}
          style={{ padding: '0.5rem 1rem' }}
        >
          {status === 'running' ? 'Simulating…' : 'Simulate'}
        </button>
      </div>

      {!params.dataset && (
        <div style={{ padding: '1rem', backgroundColor: '#fff4e5', borderLeft: '5px solid #ffa117', marginBottom: '2rem' }}>
          Please select a <strong>Dataset</strong> in the Data page before simulating.
        </div>
      )}

      {error && <div className="error" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      <div className="models-main-view" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <section className="errors-view" style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h2>Errors</h2>
          {result ? (
            <div>
              <p>Mean Absolute Error: {result.mae || 'N/A'}</p>
              <p>Root Mean Squared Error: {result.rmse || 'N/A'}</p>
              {/* Add more error metrics as available */}
              <pre style={{ backgroundColor: '#f4f4f4', padding: '0.5rem', overflow: 'auto' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ) : (
            <p>No simulation result yet. Select a model and click "Simulate".</p>
          )}
        </section>

        <section className="attributes-view" style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h2>Attributes</h2>
          <p>Model properties and configurations will be displayed here.</p>
          <ul>
            <li><strong>Current Model:</strong> {params.model || 'None'}</li>
            <li><strong>Horizon:</strong> {params.horizon} months</li>
            <li><strong>Dataset:</strong> {params.dataset || 'None'}</li>
          </ul>
          <p style={{ fontStyle: 'italic', color: '#666' }}>Future: Fetching from MLFlow through the backend.</p>
        </section>
      </div>
    </div>
  );
}
