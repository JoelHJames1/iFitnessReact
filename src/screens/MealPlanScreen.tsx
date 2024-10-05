import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Grid } from '@mui/material';
import { generateMealPlan, MealPlan } from '../services/mealPlanService';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const MealPlanScreen = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchMealPlan();
  }, []);

  const fetchMealPlan = async () => {
    setLoading(true);
    try {
      // In a real app, you'd get these values from the user's profile
      const userProfile = {
        weight: 70, // kg
        height: 175, // cm
        age: 30,
        gender: 'male' as const,
        activityLevel: 'moderatelyActive' as const,
        goal: 'maintenance' as const,
      };
      const plan = await generateMealPlan(userProfile);
      setMealPlan(plan);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      // Handle error (show error message to user)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Your Monthly Meal Plan</Typography>
      <Grid container spacing={3}>
        {mealPlan.map((day, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">Day {index + 1} - {day.date}</Typography>
                {day.meals.map((meal, mealIndex) => (
                  <div key={mealIndex}>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>{meal.name}</Typography>
                    {meal.foods.map((food, foodIndex) => (
                      <Typography key={foodIndex} variant="body2">
                        {food.name} - {food.calories} calories
                      </Typography>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={fetchMealPlan} sx={{ mt: 4 }}>
        Refresh Meal Plan
      </Button>
    </Container>
  );
};

export default MealPlanScreen;