import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getWorkoutActivity } from '../services/workoutService';
import { getUserSubscription } from '../services/subscriptionService';

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [workoutData, setWorkoutData] = useState([]);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const activity = await getWorkoutActivity(user.uid);
        setWorkoutData(activity);
        const userSubscription = await getUserSubscription(user.uid);
        setSubscription(userSubscription);
      }
    };
    fetchData();
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName || user?.email}!
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Workout Activity
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="duration" stroke="#8884d8" name="Duration (minutes)" />
                    <Line type="monotone" dataKey="calories" stroke="#82ca9d" name="Calories Burned" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Subscription Status
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {subscription ? `${subscription.type} - $${subscription.price}/month` : 'No active subscription'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/subscription" size="small">Manage Subscription</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Daily Workout
              </Typography>
              <Typography variant="body2">
                Your personalized workout plan for today.
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/workout-videos" size="small">Start Workout</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Meal Plan
              </Typography>
              <Typography variant="body2">
                View your AI-generated meal plan.
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/meal-plan" size="small">View Plan</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Social
              </Typography>
              <Typography variant="body2">
                Connect with other fitness enthusiasts.
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/social" size="small">View Social Feed</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Button component={Link} to="/profile" variant="contained" sx={{ mt: 4 }}>
        View Profile
      </Button>
    </Container>
  );
};

export default HomeScreen;