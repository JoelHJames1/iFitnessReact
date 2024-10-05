import { db } from '../firebase/config';
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';

export const sendMessage = async (senderId: string, receiverId: string, text: string) => {
  await addDoc(collection(db, 'messages'), {
    senderId,
    receiverId,
    text,
    timestamp: new Date()
  });
};

export const getMessages = async (userId1: string, userId2: string) => {
  const q = query(
    collection(db, 'messages'),
    where('senderId', 'in', [userId1, userId2]),
    where('receiverId', 'in', [userId1, userId2]),
    orderBy('timestamp', 'asc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};