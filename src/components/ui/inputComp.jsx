import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { themeColors } from '../../themes/themeColors';
import Entypo from 'react-native-vector-icons/Entypo';

const InputComp = props => {
  const { error, icon, value } = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          selectionColor={themeColors.WHITE}
          {...props}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.infotext}>{error ? error : ''}</Text>
      </View>
    </View>
  );
};



export default InputComp;

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: themeColors.DARK_GRAY,
    marginTop: 20,
  },
  textInput: {
    fontSize: 18,
    color: themeColors.WHITE,
    paddingHorizontal: 10,
    fontWeight: '600',
  },
  infotext: {
    color: themeColors.RED,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
});
