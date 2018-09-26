import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class WeekScreen extends React.Component {
  static navigationOptions = {
    title: 'Week',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>WeekScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
