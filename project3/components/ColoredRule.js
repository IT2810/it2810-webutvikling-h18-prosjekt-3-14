import React from 'react';
import {View} from 'react-native';

import layout from '../constants/Layout'

const ColoredRule = ({color, margin='1%', padding='3%'}) => (
  <View
    style={{
      padding: padding,
      margin: margin,
      borderBottomColor: color,
      borderBottomWidth: 1,
      opacity: 0.1,
      width: layout.windowSize.width - (layout.windowSize.width / 20),
    }}
  />);

export default ColoredRule;