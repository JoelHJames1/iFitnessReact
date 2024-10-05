import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const getUserSubscription = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.subscription || null;
  }

  return null;
};

export const updateUserSubscription = async (userId: string, subscriptionType: string, price: number) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    subscription: {
      type: subscriptionType,
      price: price,
      startDate: new Date()
    }
  });
};