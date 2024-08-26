// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import SongList from './components/songList';
import CreateSongForm from './components/CreateSong';
import Display from './components/Visualization/Display';

function App() {
  return (
    <Router>

        <Nav />
        <Routes>
          <Route path="/" element={<SongList />} />
          
          <Route path="/create" element={<CreateSongForm />} />
          <Route path="/visualize" element={<Display />}/>
        
        </Routes>
     
    </Router>
  );
}

export default App;
