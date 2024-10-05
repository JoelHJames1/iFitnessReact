import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Avatar, Box, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearUser } from '../redux/slices/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
            {user?.email?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4" gutterBottom>
            {user?.email}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          {/* Add more user information here */}
          <Typography variant="body1">Email: {user?.email}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Fitness Goals
          </Typography>
          {/* Add fitness goals information here */}
          <Typography variant="body1">Goal: Weight Loss</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Achievements
          </Typography>
          {/* Add achievements information here */}
          <Typography variant="body1">Workouts Completed: 10</Typography>
        </Box>

        <Button variant="contained" color="secondary" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfileScreen;