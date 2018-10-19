import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

import layout from '../constants/Layout'
import colors from "../constants/Colors";


const CoolButton = ({text, onPress}) => (
  <View>
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor={'#fff'}
      activeOpacity={0.5}
    >
      <Text>{text}</Text>
    </TouchableHighlight>
  </View>
    );

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: '3%',
    margin: '3%',
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: '#fff',
    width: layout.windowSize.width / 2,
  },
  text: {
    width: layout.windowSize.width / 3,
  }
});

export default CoolButton;