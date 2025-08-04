// ChartPage.jsx
import React, {useState, useEffect, useMemo} from 'react';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MAX_POINTS = 2_000;

function ChartPage() {const [rawData, setRawData] = useState(null);

  /* ───────────────────────── FETCH ───────────────────────── */
  useEffect(() => {
    fetch('/data/bdt')
      .then((res) => res.json())
      .then((data) => {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        setRawData(parsed);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  /* ──────────────── DOWNSAMPLE (client-side) ─────────────── */
  const sampled = useMemo(() => {
    if (!rawData) return null;
    if (rawData.length <= MAX_POINTS) return rawData;

    const factor = Math.ceil(rawData.length / MAX_POINTS);
    return rawData.filter((_, idx) => idx % factor === 0);
  }, [rawData]);

  /* ────────────────── CHART DATA SHAPE ───────────────────── */
  const chartData = useMemo(() => {
    if (!sampled) return null;

    return {
      labels: sampled.map((_, i) => `Point ${i + 1}`),
      datasets: [
        {
          label: 'Column 1',
          data: sampled.map((row) => row.one),
          borderColor: 'red',
          borderWidth: 1,
        },
        {
          label: 'Column 2',
          data: sampled.map((row) => row.two),
          borderColor: 'green',
          borderWidth: 1,
        },
        {
          label: 'Column 3',
          data: sampled.map((row) => row.three),
          borderColor: 'blue',
          borderWidth: 1,
        },
      ],
    };
  }, [sampled]);

  /* ────────────────────── OPTIONS ────────────────────────── */
  const options = useMemo(
    () => ({
      responsive: true,
      animation: false,
      interaction: {mode: 'index', intersect: false},
      elements: {point: {radius: 0}}, // hide individual dots for speed
      scales: {
        x: {display: false}, // hide labels if you only need the line
      },
    }),
    []
  );

  /* ───────────────────────── UI ──────────────────────────── */
  return (
    <div>
      <h1>Data Visualization</h1>

      {chartData ? (
        <Line data={chartData} options={options}/>
      ) : (
        <div
          style={{
            width: 1000,
            height: 600,
            background:
              'linear-gradient(90deg,#eee 25%,#ddd 37%,#eee 63%)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
}

export default ChartPage;
