import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Col, Row} from "react-native-easy-grid";

import layout from '../constants/Layout'

const CalendarEvent = ({title, time}) => (
  <View style={styles.event}>
    <Row>
      <Col>
        <Text style={styles.smallText}>{time}</Text>
      </Col>
      <Col>
        <Text style={styles.largeText}>{title}</Text>
      </Col>
    </Row>
  </View>
);

const styles = StyleSheet.create({
  event: {
    paddingTop: '5%',
    paddingBottom: '5%',
    width: layout.windowSize.width,
    height: layout.windowSize.height / 10,
    backgroundColor: 'white',
    alignItems: 'Left',
  },
  largeText: {
    textAlign: 'left',
    fontSize: 30,
    color: 'black',
  },
  smallText: {
    textAlign: 'left',
    fontSize: 10,
    color: 'black',
  }
});

export default CalendarEvent;