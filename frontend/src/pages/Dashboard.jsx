import { useModeling } from '../context/ModelingContext';

export default function Dashboard() {
  const { status, result, params } = useModeling();

  if (status === 'idle') {
    return <p>Select inputs on the left and click Simulate.</p>;
  }

  if (status === 'running') {
    return <p>Running simulation for dataset “{params.dataset}” with model “{params.model}”…</p>;
  }

  if (status === 'error') {
    return <p>Something went wrong. Try adjusting parameters.</p>;
  }

  // status === 'success'
  return (
    <section>
      <h2>Simulation results</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      {/* Replace with charts/tables as you build them */}
    </section>
  );
}