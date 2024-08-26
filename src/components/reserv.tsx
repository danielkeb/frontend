/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux/store';
import { 
  fetchSongsRequest, 
  deleteSongRequest, 
  updateSongRequest 
} from '../redux/slices/songSlices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Define the Song interface to match your song object structure
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// Styled components (reuse the styled components from the original code)
const Container = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: auto;
`;

const SongListHeader = styled.h2`
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

const FilterInput = styled.input`
  flex: 1 1 200px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 1.2rem;
  margin: 0 0.5rem;

  &:hover {
    color: #61dafb;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const ModalButton = styled.button`
  background-color: #61dafb;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #4fa3c1;
  }
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [filterGenre, setFilterGenre] = useState<string>('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Selector to get the state from the Redux store
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);

  // Fetch songs when the component mounts
  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedSong?._id) {
      dispatch(deleteSongRequest(selectedSong._id));
      setShowDeleteModal(false);
      setSelectedSong(null);
    }
  };

  const handleUpdate = () => {
    if (selectedSong) {
      dispatch(updateSongRequest(selectedSong));
      setShowUpdateModal(false);
      setSelectedSong(null);
    }
  };

  const filteredSongs = songs.filter(song =>
    song.genre.toLowerCase().includes(filterGenre.toLowerCase())
  );

  return (
    <Container>
      <SongListHeader>Song List</SongListHeader>
      <FilterInput
        type="text"
        placeholder="Filter by Genre"
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

      {filteredSongs.map((song, index) => (
        <SongItem key={song._id} isEven={index % 2 === 0}>
          <div>{song.title}</div>
          <div>{song.artist}</div>
          <div>{song.album}</div>
          <div>{song.genre}</div>
          <div>
            <IconButton onClick={() => {
              setSelectedSong(song);
              setShowUpdateModal(true);
            }}>
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
            <IconButton onClick={() => {
              setSelectedSong(song);
              setShowDeleteModal(true);
            }}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </IconButton>
          </div>
        </SongItem>
      ))}

      {showUpdateModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Update Song</h3>
            {formError && <p style={{ color: 'red' }}>{formError}</p>}
<form onSubmit={(e) => {
  e.preventDefault();
  handleUpdate();
}}>
  <input
    type="text"
    placeholder="Title"
    value={selectedSong?.title || ''}
    onChange={(e) =>
      setSelectedSong((prevState) => prevState ? { ...prevState, title: e.target.value } : null)
    }
  />
  <input
    type="text"
    placeholder="Artist"
    value={selectedSong?.artist || ''}
    onChange={(e) =>
      setSelectedSong((prevState) => prevState ? { ...prevState, artist: e.target.value } : null)
    }
  />
  <input
    type="text"
    placeholder="Album"
    value={selectedSong?.album || ''}
    onChange={(e) =>
      setSelectedSong((prevState) => prevState ? { ...prevState, album: e.target.value } : null)
    }
  />
  <input
    type="text"
    placeholder="Genre"
    value={selectedSong?.genre || ''}
    onChange={(e) =>
      setSelectedSong((prevState) => prevState ? { ...prevState, genre: e.target.value } : null)
    }
  />
  <ModalButton type="submit">Update Song</ModalButton>
</form>


          </ModalContent>
        </ModalOverlay>
      )}

      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this song?</h3>
            <ModalButton onClick={handleDelete}>Yes, Delete</ModalButton>
            <ModalButton onClick={() => setShowDeleteModal(false)}>Cancel</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SongList;
