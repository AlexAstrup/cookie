import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
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

function ChartPage() {
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    fetch('/data/bdt')
      .then((response) => response.json())
      .then((data) => {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        setRawData(parsedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const chartData = useMemo(() => {
    if (!rawData) return null;
    return {
      labels: rawData.map((_, i) => `Point ${i + 1}`),
      datasets: [
        {
          label: 'Column 1',
          data: rawData.map((row) => row[0]),
          borderColor: 'red',
          borderWidth: 1,
        },
        {
          label: 'Column 2',
          data: rawData.map((row) => row[1]),
          borderColor: 'green',
          borderWidth: 1,
        },
        {
          label: 'Column 3',
          data: rawData.map((row) => row[2]),
          borderColor: 'blue',
          borderWidth: 1,
        },
      ],
    };
  }, [rawData]);

  const options = useMemo(() => ({
    responsive: false,
    animation: {
      duration: 0,
    },
  }), []);

  return (
    <div>
      <h1> Data Visualization </h1>
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
}

export default ChartPage;
