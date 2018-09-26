import React from 'react';
import Expo from "expo";
import { View, Button, AsyncStorage, StyleSheet, Text } from 'react-native';

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
      title: 'Register screen',
    };
  
    render() {
      return (
        <View style={styles.container}>
            <Text>NAME</Text>
            <Text>AGE</Text>
            <Text>GENDER</Text>
            <Text>WEIGHT</Text>
            <Text>HEIGHT</Text>
            <Text>GOAL</Text>

            <Button title="Submit" onPress={this._signInAsync} />
        </View>
      );
    }

    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 35
    },
  });

  Expo.registerRootComponent(RegisterScreen);
