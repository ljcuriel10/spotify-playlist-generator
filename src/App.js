import Header from "./Header";
import './App.css'
import Search from "./Search";
import SearchResults from "./SearchResults";
import PlaylistGen from "./PlaylistGen";
import Spotify from "./utils/Spotify";
import React, { useEffect, useState } from "react";


function App() {
  const accessToken = localStorage.getItem('access_token');
  const [ profile, setProfile ] = useState([]);
  const [ tracks, setTracks ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ playlist, setPlaylist ] = useState([]);
  const [ isPlaylist, setIsPlaylist ] = useState(true);
  const [ playlistName, setPlaylistName ] = useState('')

  
  useEffect(() => {
    const getProfile = async () => {
     const response = await Spotify.fetchProfile(accessToken)
     setProfile(response);
     return;
    };

    const getTracks = async () => {
      const response = await Spotify.search(accessToken, searchTerm);
      setTracks(response);
      return
    }

    const getPlaylists = async () => {
      const response = await Spotify.getPlaylists(accessToken)
    }
    getProfile();
    getTracks();
    getPlaylists();
    
  }, [accessToken, searchTerm]);

  const onAddHandler = (artist, name, img, id, uri) => {
    setPlaylist((prev) => [...prev, {artist: artist, name: name, imgUrl: img, id:id, uri:uri}])
  }

  const onDeleteHandler = (id) => {
    console.log(id)
    setPlaylist((prev) => prev.filter(currentTrack => currentTrack.id !== id));
  }

  const onCreateHandler = (e) => {
    e.preventDefault();
    const trackUris = playlist.map( track => track.uri);
    Spotify.createPlaylist(accessToken, profile.id, playlistName, trackUris);
    setPlaylist([]);
    setPlaylistName('');
  }
  
  return (
    <div className="min-vh-100" id="app">
      <Header username={profile.display_name} />
      <Search term={searchTerm} setTerm={setSearchTerm} />
      <div className="container">
        <div className="row">
          <SearchResults setIsPlaylist={setIsPlaylist} isPlaylist={true} tracks={tracks} onAdd={onAddHandler} />
          <PlaylistGen playlist={playlist} onDelete={onDeleteHandler} onCreate={onCreateHandler} playlistName={playlistName} setPlaylistName={setPlaylistName} />
        </div>
      </div>
    </div>
  );
}

export default App;
