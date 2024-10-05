import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, TextField } from '@mui/material';
import { searchWorkoutVideos, YouTubeVideo } from '../services/youtubeService';
import { Link } from 'react-router-dom';

const WorkoutVideosScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  const handleSearch = async () => {
    try {
      const results = await searchWorkoutVideos(searchQuery);
      setVideos(results);
    } catch (error) {
      console.error('Error searching videos:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Workout Videos
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search workout videos"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card>
              <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: 'auto' }} />
              <CardContent>
                <Typography variant="h6" component="div">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.channelTitle}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/video-player/${video.id}`} size="small">
                  Watch
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkoutVideosScreen;