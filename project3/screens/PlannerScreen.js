import React from 'react';
import Expo from "expo";
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {EventRegister} from 'react-native-event-listeners'

import ColoredRule from '../components/ColoredRule'

import colors from '../constants/Colors'
import layout from '../constants/Layout'
import CoolButton from "../components/CoolButton";
import EventList from "../components/EventList";


export default class PlannerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    }
  }

  componentDidMount() {
    const date = new Date();
    this.setState({
      selectedDate: date,
    });
  }

  async componentWillMount() {
    this.doneUpdating = EventRegister.addEventListener('doneUpdating', async () => { // Add EventListener
      await this.sleep(3000);
      this.render();
    })
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  async addEvent(date) {
    let dateString = String(date.getDate()) + String(date.getMonth()) + String(date.getFullYear());
    let data = await AsyncStorage.getItem(dateString, '')
      .then((data)=>JSON.parse(data));

    if (data === null) {
      data = {
        events: []
      };
    }
    console.log("Data in addEvent:", data);
    data.events.push(
      {
        event: {
          title: this.makeid(4),
          time: this.makeid(4),
        }
      });
    console.log("Data in addEvent - after push", data);
    AsyncStorage.setItem(dateString, JSON.stringify(data));
  };

  render() {
    const selectedDate = new Date(this.state.selectedDate);
    return (
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          onDayPress={(day) => {
            this.setState({
              selectedDate: new Date(day.dateString),
            });
            EventRegister.emit('updateEventList');
          }}
          showWeekNumbers={true}
        />
        <ColoredRule color={'black'}/>
        <Text>{String(selectedDate)}</Text>
        <CoolButton text={'Create new Event'} onPress={() => {
          this.addEvent(selectedDate);
        }}/>

        <EventList date={selectedDate}/>
      </View>
    );
  }
}

const window = layout.windowSize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBackground,
    alignItems: 'center'
  },
  calendar: {
    width: window.width,
  },
  testSd1: {
    width: window.width,
    height: '100%',
    backgroundColor: 'green',
  },
  testSd2: {
    width: window.width,
    height: '100%',
    backgroundColor: 'red',
  },
  testSd3: {
    width: window.width,
    height: '100%',
    backgroundColor: 'yellow',
  }
});

Expo.registerRootComponent(PlannerScreen);