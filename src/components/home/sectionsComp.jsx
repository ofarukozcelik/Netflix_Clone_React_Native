import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import SectionHeader from './SectionHeader';
import { useSelector } from 'react-redux';
import MovieCard from './movieCard';

const SectionsComp = (props) => {
  const { item } = props;

  const {
    topRatedMovies,
    popularMovies,
    upcominMovies,
    nowPlayingMovies,
    trendingMovies,
  } = useSelector((state) => state.movieStore);

  const renderData = () => {
    switch (item.value) {
      case 'top_rated':
        return topRatedMovies || [];
      case 'popular':
        return popularMovies || [];
      case 'now_playing':
        return nowPlayingMovies ? [...nowPlayingMovies].reverse() : [];
      case 'upcoming':
        return upcominMovies || [];
      case 'trending':
        return trendingMovies ? [...trendingMovies].reverse() : [];
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      <SectionHeader title={item.title} value={item.value} />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={renderData()}
        keyExtractor={(movie) => movie.id?.toString() || Math.random().toString()} // id varsa kullan yoksa fallback
        renderItem={({ item }) => <MovieCard item={item} />}
      />
    </View>
  );
};

export default SectionsComp;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
});
