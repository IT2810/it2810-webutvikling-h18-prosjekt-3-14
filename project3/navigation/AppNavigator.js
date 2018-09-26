import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import RegisterScreen from '../screens/RegisterScreen';

//Navigating through different routes
export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: RegisterScreen,
  App: MainTabNavigator,
},
  {
    initialRouteName: 'AuthLoading',
  }
);