import React from 'react';
import Expo from "expo";

import { View, Text, AsyncStorage, StyleSheet, Button } from 'react-native';


export default class TodayScreen extends React.Component {
  static navigationOptions = {
    title: 'Today',
  };


  //Function that removes user from asyncStorage and navigates back to registerScreen.
  _signOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>TodayScreen</Text>
        <Button title="Go back/Reset" onPress={this._signOutAsync} />
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


 

  
