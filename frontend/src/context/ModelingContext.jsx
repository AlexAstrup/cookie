// src/context/ModelingContext.jsx
import { createContext, useContext, useMemo, useRef, useState } from 'react';
import { runSimulation } from '../services/modelingApi';

const ModelingContext = createContext(null);

export function ModelingProvider({ children }) {
  const [params, setParams] = useState({
    dataset: '',
    model: '',
    horizon: 12,
    regularization: 0.1,
    features: [],
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'error'
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  async function simulate() {
    setStatus('running');
    setError(null);
    setResult(null);

    // cancel any in-flight run
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await runSimulation(params, { signal: controller.signal });
      setResult(data);
      setStatus('success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Simulation failed');
      setStatus('error');
    } finally {
      abortRef.current = null;
    }
  }

  const value = useMemo(
    () => ({ params, setParams, simulate, status, result, error }),
    [params, status, result, error]
  );

  return <ModelingContext.Provider value={value}>{children}</ModelingContext.Provider>;
}

export function useModeling() {
  const ctx = useContext(ModelingContext);
  if (!ctx) throw new Error('useModeling must be used within ModelingProvider');
  return ctx;
}
