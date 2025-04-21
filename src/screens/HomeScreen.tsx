import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Post, RootStackParamList} from '../types';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import {fetchPosts} from '../utils/fetchPosts';

const ITEMS_PER_LOAD = 10;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_LOAD);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const initializePosts = (data: Post[]) => {
    setPosts(data);
    setVisiblePosts(data.slice(0, ITEMS_PER_LOAD));
    setItemsToShow(ITEMS_PER_LOAD);
    setHasMore(data.length > ITEMS_PER_LOAD);
  };

  const loadData = async () => {
    setLoading(true);
    const data = await fetchPosts();
    initializePosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSearchQuery('');
    await loadData();
    setRefreshing(false);
  }, []);

  const loadMorePosts = () => {
    if (isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    setTimeout(() => {
      const nextCount = itemsToShow + ITEMS_PER_LOAD;
      setVisiblePosts(posts.slice(0, nextCount));
      setItemsToShow(nextCount);
      setHasMore(nextCount < posts.length);
      setIsFetchingMore(false);
    }, 800);
  };

  const filteredPosts = useMemo(
    () =>
      visiblePosts.filter(post =>
        post.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
      ),
    [visiblePosts, debouncedQuery],
  );

  const renderFooter = () =>
    isFetchingMore ? (
      <View style={{padding: 20}}>
        <ActivityIndicator size="small" color="#888" />
      </View>
    ) : null;

  const renderEmpty = () => (
    <View style={{alignItems: 'center', marginTop: 40}}>
      <Text style={{fontSize: 16, color: '#999'}}>
        {searchQuery
          ? `No results found for "${searchQuery}".`
          : 'No results found.'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <PostCard
            item={item}
            searchQuery={searchQuery}
            onPress={() => navigation.navigate('Detail', {post: item})}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading || refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
