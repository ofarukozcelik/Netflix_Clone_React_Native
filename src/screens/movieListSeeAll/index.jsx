import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import defaultStyle from '../../styles';
import HeaderComp from '../../components/ui/headerComp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { themeColors } from '../../themes/themeColors';
import { useSelector } from 'react-redux';
import SeeAllMovieCard from '../../components/home/seeAllMovieCard';

import categories from '../../widgets/widgets.json'; 

const MovieListScreen = ({ navigation }) => {
  const {
    topRatedMovies,
    popularMovies,
    upcominMovies,
    nowPlayingMovies,
    trendingMovies,
  } = useSelector(state => state.movieStore);


  const getMoviesByCategory = (value) => {
    switch (value) {
      case 'top_rated':
        return topRatedMovies || [];
      case 'popular':
        return popularMovies || [];
      case 'now_playing':
        return nowPlayingMovies || [];
      case 'upcoming':
        return upcominMovies || [];
      case 'trending':
        return trendingMovies || [];
      default:
        return [];
    }
  };

  return (
    <SafeAreaView style={defaultStyle.container}>
      <HeaderComp
        iconPosition="left"
        icon={
          <AntDesign
            name="arrowleft"
            size={30}
            color={themeColors.WHITE}
            onPress={() => navigation.goBack()}
          />
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {categories.map(category => {
          const movies = getMoviesByCategory(category.value);

          return (
            <View key={category.id} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.title}</Text>

              <FlatList
                data={movies}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <SeeAllMovieCard item={item} />}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: 15,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themeColors.WHITE,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
