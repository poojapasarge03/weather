import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import '../styles/HistoricalTimeSeries.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoricalTimeSeries = ({ onFetchTimeSeries, timeSeriesData, loading }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFetch = () => {
    if (startDate && endDate) {
      onFetchTimeSeries(startDate, endDate);
    }
  };

  const prepareChartData = () => {
    if (!timeSeriesData?.historical) return null;

    const dates = Object.keys(timeSeriesData.historical);
    const temps = dates.map(date => timeSeriesData.historical[date].avgtemp);
    const maxTemps = dates.map(date => timeSeriesData.historical[date].maxtemp);
    const minTemps = dates.map(date => timeSeriesData.historical[date].mintemp);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Average Temperature',
          data: temps,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Max Temperature',
          data: maxTemps,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'Min Temperature',
          data: minTemps,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Temperature Time Series' }
    }
  };

  return (
    <div className="time-series-section">
      <div className="time-series-controls">
        <h3>Historical Time-Series</h3>
        <div className="controls">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </label>
          <button onClick={handleFetch} disabled={loading || !startDate || !endDate}>
            {loading ? 'Loading...' : 'Get Time Series'}
          </button>
        </div>
      </div>

      {timeSeriesData && timeSeriesData.historical && (
        <>
          <div className="chart-container">
            <Line data={prepareChartData()} options={chartOptions} />
          </div>

          <div className="time-series-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Avg Temp (°C)</th>
                  <th>Max Temp (°C)</th>
                  <th>Min Temp (°C)</th>
                  <th>Humidity (%)</th>
                  <th>Wind (km/h)</th>
                  <th>Precip (mm)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(timeSeriesData.historical).map(([date, data]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{data.avgtemp}</td>
                    <td>{data.maxtemp}</td>
                    <td>{data.mintemp}</td>
                    <td>{data.avghumidity}</td>
                    <td>{data.maxwind_speed}</td>
                    <td>{data.totalprecip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoricalTimeSeries;
