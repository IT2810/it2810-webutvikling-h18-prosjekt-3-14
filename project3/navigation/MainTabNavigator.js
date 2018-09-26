import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TodayScreen from '../screens/TodayScreen';
import WeekScreen from '../screens/WeekScreen';
import ProfileScreen from '../screens/ProfileScreen';

const TodayStack = createStackNavigator({
  Today: TodayScreen,
});

TodayStack.navigationOptions = {
  tabBarLabel: 'Today',
  tabBarIcon: ({ focused }) => (
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-stats${focused ? '' : '-outline'}` : 'md-stats'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  TodayStack,
  WeekStack,
  ProfileStack,
});
