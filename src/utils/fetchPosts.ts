import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { Post } from '../types';

export const fetchPosts = async (): Promise<Post[]> => {
  const netState = await NetInfo.fetch();

  if (netState.isConnected) {
    try {
      const response = await fetch('https://jsonplaceholder.org/posts');
      const json = await response.json();
      await AsyncStorage.setItem('posts', JSON.stringify(json));
      return json;
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch posts.');
    }
  } else {
    Alert.alert('Offline', 'You are offline. Showing cached data.');
  }

  const cached = await AsyncStorage.getItem('posts');
  return cached ? JSON.parse(cached) : [];
};