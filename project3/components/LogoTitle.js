import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

class LogoTitle extends Component {
  render() {
    return (
      <View style={styles.imageview}>
        <Image
          source={require('../walktrue.jpg')}
          style={{width: "70%", height: 25}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageview: {
    width: "60%",
    alignItems: "center"
  }
});

export default LogoTitle;