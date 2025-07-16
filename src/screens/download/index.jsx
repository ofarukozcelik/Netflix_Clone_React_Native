import { StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import defaultStyle from '../../styles';
import { themeColors } from '../../themes/themeColors';
import ButtonComp from '../../components/ui/buttonComp';
import { HOME } from '../../utils/routes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DownloadScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[defaultStyle.container, { backgroundColor: '#000' }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Smart Downloads</Text>

        <View>
          <Text style={styles.subheader}>Introducing Downloads For You</Text>
          <Text style={styles.description}>
            Netflix offers smart, adaptive, and personalized downloads that help you save time and money.
          </Text>
        </View>
        <View style={{ alignSelf: 'center', marginVertical: 80 }}>
          <MaterialIcons name="file-download" size={140} color={themeColors.BLUE} />
        </View>
        <ButtonComp title={'SETUP'} color={themeColors.BLUE} style={{ marginVertical: 10 }} />

        <TouchableOpacity
          style={styles.findBtn}
          onPress={() => navigation.navigate(HOME)}
        >
          <Text style={styles.findText}>Find Something to Download</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.description}>
            Learn more about smart, adaptive, and personalized downloads at{' '}
            <Text style={{ color: themeColors.RED }}>
              help.netflix.com/smart-downloads
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: themeColors.WHITE,
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'center'
  },
  subheader: {
    fontSize: 22,
    fontWeight: '600',
    color: themeColors.WHITE,
    marginBottom: 12,
    alignSelf: 'center'
  },
  description: {
    fontSize: 16,
    color: themeColors.WHITE,
    lineHeight: 22,
    alignSelf: 'center'
  },

  findBtn: {
    width: '100%',
    backgroundColor: themeColors.DARK_GRAY,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 20,
  },
  findText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.WHITE,
    textAlign: 'center',
  },
});
