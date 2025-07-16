import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../../components/ui/headerComp';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import WatchListItem from '../../components/watchList/watchListItem';
import { ADDWATCHLISTITEM } from '../../utils/routes';
import { themeColors } from '../../themes/themeColors';
import { removeWatchList } from '../../store/slice/watchListSlice';

const WatchListScreen = ({ navigation }) => {
  const { watchList } = useSelector(store => store.watchListStore);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeWatchList(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp
        icon={<FontAwesome5 name="pencil-alt" size={22} color={themeColors.WHITE} />}
        iconPosition="right"
        onPress={() => navigation.navigate(ADDWATCHLISTITEM)}
      />

      <Text style={styles.title}>Who's Watching?</Text>

      <FlatList
        numColumns={2}
        contentContainerStyle={{ alignItems: 'center', marginBottom: 50 }}
        data={watchList}
        renderItem={({ item }) => (
          <WatchListItem item={item} onDelete={handleDelete} />
        )}
      />
    </SafeAreaView>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: themeColors.WHITE,
  },
});
