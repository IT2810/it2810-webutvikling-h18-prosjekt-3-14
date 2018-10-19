import React from 'react';
import {Platform, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TodayScreen from '../screens/TodayScreen';
import EditScreen from '../screens/EditScreen';
import WeekScreen from '../screens/WeekScreen';
import ProfileScreen from '../screens/ProfileScreen';

import TabBarIcon from '../components/TabBarIcon';
import LogoTitle from '../components/LogoTitle';

import colors from '../constants/Colors';


const TodayStack = createStackNavigator({
    Today: {
      screen: TodayScreen,
      title: <LogoTitle/>,
      navigationOptions: ({navigation}) => ({
        title: "Today",
        headerTitle: <LogoTitle/>,
        headerLeft:
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('Edit')
            }}
            style={styles.button}
            underlayColor={colors.buttonUnderlay}
            activeOpacity={0.5}
          >
            <Icon
              name={'gear'}
              color={colors.buttonDefault}
              size={35}
            />
          </TouchableHighlight>
      }),
    },
    Edit: {
      screen: EditScreen,
    },
  },
  {
    initialRouteName: "Today"
  });

TodayStack.navigationOptions = {
  tabBarLabel: 'Today',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const WeekStack = createStackNavigator({
  Week: WeekScreen,
});

WeekStack.navigationOptions = {
  tabBarLabel: 'Week',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? `ios-stats${focused ? '' : '-outline'}`
        : 'md-stats'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? `ios-person${focused ? ''
        : '-outline'}` : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  TodayStack,
  WeekStack,
  ProfileStack,
});


const styles = StyleSheet.create({
  button: {
    left: '25%'
  },
});
