import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React from 'react';
import defaultStyle from '../../styles';
import ButtonComp from '../../components/ui/buttonComp';
import { themeColors } from '../../themes/themeColors';
import { useNavigation } from '@react-navigation/native';
import { SIGNIN } from '../../utils/routes';
import LinearGradient from 'react-native-linear-gradient';

const GetStartedScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[defaultStyle.container, { backgroundColor: 'black' }]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/n-logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Image
          source={require('../../assets/images/Rectangle64.png')}
          style={styles.bgStretch}
        />
        <Image
          source={require('../../assets/images/getstarted.png')}
          style={styles.bgCover}
        />

        {/* ALT YAZILARIN ARKASINDA GRADIENT */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', 'black']}
          style={styles.gradientOverlay}
        />

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Unlimited movies, TV series and much more.
            </Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Watch wherever you want.</Text>
              <Text style={styles.subtitle}>Cancel anytime.</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.dots}>••••</Text>

      <ButtonComp
        title={'GET STARTED'}
        color={themeColors.RED}
        onPress={() => navigation.navigate(SIGNIN)}
      />
    </SafeAreaView>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  logo: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
  },
  bgStretch: {
    width: '100%',
    height: '90%',
    resizeMode: 'stretch',
    position: 'absolute',
  },
  bgCover: {
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    height: '40%',
    width: '100%',
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
    zIndex: 3,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  dots: {
    fontSize: 40,
    textAlign: 'center',
    letterSpacing: 10,
    color: '#fff',
    marginBottom: 20,
  },
});
