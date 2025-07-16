import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import defaultStyle from '../../styles';
import InputComp from '../../components/ui/inputComp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { themeColors } from '../../themes/themeColors';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchMovies } from '../../store/actions/movieActions';
import SearchCard from '../../components/searchCard/searchCard';

const SearchScreen = () => {
  const { searchResults, pending } = useSelector(state => state.searchStore);
  const dispatch = useDispatch();
  const isPending = pending.searchResults;

  const [searchText, setSearchText] = useState('');

  const handleSearch = useCallback(
    debounce(value => {
      if (value.trim().length > 0) {
        dispatch(getSearchMovies({ query: value }));
      }
    }, 400),
    [],
  );

  const handleTextChange = value => {
    setSearchText(value);
    handleSearch(value);
  };

  const clearInput = () => {
    setSearchText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[defaultStyle.container, { flex: 1 }]}>
          <View style={styles.inputContainer}>
            <InputComp
              placeholder={'Search Movie'}
              onChangeText={handleTextChange}
              value={searchText}
            />
            {searchText.length > 0 && (
              <Pressable style={styles.icon} onPress={clearInput}>
                <AntDesign
                  name="closecircleo"
                  size={25}
                  color={themeColors.WHITE}
                />
              </Pressable>
            )}
          </View>

          {isPending ? (
            <ActivityIndicator size={'large'} color={themeColors.WHITE} />
          ) : searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id?.toString()}
              renderItem={({ item }) => <SearchCard item={item} />}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 50 }}
              ListHeaderComponent={() => (
                <Text style={styles.title}>Results ({searchResults.length})</Text>
              )}
              style={{ flex: 1 }}
            />
          ) : searchText.trim().length > 0 ? (
            <Text style={styles.noResultText}>No results found</Text>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
    marginTop: 60,
  },
  icon: {
    position: 'absolute',
    top: 28,
    right: 28,
    zIndex: 10,
  },
  title: {
    color: themeColors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  noResultText: {
    color: themeColors.WHITE,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
