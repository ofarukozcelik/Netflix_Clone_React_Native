import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { themeColors } from '../../themes/themeColors';

const ICON_WIDTH = 50; // ikon alanı genişliği

const HeaderComp = ({ icon, iconPosition, onPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={[styles.iconContainer, { width: ICON_WIDTH }]}>
        {iconPosition === 'left' && (
          <Pressable onPress={onPress}>{icon}</Pressable>
        )}
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logos_netflix_medium.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.iconContainer, { width: ICON_WIDTH }]}>
        {iconPosition === 'right' && (
          <Pressable onPress={onPress}>{icon}</Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#000',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 30,
  },
});

export default HeaderComp;
