/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from 'styled-components';
import Visualize from './BarVisualize';
import GenrePieChart from './PieChart';

// Styled components for layout and styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const Display: React.FC = () => {
  return (
    <Container>
      <SectionTitle>Sample Data Visualization</SectionTitle>
      <ChartWrapper>
        <div style={{ flex: '1 1 45%', maxWidth: '100%' }}>
          <Visualize />
        </div>
        <div style={{ flex: '1 1 45%', maxWidth: '100%' }}>
          <GenrePieChart />
        </div>
      </ChartWrapper>
    </Container>
  );
};

export default Display;
