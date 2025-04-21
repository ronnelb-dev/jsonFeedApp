import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList } from '../types'
import moment from 'moment';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { post } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const formattedPublishedDate = moment(post.publishedAt, 'MM/DD/YYYY HH:mm:ss').format(
    'MMM D, YYYY • h:mm A',
  );
  const formattedUpdatedDate = moment(post.updatedAt, 'DD/MM/YYYY HH:mm:ss').format(
    'MMM D, YYYY • h:mm A',
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Image
          source={{ uri: post.image }}
          style={[styles.image, { width: screenWidth - 32 }]}
          resizeMode="cover"
        />
        <Text style={styles.content}>{post.content}</Text>

        <View style={styles.metaContainer}>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Published</Text>
            <Text style={styles.metaValue}>{formattedPublishedDate}</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Updated</Text>
            <Text style={styles.metaValue}>{formattedUpdatedDate}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  image: {
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  metaContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaBlock: {
    flex: 1,
    marginRight: 8,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 15,
    color: '#1A1A1A',
  },
});

export default DetailScreen;
