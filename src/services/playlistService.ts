import { db, auth } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { YouTubeTrack } from './youtubeService';

export interface Playlist {
  id: string;
  name: string;
  tracks: YouTubeTrack[];
}

export const createPlaylist = async (name: string): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const playlistRef = await addDoc(collection(db, 'playlists'), {
    userId: user.uid,
    name,
    tracks: [],
  });

  return playlistRef.id;
};

export const getPlaylists = async (): Promise<Playlist[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const playlistsQuery = query(collection(db, 'playlists'), where('userId', '==', user.uid));
  const querySnapshot = await getDocs(playlistsQuery);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Playlist));
};

export const addTrackToPlaylist = async (playlistId: string, track: YouTubeTrack): Promise<void> => {
  const playlistRef = doc(db, 'playlists', playlistId);
  await updateDoc(playlistRef, {
    tracks: [...(await getPlaylistTracks(playlistId)), track],
  });
};

export const removeTrackFromPlaylist = async (playlistId: string, trackId: string): Promise<void> => {
  const playlistRef = doc(db, 'playlists', playlistId);
  const currentTracks = await getPlaylistTracks(playlistId);
  await updateDoc(playlistRef, {
    tracks: currentTracks.filter(track => track.id !== trackId),
  });
};

export const getPlaylistTracks = async (playlistId: string): Promise<YouTubeTrack[]> => {
  const playlistRef = doc(db, 'playlists', playlistId);
  const playlistDoc = await getDocs(playlistRef);
  return playlistDoc.data()?.tracks || [];
};

export const deletePlaylist = async (playlistId: string): Promise<void> => {
  await deleteDoc(doc(db, 'playlists', playlistId));
};