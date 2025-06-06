import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
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


function App() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/data")
            .then(response => response.json())
            .then(data => {
                // If the API response is a string, parse it into a usable array
                const parsedData = typeof data === "string" ? JSON.parse(data) : data;

                console.log("Corrected Data:", parsedData);

                setChartData({
                    labels: parsedData.map((_, i) => `Point ${i + 1}`),
                    datasets: [
                        {label: "Column 1", data: parsedData.map(row => row[0]), borderColor: "red", borderWidth: 2},
                        {label: "Column 2", data: parsedData.map(row => row[1]), borderColor: "green", borderWidth: 2},
                        {label: "Column 3", data: parsedData.map(row => row[2]), borderColor: "blue", borderWidth: 2},
                    ],
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);


    return (
        <div style={{textAlign: "center", padding: "20px"}}>
            <h1>Data Visualization</h1>
            {chartData ? <Line data={chartData}/> : <p>Loading...</p>}
        </div>
    );
}

export default App;