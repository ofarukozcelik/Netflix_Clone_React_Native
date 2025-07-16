import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import defaultStyle from '../../styles';
import HeaderComp from '../../components/ui/headerComp';
import InputComp from '../../components/ui/inputComp';
import ButtonComp from '../../components/ui/buttonComp';
import { themeColors } from '../../themes/themeColors';
import { Formik } from 'formik';
import { signInvalidationSchema } from '../../utils/validationSchema';
import { useNavigation } from '@react-navigation/native';
import { WATCHLIST } from '../../utils/routes';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [secure, setSecure] = useState(true);

  return (
    <SafeAreaView style={defaultStyle.container} edges={['top']}>
      <HeaderComp
        icon={
          <AntDesign name="arrowleft" size={28} color={themeColors.WHITE} />
        }
        iconPosition="left"
        onPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Formik
          initialValues={{ email: 'omer@gmail.com', password: '123456' }}
          validationSchema={signInvalidationSchema}
          onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
            try {
              setSubmitting(true);
              await signInWithEmailAndPassword(auth, values.email, values.password);
              navigation.navigate(WATCHLIST);
              resetForm();
            } catch (error) {
              setErrors({ general: error.message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View>
              <InputComp
                placeholder="Enter your mail address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email}
              />

              <View>
                <InputComp
                  placeholder="Enter your password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={touched.password && errors.password}
                  secureTextEntry={secure}
                />
                <TouchableOpacity
                  style={styles.eye}
                  onPress={() => setSecure(!secure)}
                >
                  <Entypo
                    name={secure ? 'eye-with-line' : 'eye'}
                    size={22}
                    color={themeColors.GRAY}
                  />
                </TouchableOpacity>
              </View>

              {errors.general && (
                <Text style={styles.errorText}>{errors.general}</Text>
              )}

              <View style={{ marginTop: 40 }}>
                <ButtonComp
                  title={isSubmitting ? 'Signing in...' : 'Sign In'}
                  color={themeColors.RED}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.helpContainer}>
          <Text style={styles.infotext}>Need help?</Text>
          <Text style={styles.infotext}>
            New to Netflix? <Text style={styles.signup}>Sign up now</Text>.
          </Text>
        </View>

        <Text style={styles.info}>
          Sign in is protected by Google reCAPTCHA to ensure you’re not a bot.
          Learn more.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  infotext: {
    color: themeColors.WHITE,
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  signup: {
    color: themeColors.RED,
    fontWeight: 'bold',
  },
  info: {
    textAlign: 'center',
    marginTop: 25,
    color: themeColors.GRAY,
    paddingHorizontal: 30,
    fontSize: 14,
    lineHeight: 20,
  },
  eye: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  helpContainer: {
    marginTop: 30,
  },
  errorText: {
    color: themeColors.RED,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});
