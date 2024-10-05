import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, List, ListItem, ListItemText, IconButton, Button, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { searchTracks, YouTubeTrack } from '../services/youtubeService';
import { createPlaylist, addTrackToPlaylist, getPlaylists, Playlist } from '../services/playlistService';

const MusicPlayerScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<YouTubeTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<YouTubeTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      const userPlaylists = await getPlaylists();
      setPlaylists(userPlaylists);
    } catch (error) {
      console.error('Error loading playlists:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const results = await searchTracks(searchQuery);
      setTracks(results);
    } catch (error) {
      console.error('Error searching tracks:', error);
    }
  };

  const playTrack = (track: YouTubeTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // In a web environment, you would typically use an HTML5 audio element or a library like Howler.js
    // to actually play the audio. For this example, we'll just update the UI state.
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Implement actual play/pause functionality here
  };

  const nextTrack = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      if (currentIndex < tracks.length - 1) {
        playTrack(tracks[currentIndex + 1]);
      }
    }
  };

  const previousTrack = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      if (currentIndex > 0) {
        playTrack(tracks[currentIndex - 1]);
      }
    }
  };

  const createNewPlaylist = async () => {
    try {
      const playlistName = 'New Playlist'; // You can prompt the user for a name
      await createPlaylist(playlistName);
      loadPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const addToPlaylist = async (playlistId: string, track: YouTubeTrack) => {
    try {
      await addTrackToPlaylist(playlistId, track);
      loadPlaylists();
    } catch (error) {
      console.error('Error adding track to playlist:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Music Player
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for music"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        sx={{ mb: 2 }}
      />
      
      {currentTrack && (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <img src={currentTrack.thumbnail} alt="Album cover" style={{ width: 200, height: 200, marginBottom: 10 }} />
          <Typography variant="h6">{currentTrack.title}</Typography>
          <Typography variant="subtitle1">{currentTrack.artist}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <IconButton onClick={previousTrack}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={togglePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={nextTrack}>
              <SkipNextIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      <List>
        {tracks.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton edge="end" aria-label="add to playlist" onClick={() => {
                if (playlists.length > 0) {
                  addToPlaylist(playlists[0].id, item);
                }
              }}>
                <PlaylistAddIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={item.title}
              secondary={item.artist}
              onClick={() => playTrack(item)}
            />
          </ListItem>
        ))}
      </List>

      <Button variant="contained" onClick={createNewPlaylist} sx={{ mt: 2 }}>
        Create New Playlist
      </Button>
    </Container>
  );
};

export default MusicPlayerScreen;