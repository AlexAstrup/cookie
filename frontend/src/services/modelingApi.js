export async function runDataFetch(params, {signal} = {}) {
  const res = await fetch(`http://localhost:5000/data/test/${params.dataset}`, {signal});
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  return typeof data === 'string' ? JSON.parse(data) : data;
}

export async function runModelTrain(params, {signal} = {}) {
  const res = await fetch(`http://localhost:5000/${params.model}/train`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
    body: JSON.stringify({
      "schema_name": "test",
      "table_name": `${params.dataset}`,
      "target_column": "one"
    }),
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json()
  return typeof data === 'string' ? JSON.parse(data) : data;
}