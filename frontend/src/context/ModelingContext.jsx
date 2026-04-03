// src/context/ModelingContext.jsx
import { createContext, useContext, useMemo, useRef, useState } from 'react';
import { runDataFetch, runModelTrain  } from '../services/modelingApi';

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
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  // Fetch Data:
  async function fetchData() {
    setStatus('running');
    setError(null);
    setResult(null);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await runDataFetch(params, { signal: controller.signal });
      setData(data);
      setStatus('success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || "Couldn't load data.");
      setStatus('error');
    } finally {
      abortRef.current = null;
    }
  }

  // Model Training:
  async function simulate() {
    setStatus('running');
    setError(null);
    setResult(null);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await runModelTrain(params, { signal: controller.signal });
      setResult(res);
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
    () => ({ params, setParams, simulate, fetchData, status, result, data, error }),
    [params, status, result, error]
  );

  return <ModelingContext.Provider value={value}>{children}</ModelingContext.Provider>;
}

export function useModeling() {
  const ctx = useContext(ModelingContext);
  if (!ctx) throw new Error('useModeling must be used within ModelingProvider');
  return ctx;
}
