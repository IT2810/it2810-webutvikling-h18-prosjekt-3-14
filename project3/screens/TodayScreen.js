import React from 'react';
import Expo from "expo";
 
import { View, Text, AsyncStorage, StyleSheet, Button } from 'react-native';
import LogoTitle from '../components/LogoTitle';
 
 
export default class TodayScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle></LogoTitle>
  };
 
 
  //Function that removes user from asyncStorage and navigates back to registerScreen.
  _signOutAsync = async () => {
    //This is how to access user data, (result) is now a object with all the user attributes.
    await AsyncStorage.getItem('USER', (err, result) => {
      let user = JSON.parse(result);
      console.log(user.name);
    });
 
    //Still keeping this to make it possible to navigate between register and app.
    await AsyncStorage.removeItem('USER');
    this.props.navigation.navigate('Auth');
  }

  _editUser = async = () => {
    this.props.navigation.navigate('Edit');
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Text>TodayScreen</Text>
        <Button title="Go back/Reset" onPress={this._signOutAsync} />
        <Button title="Edit" onPress={this._editUser} />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
 
Expo.registerRootComponent(TodayScreen);

 

  
