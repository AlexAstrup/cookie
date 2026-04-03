import { useEffect, useState } from 'react';
import { useModeling } from '../context/ModelingContext';

export default function Data() {
  const { params, setParams, fetchData, data, status, error } = useModeling();
  const [datasets, setDatasets] = useState([]);

  const disabled = status === 'running';
  const canFetchData = params.dataset && !disabled;

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const res = await fetch('http://localhost:5000/data/tables/test');
        const datasetsList = await res.json();
        setDatasets(datasetsList || []);
      } catch (err) {
        console.error('Error fetching datasets:', err);
      }
    };
    fetchDatasets();
  }, []);

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>Data Selection</h1>
      <div className="selection-controls" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <label className="field" style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Dataset (Table)</span>
          <select
            value={params.dataset || ''}
            onChange={(e) => setParams((p) => ({ ...p, dataset: e.target.value }))}
            style={{ padding: '0.5rem', minWidth: '200px' }}
          >
            <option value="">Select table</option>
            {datasets.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <button
          className="data-btn"
          onClick={fetchData}
          disabled={!canFetchData}
          aria-busy={status === 'running'}
          style={{ padding: '0.5rem 1rem' }}
        >
          {status === 'running' ? 'Loading…' : 'Load Data'}
        </button>
      </div>

      {error && <div className="error" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      <div className="data-preview">
        <h2>Table Preview</h2>
        {data ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {Object.keys(data[0] || {}).map((key) => (
                    <th key={key} style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left', backgroundColor: '#f9f9f9' }}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j} style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length > 10 && <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>Showing first 10 of {data.length} rows</p>}
          </div>
        ) : (
          <p>No data loaded yet. Select a dataset and click "Load Data".</p>
        )}
      </div>
    </div>
  );
}
