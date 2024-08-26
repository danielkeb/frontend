/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styled from 'styled-components';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Styled component
const ChartContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GenrePieChart: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Fetch pie chart data from your API
    const fetchPieData = async () => {
      try {
        const response = await axios.get('https://backend-a5rk.onrender.com:10000/api/songs/genre');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchPieData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  // Data for the pie chart
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A',
          '#46BF91', '#FDB45C', '#949FB1', '#F67019', '#FFFF99',
          '#9B59B6'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A',
          '#46BF91', '#FDB45C', '#949FB1', '#F67019', '#FFFF99',
          '#9B59B6'
        ],
      },
    ],
  };

  return (
    <ChartContainer>
      <h3>Genre Distribution</h3>
      <Pie data={chartData} />
    </ChartContainer>
  );
};

export default GenrePieChart;
