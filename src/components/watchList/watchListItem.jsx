import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { themeColors } from '../../themes/themeColors';
import { generateRandomColor } from '../../utils/functions';
import { useNavigation } from '@react-navigation/native';
import { BOTTOMTAB } from '../../utils/routes';

import { useDispatch } from 'react-redux';
import { removeWatchList } from '../../store/slice/watchListSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';

const WatchListItem = ({ item }) => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const backgroundColor = generateRandomColor();

  const [isPressed, setIsPressed] = useState(false);

  const handleRemove = () => {
    dispatch(removeWatchList(item.id));
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate(BOTTOMTAB)}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor,
            width: width * 0.258,
            height: width * 0.258,
          },
        ]}
      >
        <Image
          source={require('../../assets/images/smile.png')}
          style={{
            width: width * 0.2,
            height: width * 0.2,
            resizeMode: 'contain',
          }}
        />

        {/* Silme butonu */}
        <Pressable
          style={styles.deleteButton}
          onPress={handleRemove}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <AntDesign
            name="closecircle"
            size={20}
            color={isPressed ? themeColors.GRAY : themeColors.DARK_GRAY}
          />
        </Pressable>
      </View>

      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  );
};

export default WatchListItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20,
  },
  card: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
    shadowColor: themeColors.WHITE,
    elevation: 7,
    position: 'relative',
  },
  title: {
    color: themeColors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 3,
    right: 3,
    zIndex: 10,
  },
});
