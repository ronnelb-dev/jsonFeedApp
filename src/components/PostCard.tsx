import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Post } from '../types';
import HighlightedText from './HighlightedText';

interface Props {
  item: Post;
  onPress: () => void;
  searchQuery: string;
}

const PostCard: React.FC<Props> = ({ item, onPress, searchQuery }) => (
  <View style={styles.card}>
    <HighlightedText text={item.title} highlight={searchQuery} />
    <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    <Text style={{ marginBottom: 10 }} numberOfLines={3}>
      {item.content}
    </Text>
    <View style={{ alignItems: 'center', marginTop: 8 }}>
      <Button title="View More" color="#1AA7EC" onPress={onPress} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    height: 180,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 8,
  },
});

export default React.memo(PostCard);