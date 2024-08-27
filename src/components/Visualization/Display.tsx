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
  padding: 3rem 1.5rem;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2.5rem;
  max-width: 1300px;
  width: 100%;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 2.5rem;
  color: #444;
  text-align: center;
  font-size: 2rem;
  letter-spacing: 0.5px;
`;

const ChartContainer = styled.div`
  flex: 1 1 45%;
  max-width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Display: React.FC = () => {
  return (
    <Container>
      <SectionTitle>Sample Data Visualization</SectionTitle>
      <ChartWrapper>
        <ChartContainer>
          <Visualize />
        </ChartContainer>
        <ChartContainer>
          <GenrePieChart />
        </ChartContainer>
      </ChartWrapper>
    </Container>
  );
};

export default Display;
