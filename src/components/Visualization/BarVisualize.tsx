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

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
        const response = await axios.get('http://localhost:5000/api/songs/stats');
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
    return <div>Loading visualization data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Music Library Overview</h2>
      <Bar data={data} options={options} />
    </div>
   
  );
};

export default Visualize;
