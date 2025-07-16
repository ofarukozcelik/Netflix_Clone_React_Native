import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import defaultStyle from '../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {getUpComingMovies} from '../../store/actions/movieActions';
import {themeColors} from '../../themes/themeColors';
import NewHotComp from '../../components/newHot/newHotComp';

const NewHotScreen = () => {
  const dispatch = useDispatch();
  const {upcominMovies, pending} = useSelector(state => state.movieStore);
  const isUpcomingPending = pending.upcoming;

  useEffect(() => {
    dispatch(getUpComingMovies());
  }, []);

  return (
    <SafeAreaView style={[defaultStyle.detailScreenstyle, {backgroundColor: '#000'}]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Text style={styles.title}>NEW & HOT</Text>

      {isUpcomingPending ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={themeColors.WHITE} />
        </View>
      ) : (
        <FlatList
          data={upcominMovies}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({item}) => <NewHotComp item={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default NewHotScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: themeColors.WHITE,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
