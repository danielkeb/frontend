/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  flex: 1 1 200px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const GenreDropdown: React.FC<{ genre: string; setGenre: (genre: string) => void }> = ({ genre, setGenre }) => {
  const genres = [
    'Ambasel','Anchiwoye','Pop', 'Rock', 'Jazz', 'Classical', 'Electronic', 'Country', 'Reggae', 'Blues', 'Metal'
  ];

  return (
    <Select
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
    >
      <option value="">Select Genre</option>
      {genres.map((g) => (
        <option key={g} value={g}>{g}</option>
      ))}
    </Select>
  );
};

export default GenreDropdown;
