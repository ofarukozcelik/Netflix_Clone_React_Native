import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComp from '../../components/ui/headerComp';
import MovieCard from '../../components/home/movieCard';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { getCastDetails, getMovieDetail, getSimilarMovies } from '../../store/actions/movieActions';
import { IMG_URL } from '../../services/urls';
import { PERSON_DETAILS } from '../../utils/routes';
import { height, width } from '../../utils/constants';
import { themeColors } from '../../themes/themeColors';

const MovieDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { movieId } = route?.params;

  const { movieDetailData, pending, castDetails, similarMovies } = useSelector(
    (state) => state.movieStore,
  );
  const isMovieDetailPending = pending?.movieDetail;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;
    dispatch(getMovieDetail({ movieId }));
    dispatch(getCastDetails({ movieId }));
    dispatch(getSimilarMovies({ movieId }));
  }, [movieId, dispatch]);

  const formatedVoteAverage = movieDetailData?.vote_average?.toFixed(1) || '0.0';
  const formatedReleaseDate = movieDetailData?.release_date?.slice(0, 4) || null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <HeaderComp
        iconPosition="left"
        icon={<AntDesign name="arrowleft" size={28} color={themeColors.WHITE} />}
        onPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {isMovieDetailPending ? (
          <ActivityIndicator size="large" color={themeColors.WHITE} style={{ marginTop: 30 }} />
        ) : (
          <>
            <Image
              source={{ uri: `${IMG_URL}${movieDetailData?.backdrop_path}` }}
              style={styles.imgCard}
            />

            <View style={styles.voteContainer}>
              <Text style={styles.vote}>{formatedVoteAverage}</Text>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{movieDetailData?.title}</Text>
              <View style={styles.releaseDateContainer}>
                <Text style={styles.releaseDate}>Released: {formatedReleaseDate}</Text>
                <Text style={styles.releaseDate}>Time: {movieDetailData?.runtime} min</Text>
              </View>
              <Text style={styles.overview}>{movieDetailData?.overview}</Text>
            </View>

            <Section title="Genres" data={movieDetailData?.genres || []} />
            <Section title="Languages" data={movieDetailData?.spoken_languages || []} />

            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.subtitles}>Top Cast</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={castDetails || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.actorCard}
                    onPress={() =>
                      navigation.navigate(PERSON_DETAILS, { personId: item.id })
                    }
                  >
                    <Image
                      source={
                        item.profile_path
                          ? { uri: `${IMG_URL}${item.profile_path}` }
                          : require('../../assets/images/noImage.png')
                      }
                      style={styles.castImage}
                    />
                    <Text numberOfLines={1} style={styles.companyName}>
                      {item.name}
                    </Text>
                  </Pressable>
                )}
              />
            </View>

            <Section title="Production Companies">
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={movieDetailData?.production_companies || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.companies}>
                    <Image
                      source={
                        item.logo_path
                          ? { uri: `${IMG_URL}${item.logo_path}` }
                          : require('../../assets/images/defaultlogo.jpg')
                      }
                      style={{
                        width: 90,
                        height: 50,
                        resizeMode: 'contain',
                        backgroundColor: themeColors.WHITE,
                        borderRadius: 10,
                        marginLeft: 10,
                        marginTop: 5,
                      }}
                    />
                    <Text numberOfLines={2} style={styles.companyName}>
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            </Section>

            <Section title="Production Countries" data={movieDetailData?.production_countries || []} />

            <View style={styles.similarContainer}>
              <Text style={styles.subtitles}>Similar Movies</Text>
              <FlatList
                data={similarMovies || []}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <MovieCard item={item} />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

// Reusable Section Component
const Section = ({ title, data, children }) => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text style={styles.subtitles}>{title}</Text>
      {children ? (
        children
      ) : (
        <FlatList
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.languageName}>{item.name}</Text>
              {index !== data.length - 1 && (
                <Text style={styles.languageNamedot}>•</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  imgCard: {
    width: width * 0.9,
    height: height * 0.4,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 10,
  },
  voteContainer: {
    position: 'absolute',
    top: 5,
    right: 25,
    backgroundColor: themeColors.RED,
    padding: 10,
    borderRadius: 8,
  },
  vote: {
    fontSize: 18,
    color: themeColors.WHITE,
    fontWeight: 'bold',
  },
  titleContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: themeColors.WHITE,
    textAlign: 'center',
  },
  releaseDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  releaseDate: {
    fontSize: 16,
    color: themeColors.WHITE,
    backgroundColor: themeColors.DARK_GRAY,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  overview: {
    fontSize: 16,
    color: themeColors.WHITE,
    textAlign: 'justify',
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  subtitles: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.WHITE,
    marginTop: 20,
    marginBottom: 10,
  },
  languageName: {
    fontSize: 14,
    color: themeColors.WHITE,
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: themeColors.DARK_GRAY,
    borderRadius: 5,
  },
  languageNamedot: {
    fontSize: 20,
    color: themeColors.GRAY,
    marginHorizontal: 2,
  },
  actorCard: {
    alignItems: 'center',
    marginRight: 10,
  },
  castImage: {
    width: 100,
    height: 140,
    borderRadius: 10,
  },
  companyName: {
    fontSize: 14,
    color: themeColors.WHITE,
    textAlign: 'center',
    width: 90,
    marginTop: 5,
  },
  companies: {
    alignItems: 'center',
    marginRight: 10,
  },
  similarContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 30,
  },
});
