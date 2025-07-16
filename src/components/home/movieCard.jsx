import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IMG_URL } from '../../services/urls';
import { width } from '../../utils/constants';
import { themeColors } from '../../themes/themeColors';
import { useNavigation } from '@react-navigation/native';
import { MOVIEDETAIL } from '../../utils/routes';

const MovieCard = ({ item }) => {
  const navigation = useNavigation();

  if (!item || typeof item.title !== 'string') {
    console.warn('Invalid movie item:', item);
    return null;
  }

  return (

    <Pressable onPress={() => navigation.navigate(MOVIEDETAIL, { movieId: item.id })}>
      <View>
        <Image
          source={
            item.poster_path ? { uri: `${IMG_URL}${item.poster_path}` } : require('../../assets/images/moviblack.jpg')
          }
          style={styles.imgCard}
        />
        <Text numberOfLines={1} style={styles.titleText}>
          {item.title}
        </Text>
      </View>
    </Pressable>

  );
};


export default MovieCard;

const styles = StyleSheet.create({
  imgCard: {
    width: width * 0.35,
    height: width * 0.5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 22,
    color: themeColors.GRAY,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    maxWidth: width * 0.35,
    overflow: 'hidden',
  },
});