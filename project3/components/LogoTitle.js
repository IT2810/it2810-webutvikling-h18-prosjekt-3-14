import React, { Component } from 'react';
import { Image } from 'react-native';

class LogoTitle extends Component {
    render() {
        return (
          <Image
            source={require('../walktrue.jpg')}
            style={{ width: "60%", height: 25 }}
          />
        );
      }
}

export default LogoTitle;