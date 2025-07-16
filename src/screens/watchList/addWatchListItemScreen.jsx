import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import defaultStyle from '../../styles';
import HeaderComp from '../../components/ui/headerComp';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import InputComp from '../../components/ui/inputComp';
import { watchListvalidationSchema } from '../../utils/validationSchema';
import ButtonComp from '../../components/ui/buttonComp';
import { themeColors } from '../../themes/themeColors';
import { addWatchList } from '../../store/slice/watchListSlice';

const AddWatchListItemScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[defaultStyle.container, { flex: 1, backgroundColor: '#000' }]}>
      <HeaderComp />

      <View style={styles.innerContent}>
        <Text style={styles.title}>Add Who Is Watching</Text>

        <Formik
          initialValues={{ id: Date.now(), title: '' }}
          validationSchema={watchListvalidationSchema}
          onSubmit={values => {
            dispatch(addWatchList(values));
            navigation.goBack();
          }}
        >
          {({ handleBlur, handleSubmit, handleChange, values, errors }) => (
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
              <InputComp
                placeholder="Enter your name"
                values={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                error={errors.title}
                style={{ height: 60,fontSize: 22, color: 'white' }}
                
              />

              <ButtonComp
                title="SAVE"
                color={themeColors.RED}
                onPress={handleSubmit}
              />
            </ScrollView>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default AddWatchListItemScreen;

const styles = StyleSheet.create({
  innerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: themeColors.WHITE,
    letterSpacing: 3,
    marginTop: 20,
  },
});
