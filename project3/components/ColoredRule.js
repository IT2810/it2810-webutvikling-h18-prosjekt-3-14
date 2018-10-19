import React from 'react';
import {View} from 'react-native';

import layout from '../constants/Layout'

const coloredRule = ({color}) => (
  <View
    style={{
      padding: '3%',
      borderBottomColor: color,
      borderBottomWidth: 1,
      opacity: 0.1,
      width: layout.windowSize.width - (layout.windowSize.width / 20),
    }}
  />);

export default coloredRule;