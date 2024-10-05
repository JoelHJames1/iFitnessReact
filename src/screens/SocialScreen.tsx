import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, TextField, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getUserProfile, followUser, unfollowUser, getFollowers, getFollowing } from '../services/socialService';

const SocialScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (user) {
      loadFollowers();
      loadFollowing();
    }
  }, [user]);

  const loadFollowers = async () => {
    const followersList = await getFollowers(user.uid);
    setFollowers(followersList);
  };

  const loadFollowing = async () => {
    const followingList = await getFollowing(user.uid);
    setFollowing(followingList);
  };

  const handleSearch = async () => {
    // Implement user search functionality
  };

  const handleFollow = async (userId: string) => {
    await followUser(user.uid, userId);
    loadFollowing();
  };

  const handleUnfollow = async (userId: string) => {
    await unfollowUser(user.uid, userId);
    loadFollowing();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Social
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Followers ({followers.length})</Typography>
              {followers.map((follower) => (
                <Typography key={follower.id}>{follower.name}</Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Following ({following.length})</Typography>
              {following.map((followedUser) => (
                <Typography key={followedUser.id}>{followedUser.name}</Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SocialScreen;