import React from 'react';
import Expo from "expo";
import {AsyncStorage, StyleSheet, Text, View, TextInput} from 'react-native';
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
      title: "",
      time: "",
      updated: false,
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
      this.render();
    })
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
          title: this.state.title,
          time: this.state.time,
        }
      });
    console.log("Data in addEvent - after push", data);
    AsyncStorage.setItem(dateString, JSON.stringify(data));
    EventRegister.emit('updateEventList', new Date(this.state.selectedDate));
    this.setState({
      updated:true,
    })
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
            EventRegister.emit('updateEventList', new Date(day.dateString));
          }}
          showWeekNumbers={true}
        />
        <ColoredRule color={'black'}/>
        <Text>{String(selectedDate)}</Text>
        <CoolButton text={'Create new Event'} onPress={() => {
          this.addEvent(selectedDate);
        }}/>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({title: text})}
          value={this.state.title}
          returnKeyType="done"
        />
        <Text>Time</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({time: text})}
          value={this.state.time}
          returnKeyType="done"
        />

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
});

Expo.registerRootComponent(PlannerScreen);