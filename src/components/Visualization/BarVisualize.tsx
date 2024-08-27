/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import styled from '@emotion/styled';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Container = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Heading = styled.h2`
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LoadingMessage = styled.div`
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  color: red;
`;

const Visualize = () => {
  const [visualizationData, setVisualizationData] = useState({
    songCount: 0,
    artistCount: 0,
    genreCount: 0,
    albumCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://backend-a5rk.onrender.com/api/songs/stats');
        setVisualizationData({
          songCount: response.data.totalSongs,
          artistCount: response.data.totalArtists,
          genreCount: response.data.totalGenres,
          albumCount: response.data.totalAlbums,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch visualization data');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading visualization data...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const { songCount, artistCount, genreCount, albumCount } = visualizationData;

  const data = {
    labels: ['Songs', 'Artists', 'Genres', 'Albums'],
    datasets: [
      {
        label: 'Count',
        data: [songCount, artistCount, genreCount, albumCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,  // Explicitly specify the position type
        labels: {
          font: {
            size: 10,
          },
          color: '#333',
        },
      },
    },
  };

  return (
    <Container>
      <Heading>Music Library Overview</Heading>
      <Bar data={data} options={options} />
    </Container>
  );
};

export default Visualize;
