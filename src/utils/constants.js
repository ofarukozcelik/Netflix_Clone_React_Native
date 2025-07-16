import {Dimensions} from 'react-native';
import Config from 'react-native-config';

const {width, height} = Dimensions.get('window');

const API_KEY = Config.API_KEY;
const TOKEN = Config.TOKEN;

export {width, height, API_KEY, TOKEN};