import { db } from '../firebase/config';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from 'firebase/firestore';

export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data();
  }

  return null;
};

export const followUser = async (currentUserId: string, userToFollowId: string) => {
  const currentUserRef = doc(db, 'users', currentUserId);
  const userToFollowRef = doc(db, 'users', userToFollowId);

  await updateDoc(currentUserRef, {
    following: arrayUnion(userToFollowId)
  });

  await updateDoc(userToFollowRef, {
    followers: arrayUnion(currentUserId)
  });
};

export const unfollowUser = async (currentUserId: string, userToUnfollowId: string) => {
  const currentUserRef = doc(db, 'users', currentUserId);
  const userToUnfollowRef = doc(db, 'users', userToUnfollowId);

  await updateDoc(currentUserRef, {
    following: arrayRemove(userToUnfollowId)
  });

  await updateDoc(userToUnfollowRef, {
    followers: arrayRemove(currentUserId)
  });
};

export const getFollowers = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const followers = userDoc.data().followers || [];
    return Promise.all(followers.map(getUserProfile));
  }

  return [];
};

export const getFollowing = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const following = userDoc.data().following || [];
    return Promise.all(following.map(getUserProfile));
  }

  return [];
};