import {useMemo, useState} from 'react';
import {useModeling} from '../context/ModelingContext';
import {useParams, Link} from 'react-router-dom';
import {Line} from 'react-chartjs-2';

const MAX_POINTS = 500;

export default function Dashboard() {
  const {scenarioId} = useParams();
  const {params, setParams, fetchData, simulate, status, error, result, data} = useModeling();
  const [nodes, setNodes] = useState([
    {id: '1', type: 'input', data: {label: 'Data Source'}, position: {x: 50, y: 50}},
    {id: '2', type: 'default', data: {label: 'Inference Model'}, position: {x: 300, y: 50}},
    {id: '3', type: 'output', data: {label: 'Results'}, position: {x: 550, y: 50}},
  ]);

  const sampled = useMemo(() => {
    if (!data) return null;
    if (data.length <= MAX_POINTS) return data;
    const factor = Math.ceil(data.length / MAX_POINTS);
    return data.filter((_, idx) => idx % factor === 0);
  }, [data]);

  const chartData = useMemo(() => {
    if (!sampled) return null;
    return {
      labels: sampled.map((_, i) => `Point ${i + 1}`),
      datasets: [
        {label: 'Column 1', data: sampled.map(r => r.one), borderColor: 'red', borderWidth: 1},
        {label: 'Column 2', data: sampled.map(r => r.two), borderColor: 'green', borderWidth: 1},
        {label: 'Column 3', data: sampled.map(r => r.three), borderColor: 'blue', borderWidth: 1},
      ],
    };
  }, [sampled]);

  const options = useMemo(() => ({
    responsive: true,
    animation: false,
    interaction: {mode: 'index', intersect: false},
    elements: {point: {radius: 0}},
    scales: {x: {display: false}},
  }), []);

  const runScenario = () => {
    if (params.dataset) {
      fetchData().then(() => {
        if (params.model) {
          simulate();
        }
      });
    } else {
      alert("Please select a dataset in the controls first.");
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <header style={{
        padding: '1rem',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <Link to="/dashboard" style={{marginRight: '1rem', textDecoration: 'none', color: '#007bff'}}>&larr; Back to
            Scenarios</Link>
          <span style={{fontWeight: 'bold'}}>Scenario ID: {scenarioId}</span>
        </div>
        <button
          onClick={runScenario}
          disabled={status === 'running' || !params.dataset || !params.model}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {status === 'running' ? 'Running...' : 'Run Scenario'}
        </button>
      </header>

      <main style={{flex: 1, padding: '1rem', position: 'relative', overflow: 'hidden'}}>
        {/* Mock Flow Interface */}
        <div style={{
          height: '250px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '1rem',
          backgroundColor: '#fcfcfc',
          color: '#000000',
          position: 'relative',
          backgroundImage: 'radial-gradient(#ddd 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}>
          <div style={{position: 'absolute', top: '10px', left: '10px', fontSize: '0.8rem', color: '#000000'}}>React
            Flow Interface (Mock)
          </div>

          {nodes.map(node => (
            <div key={node.id} style={{
              position: 'absolute',
              left: node.position.x,
              top: node.position.y,
              width: '120px',
              padding: '10px',
              border: '1px solid #333',
              borderRadius: '4px',
              backgroundColor: 'white',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              zIndex: 2
            }}>
              {node.data.label}
            </div>
          ))}

          {/* Simple SVG Arrows */}
          <svg style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
              </marker>
            </defs>
            <line x1="170" y1="75" x2="290" y2="75" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1="420" y1="75" x2="540" y2="75" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          </svg>
        </div>

        {/* Status and Results */}
        <div style={{padding: '1rem', border: '1px solid #eee', borderRadius: '8px'}}>
          {status === 'idle' && <p>Configure scenario settings in the sidebar and click "Run Scenario".</p>}
          {status === 'running' && (
            <p>Executing scenario steps...</p>
          )}
          {status === 'error' && <p style={{color: 'red'}}>{error || 'Something went wrong.'}</p>}
          {status === 'success' && (
            <div>
              <h3>Results</h3>
              {chartData ? <Line data={chartData} options={options}/> : <p>No data to display.</p>}
              {result && (
                <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                  <strong>Model Output:</strong> {result.message}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}