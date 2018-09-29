import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EditScreen from '../screens/EditScreen';

//Navigating through different routes
export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: RegisterScreen,
  App: MainTabNavigator,
  Edit: EditScreen
},
  {
    initialRouteName: 'AuthLoading',
  }
);