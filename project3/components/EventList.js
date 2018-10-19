import React from 'react';
import {AsyncStorage, ScrollView, View, Text} from 'react-native';
import CalendarEvent from './CalendarEvent'
import ColoredRule from "./ColoredRule";
import {EventRegister} from "react-native-event-listeners";


export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null
    }
  }

  async getEvents(date) {
    console.log(date);
    let usedDate = date.date === null ? new Date() : new Date(date);
    let dateString = String(usedDate.getDate())+String(usedDate.getMonth())+String(usedDate.getFullYear());
    await AsyncStorage.getItem(dateString)
      .then((data)=>JSON.parse(data))
      .then((data)=>this.eventsToComponents(data));
  }

  componentDidMount() {
    this.getEvents(this.props.date);
  }

  componentWillMount() {
    this.updateEventList = EventRegister.addEventListener('updateEventList', async () => { // Add EventListener
      this.update();
    })
  }

  async update() {
    await this.getEvents(this.props.date);
  }

  eventsToComponents(data) {
    if (data === undefined || data === null) {
      this.setState({
        events: null,
      });
      return null;
    }

    data = Object.values(data.events);
    let arrayOfEvents = [];

    for (let i = 0; i < data.length; i++) {
      const extracted = Object.values(data[i]);
      const event = {
        title: extracted[0]["title"],
        time: extracted[0]["time"],
      };
      arrayOfEvents.push(event);
    }
    this.setState({
      events: arrayOfEvents,
    });
    console.log(this.state.events);
    EventRegister.emit('doneUpdating');
    // return arrayOfEvents.map(function (data, i) {
    //   return (
    //     <View key={i}>
    //       <CalendarEvent
    //         title={data.title}
    //         time={data.time}
    //       />
    //       <ColoredRule color={'black'} margin={'1%'} padding={'0%'}/>
    //     </View>
    //   );
    // });
  }

  render() {
    console.log("EventList");
    console.log(this.state.events);
    let events = this.state.events;
    if (events === null) {
      return (
      <ScrollView/>);
    }
    let data = events.map(function (data, i) {
      return (
        <View key={i}>
          <CalendarEvent
            title={data.title}
            time={data.time}
          />
          <ColoredRule color={'black'} margin={'1%'} padding={'0%'}/>
        </View>)});

    return (
      <ScrollView>
        <Text>Hehehe</Text>
        <CalendarEvent title={"bebe"}/>
        {data}
      </ScrollView>
    );
  }
}