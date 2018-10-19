import React from 'react';
import Expo from "expo";
import { View, Button, AsyncStorage, StyleSheet, Text, TextInput, Picker, ImageBackground, TouchableOpacity } from 'react-native';
 
export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register screen',
  };
  
  constructor(props){
      super(props);
      this.state = {
        name: '',
        gender: 'male',
        age: 0,
        weight: 0,
        height: 0,
        goal: 0,
      }
    }

    //Function returning true if the required user info is entered.
    enableButton() {
      return !(this.state.name.length > 0 && this.state.age > 0 && this.state.weight > 0 && this.state.height > 0 && this.state.goal > 0);
    }
 
    render() {
      return (
          <View style={styles.inputcontainer}>
              <Text style={styles.label}> {this.state.gender === 'male' ? "🤵" : "👩"} Name </Text>
              <TextInput
                label="Name"
                style={styles.input}
                onChangeText={(text) => this.setState({name: text})}
                placeholder="Jon Doe"
                textContentType="name"
                enablesReturnKeyAutomatically={true}
                returnKeyType="next"
                value={this.state.name}
              />
              <Text style={styles.label}>🔢 Age</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({age: text})}
                placeholder="21"
                value={this.state.age.toString()}
                keyboardType="number-pad"
                returnKeyType="done"
              />
              <Text style={styles.label}>{this.state.gender === 'male' ? "🏋️‍":"🏋️‍♀️"} Weight </Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({weight: text})}
                placeholder="79,0 (kg)"
                value={this.state.weight.toString()}
                keyboardType="numeric"
                returnKeyType="done"
              />
              <Text style={styles.label}>📏 Height</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({height: text})}
                placeholder="182,5 (cm)"
                value={this.state.height.toString()}
                keyboardType="numeric"
                returnKeyType="done"
              />
 
              <Text style={styles.label}> 🏆 Goal </Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({goal: text})}
                placeholder="Enter your target step count per day"
                value={this.state.goal.toString()}
                keyboardType="number-pad"
                returnKeyType="done"
              />
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderButtonsContainer}>
                <TouchableOpacity style={(this.state.gender === 'male') ? styles.activebutton : styles.inactivebutton} onPress={() => this.setState({gender: 'male'})}>
                  <View style={{alignItems: "center"}}>
                    <Text style={styles.buttonText}>
                    🏃‍♂️
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={(this.state.gender === 'female') ? styles.activebuttonpink : styles.inactivebutton} onPress={() => this.setState({gender: 'female'})}>
                  <View style={{alignItems: "center"}}>
                    <Text style={styles.buttonText}>
                    🏃‍♀️
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.buttoncontainer}>
                <Button title="Submit" onPress={this._signInAsync} color="rgb(28, 184, 65)" disabled={this.enableButton()}/>
              </View>
          </View>  
      );
    }
 
    //Function beeing called when submitting user information -> Storing info in AsyncStorage and navigating to App.
    _signInAsync = async () => {
      let USER_object = {
        name: this.state.name,
        age: this.state.age,
        gender: this.state.gender,
        weight: this.state.weight,
        height: this.state.height,
        goal: this.state.goal,
      };
      await AsyncStorage.setItem('USER', JSON.stringify(USER_object));
      this.props.navigation.navigate('App');
    };
 
  }
 
  const styles = StyleSheet.create({
    inputcontainer: {
      paddingTop: 20,
      alignItems: "center",
      flex:1,
      backgroundColor: "#F8F8F8"
    },
    input: {
      height: "3.7%",
      width: "85%",
      textAlign: "center",
      fontSize: 14,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 7,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 7,
      borderColor: "dodgerblue",
      backgroundColor: "white",
    },
    label: {
      color: "dodgerblue",
      fontSize: 23,
      marginTop: 14,
      marginBottom: 1
    },
    buttoncontainer: {
      marginTop: 15
    },
    activebutton: {
      backgroundColor: '#6F9FD8',
      padding: 2,
      width: "40%",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 7,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 7,
      marginRight: 8
    },
    activebuttonpink: {
      backgroundColor: '#FF69B4',
      padding: 2,
      width: "40%",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 7,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 7,
      marginRight: 8,
      justifyContent: "center"    
    },
    inactivebutton: {
      backgroundColor: 'grey',
      padding: 2,
      width: "40%",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 7,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 7,
      marginRight: 8,
 
    },
    genderButtonsContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 30,
      color: "white",
    }
  });
 
  Expo.registerRootComponent(RegisterScreen);
