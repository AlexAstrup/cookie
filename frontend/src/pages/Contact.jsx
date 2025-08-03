import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';


function Contact() {
// State for selected items
  const [selectedGeography, setSelectedGeography] = useState('Geo 0');
  const [selectedStore, setSelectedStore] = useState('Store 1');

  // Sample data for dropdowns and charts (replace these with your data)
  const geographies = ['Geo 1', 'Geo 2', 'Geo 3'];
  const stores = ['Store 1', 'Store 2', 'Store 3'];

  const sampleData1 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Scorecard Data',
        data: [20, 45, 28, 80, 99],
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: false,
      },
    ],
  };

  const sampleData2 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Propensity',
        data: [50, 10, 40, 95, 85],
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: false,
      },
    ],
  };

  // Chart options can be extended as needed
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div id="app-container" className="container">
      {/* Left Column */}
      <div id="left_column" className="leftColumn">
        {/* Geo Section */}
        <div id="Geo">
          <div id="geography-intro">
            <h3>Propensity</h3>
            <p>
              As part of the modelling of interactions, We need a selection on geographies to be able to do something
              fun. Therefore you can here select a geography to view.
            </p>
            <b>Please select a Geography to view:</b>
          </div>
          <div id="drop-down-geography" className="dropdownContainer">
            <select
              value={selectedGeography}
              onChange={(e) => setSelectedGeography(e.target.value)}
              className="select"
            >
              {geographies.map((geography, index) => (
                <option key={index} value={geography}>
                  {geography}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Store Section */}
        <div id="Store" className="section storeSection">
          <div id="store-intro">
            <b>Please select a Store:</b>
          </div>
          <div id="drop-down-store" className="dropdownContainer">
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="select"
            >
              {stores.map((store, index) => (
                <option key={index} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div id="right-column" className="rightColumn">
        <b className="boldHeader">Scorecard</b>
        <hr className="hr"/>
        <div id="scorecard" className="scorecard">
          {/* Left Scorecard */}
          <div id="right-scorecard" className="rightScorecard">
          </div>
          {/* Right Scorecard (Chart) */}
          <div id="right-scorecard" className="rightScorecard">
            <div className="chartContainer">
              <Line data={sampleData1} options={chartOptions}/>
            </div>
          </div>
        </div>
        <hr className="hr"/>
        <b className="boldHeader">Estimated Variable</b>
        <hr className="hr"/>
        <div className="largeChartContainer">
          <Line data={sampleData2} options={chartOptions}/>
        </div>
      </div>
    </div>
  );
}

export default Contact;
