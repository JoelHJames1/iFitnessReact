import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './redux/store';
import theme from './theme';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
import MealPlanScreen from './screens/MealPlanScreen';
import MusicPlayerScreen from './screens/MusicPlayerScreen';
import WorkoutVideosScreen from './screens/WorkoutVideosScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import SocialScreen from './screens/SocialScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import MessagingScreen from './screens/MessagingScreen';

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/dashboard" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/meal-plan" element={<MealPlanScreen />} />
            <Route path="/music-player" element={<MusicPlayerScreen />} />
            <Route path="/workout-videos" element={<WorkoutVideosScreen />} />
            <Route path="/video-player/:videoId" element={<VideoPlayerScreen />} />
            <Route path="/social" element={<SocialScreen />} />
            <Route path="/subscription" element={<SubscriptionScreen />} />
            <Route path="/messaging" element={<MessagingScreen />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;