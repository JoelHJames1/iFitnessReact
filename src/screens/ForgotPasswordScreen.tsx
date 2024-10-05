import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Check your inbox.');
      setTimeout(() => navigate('/'), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage('Error sending reset email. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 3 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Reset Email
          </Button>
          {message && (
            <Typography color={message.includes('Error') ? 'error' : 'primary'} align="center">
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordScreen;