import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Col, Row} from "react-native-easy-grid";

import layout from '../constants/Layout'

const CalendarEvent = ({title, time}) => (
  <View style={styles.event}>
    <Row>
      <Col>
        <Text style={styles.largeText}>{title}</Text>
      </Col>
      <Col>
        <Text style={styles.small}>{time}</Text>
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
    fontSize: 30,
    color: 'black',
  },
  smallText: {
    fontSize: 10,
    color: 'black',
  }
});

export default CalendarEvent;