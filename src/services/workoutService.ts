import { db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

export const getWorkoutActivity = async (userId: string) => {
  const workoutsRef = collection(db, 'workouts');
  const q = query(
    workoutsRef,
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(30)
  );

  const querySnapshot = await getDocs(q);
  const workoutData = querySnapshot.docs.map(doc => ({
    date: doc.data().date.toDate().toLocaleDateString(),
    duration: doc.data().duration,
    calories: doc.data().caloriesBurned
  }));

  return workoutData;
};