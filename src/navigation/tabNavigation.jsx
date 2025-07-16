import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DOWNLOAD, HOME, NEWHOT, SEARCH} from '../utils/routes';
import HomeScreen from '../screens/home/home';
import NewHotScreen from '../screens/newHot';
import SearchScreen from '../screens/search';
import DownloadScreen from '../screens/download';
import {themeColors} from '../themes/themeColors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  const {width, height} = Dimensions.get('window');
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeColors.WHITE,
        tabBarInactiveTintColor: themeColors.GRAY,

        tabBarStyle: {
          backgroundColor: themeColors.BLACK,
          paddingBottom: 10,
          height: height * 0.09,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
          marginBottom: 15,
        },
      }}>
      <Tab.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Entypo
              name="home"
              color={focused ? themeColors.WHITE : themeColors.GRAY}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NEWHOT}
        component={NewHotScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="video-library"
              color={focused ? themeColors.WHITE : themeColors.GRAY}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SEARCH}
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="search"
              color={focused ? themeColors.WHITE : themeColors.GRAY}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name={DOWNLOAD}
        component={DownloadScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="download-for-offline"
              color={focused ? themeColors.WHITE : themeColors.GRAY}
              size={27}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
