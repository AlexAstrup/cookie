import React from 'react';
import { useNavigate } from 'react-router-dom';

const SCENARIOS = [
  { id: 1, title: 'Revenue Growth', description: 'Analyze revenue growth trends.' },
  { id: 2, title: 'Cost Reduction', description: 'Evaluate potential cost saving measures.' },
  { id: 3, title: 'Market Expansion', description: 'Forecast impact of new market entry.' },
  { id: 4, title: 'Customer Churn', description: 'Predict and mitigate customer churn.' },
];

export default function Scenarios() {
  const navigate = useNavigate();

  const handleSelectScenario = (id) => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Scenarios</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {SCENARIOS.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => handleSelectScenario(scenario.id)}
            style={{
              width: '200px',
              height: '200px',
              border: '2px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{scenario.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>{scenario.description}</p>
          </div>
        ))}
        <div
          style={{
            width: '200px',
            height: '200px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '1rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
          <span style={{ fontSize: '3rem', color: '#ccc' }}>+</span>
          <p style={{ fontSize: '0.9rem', color: '#999' }}>Create New Scenario</p>
        </div>
      </div>
    </div>
  );
}
