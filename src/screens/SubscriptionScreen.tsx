import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getUserSubscription, updateUserSubscription } from '../services/subscriptionService';

const SubscriptionScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (user) {
      loadSubscription();
    }
  }, [user]);

  const loadSubscription = async () => {
    const userSubscription = await getUserSubscription(user.uid);
    setSubscription(userSubscription);
  };

  const handleSubscribe = async (type: string, price: number) => {
    await updateUserSubscription(user.uid, type, price);
    loadSubscription();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Subscription Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">User Subscription</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                $1.99/month
              </Typography>
              <Typography variant="body2">
                Access to AI-generated meal plans and workout tracking
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleSubscribe('user', 1.99)}
                disabled={subscription?.type === 'user'}
              >
                {subscription?.type === 'user' ? 'Current Plan' : 'Subscribe'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Trainer Subscription</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                $9.99/month
              </Typography>
              <Typography variant="body2">
                Ability to manage clients and customize meal plans
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => handleSubscribe('trainer', 9.99)}
                disabled={subscription?.type === 'trainer'}
              >
                {subscription?.type === 'trainer' ? 'Current Plan' : 'Subscribe'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {subscription && (
        <Typography variant="body1" sx={{ mt: 4 }}>
          Current Subscription: {subscription.type} - ${subscription.price}/month
        </Typography>
      )}
    </Container>
  );
};

export default SubscriptionScreen;