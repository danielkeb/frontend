/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styled from 'styled-components';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Styled component for the container
const ChartContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Heading = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: red;
`;

const GenrePieChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await axios.get('https://backend-a5rk.onrender.com/api/songs/genre');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
        setError('Failed to fetch pie chart data');
      }
    };

    fetchPieData();
  }, []);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!data) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A',
          '#46BF91', '#FDB45C', '#949FB1', '#F67019', '#FFFF99',
          '#9B59B6',
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A',
          '#46BF91', '#FDB45C', '#949FB1', '#F67019', '#FFFF99',
          '#9B59B6',
        ],
      },
    ],
  };

  return (
    <ChartContainer>
      <Heading>Genre Distribution</Heading>
      <Pie data={chartData} />
    </ChartContainer>
  );
};

export default GenrePieChart;
