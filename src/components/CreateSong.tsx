/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createSongRequest } from '../redux/slices/songSlices';
import GenreDropdown from './DropDown'; // Adjust the path if needed

// Styled components
const Container = styled.div<{ marginTop?: string }>`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;
  margin-top: ${(props) => props.marginTop || '0'}; /* Default to 0 if no prop is provided */
`;
const Form = styled.form`
  display: flex;
  flex-direction: column; /* Align items vertically */
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  height: 2.5rem; /* Adjust the height */
`;

const Button = styled.button`
  background-color: #61dafb;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4fa3c1;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const DropdownWrapper = styled.div`
  display: flex;
  height: 3rem;
  flex-direction: column;
  width: 100%;

  
  select { /* Apply styling to the dropdown */
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    height: 2.5rem; /* Match the height of the input fields */
    width: 100%;
  }
`;

// Type for song creation
interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const CreateSongForm: React.FC = () => {
  const dispatch = useDispatch();
  const [newSong, setNewSong] = useState<Song>({ title: '', artist: '', album: '', genre: '' });
  const [formError, setFormError] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, artist, album, genre } = newSong;

    if (!title || !artist || !album || !genre) {
      setFormError('All fields are required.');
      return;
    }

    dispatch(createSongRequest({ title, artist, album, genre, _id: '' }));
    setNewSong({ title: '', artist: '', album: '', genre: '' });
    setFormError(null);
  };

  return (
    <Container marginTop="5rem">
      <h2>Create New Song</h2>
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
      <Form onSubmit={handleCreate}>
        <Input
          type="text"
          placeholder="Title"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Artist"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Album"
          value={newSong.album}
          onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
        />
        <DropdownWrapper>
          <GenreDropdown
            genre={newSong.genre}
            setGenre={(genre) => setNewSong({ ...newSong, genre })}
          />
        </DropdownWrapper>
        <Button type="submit">Create Song</Button>
      </Form>
    </Container>
  );
};

export default CreateSongForm;
