/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux/store';
import { 
  fetchSongsRequest, 
  deleteSongRequest, 
  updateSongRequest, 
  createSongRequest 
} from '../redux/slices/songSlices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import GenreDropdown from './DropDown'; // Adjust the path if needed

// Styled components
const Container = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  margin: 2rem auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SongListHeader = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  font-size: 2rem;
  letter-spacing: 0.5px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1 1 200px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    outline: none;
  }
`;

const FilterInput = styled(Input)`
  flex: 1 1 300px;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background-color: #61dafb;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #4fa3c1;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 0.9rem;
  text-align: center;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1fr 1fr;
  font-weight: bold;
  padding: 1rem;
  background-color: #e0e0e0;
  border-bottom: 1px solid #ddd;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "title artist"
      "album genre"
      "actions actions";
  }
`;

const SongItem = styled.div<{ isEven: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1fr 1fr;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => (props.isEven ? '#f9f9f9' : '#fff')};
  border-bottom: 1px solid #ddd;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "title artist"
      "album genre"
      "actions actions";
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 1.2rem;
  margin: 0 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #61dafb;
  }
`;

// Type for song creation
interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const [newSong, setNewSong] = useState<Song>({ title: '', artist: '', album: '', genre: '' });
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filterGenre, setFilterGenre] = useState<string>('');
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);

  // Fetch songs when the component mounts
  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSongRequest(id));
      setSuccessMessage('Song deleted successfully.');
    }
  };

  const handleUpdate = (id: string) => {
    const songToUpdate = songs.find(song => song._id === id);
    if (songToUpdate) {
      setNewSong(songToUpdate);
      setSelectedSongId(id);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, artist, album, genre } = newSong;

    if (!title || !artist || !album || !genre) {
      setFormError('All fields are required.');
      setSuccessMessage(null); // Clear success message if there's an error
      return;
    }

    if (selectedSongId) {
      dispatch(updateSongRequest({ ...newSong, _id: selectedSongId }));
      setSuccessMessage('Song updated successfully.');
      setSelectedSongId(null); // Clear the selected song ID after update
    } else {
      dispatch(createSongRequest({ title, artist, album, genre, _id: '' }));
      setSuccessMessage('Song created successfully.');
    }

    setNewSong({ title: '', artist: '', album: '', genre: '' });
    setFormError(null); // Clear the error after successful submission
  };

  const filteredSongs = songs.filter(song => 
    song.genre.toLowerCase().includes(filterGenre.toLowerCase())
  );

  return (
    <Container >
      <SongListHeader>Music Management</SongListHeader>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
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
        <GenreDropdown
          genre={newSong.genre}
          setGenre={(genre) => setNewSong({ ...newSong, genre })}
        />
        <Button type="submit">{selectedSongId ? 'Update Song' : 'Create Song'}</Button>
      </Form>
      <FilterInput
        type="text"
        placeholder="Filter by genre"
        value={filterGenre}
        onChange={(e) => setFilterGenre(e.target.value)}
      />
      <HeaderRow>
        <div>Title</div>
        <div>Artist</div>
        <div>Album</div>
        <div>Genre</div>
        <div>Actions</div>
      </HeaderRow>
      <div>
        {filteredSongs.map((song, index) => (
          <SongItem key={song._id} isEven={index % 2 === 0}>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            <div>{song.album}</div>
            <div>{song.genre}</div>
            <div>
              <IconButton onClick={() => handleUpdate(song._id)}>
                <FontAwesomeIcon icon={faEdit} />
              </IconButton>
              <IconButton onClick={() => handleDelete(song._id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </IconButton>
            </div>
          </SongItem>
        ))}
      </div>
    </Container>
  );
};

export default SongList;
