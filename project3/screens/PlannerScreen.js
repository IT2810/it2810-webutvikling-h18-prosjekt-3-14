import React from 'react';
import Expo, {Pedometer} from "expo";
import {View, Text, StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import ColoredRule from '../components/ColoredRule'

import colors from '../constants/Colors'
import layout from '../constants/Layout'


export default class PlannerScreen extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          onDayPress={(day) => {console.log('selected day', day)}}
          showWeekNumbers={true}

        />
        <ColoredRule color={'black'}/>
      </View>
    );
  }
}

const window = layout.windowSize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: colors.defaultBackground,
    alignItems: 'center'
  },
  calendar: {
    width: window.width,
  },
});

Expo.registerRootComponent(PlannerScreen);