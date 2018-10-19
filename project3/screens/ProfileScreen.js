import React from 'react';
import { View, Text, StyleSheet,  AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import { Card , Icon } from 'react-native-elements';
import layout from '../constants/Layout';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  constructor(props) {
    super(props);
    this.state = {
      title: 'Loading..',
      userSteps: 0,
      userGoal: 0,
      userWeight: 0,
      userHeight: 0,
      userHighscore: 0,
      userGender: 'male',
      status: 'sentiment-very-dissatisfied',
      index: 0
    }
  }

  updateFromStorage() {
    AsyncStorage.getItem('USER', (err, result) => {
      let user = JSON.parse(result);
      this.setState({
        title: user.name,
        userSteps: 2000,
        userGoal: user.goal,
        userWeight: user.weight,
        userHeight: user.height,
        userGender: user.gender,
        userHighScore: 20000,
      })
    });
  };

  _onPressScorestreak() {
    Alert.alert('This shows the peak amount of steps you have walked during a single day.');
    }

  _onPressStatus() {
    Alert.alert('This shows the proportion of steps wandered interwined with your daily goal. The further you walk, the closer you will get to your goal.  Stay true to your ambitions and remember that you never walk alone!');
    }
   
  _onGoalPress() {
    Alert.alert('This is the number of steps you have appointed as your daily goal. Maybe you can achieve it on a regular basis?');
  }

  _onQuoteLongPress() {
    Alert.alert("Click on this button to navigate through a variety of motivational quotes. Maybe they will encourage you to continue your journey towards your goal?");
  }

  componentDidMount() {
    this.updateFromStorage(); // Get the newest update in AsyncStorage
    this.setState({
      index: this.getRandomInt(5)
    });
  }

  componentDidUpdate() {
    this.updateFromStorage(); // Get the newest update in AsyncStorage
  }

  getColor(status) {
    switch(true) {
      case 0 <= status <= 25:
        return '#FF4136';
      case 25 < status <= 50:
        return '#FF851B'; 
      case 50 < status <=75:
        return '#FFDC00';
      case 75 < status:
        return '#2ECC40';
    } 
  }

  getStatus(status) {
    switch(true) {
      case 0 <= status <= 25:
        return 'sentiment-very-dissatisfied';
      case 25 < status <= 50:
        return 'sentiment-dissatisfied'; 
      case 50 < status <=75:
        return 'sentiment-satisfied';
      case 75 < status:
        return 'sentiment-very-satisfied';
    } 
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    let status = Math.ceil(this.state.userSteps/this.state.userGoal*100);
    
    return(
      <View style={this.state.userGender === 'male' ? styles.containerMale : styles.containerFemale} >
        <Card
          title={this.state.title}
          backgroundColor={this.getColor(this.state.status)}
          containerStyle={styles.card}
          >
         
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <View style={{alignItems: 'center'}}>
            <Icon   
              name={this.getStatus(status)}
              color={this.getColor(this.state.status)}
              size={width/6}
              onPress={this._onPressStatus}/>
            <Text style={styles.labeltext}>{status + '%'}</Text>
            </View>

            <View >
            <Icon   
              name='directions-run'
              color={this.state.userGender==='male' ? '#001f3f' : '#F012BE' }
              size={width/2}/>
            </View>

            <View  style={{alignItems: 'center'}}>
              <Icon   
              name='whatshot'
              color='#E47A2E'
              size={width/6}
              onPress={this._onPressScorestreak}/>
              />
              <Text style={styles.labeltext}>{this.state.userHighscore}</Text>
            </View>

          </View>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                      <View style={{alignItems: 'center'}}>
                      <Text style={styles.label}>📏</Text>
            <Text style={styles.labeltext}>{this.state.userHeight + 'cm'}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={styles.label}>{this.state.userGender === 'male' ? "🏋️‍":"🏋️‍♀️"}</Text>
              <Text style={styles.labeltext}>{this.state.userWeight + 'kg'}</Text>

            
            </View>

            <View  style={{alignItems: 'center'}}>
              <Text style={styles.label} onPress={this._onGoalPress}>🏆</Text>
              <Text style={styles.labeltext}>{this.state.userGoal}</Text>
              </View>
          </View>

          <View style={{flex: 0.58,  alignItems: 'center' }}>
            <TouchableOpacity style={styles.button} onLongPress={this._onQuoteLongPress} onPress={(e) =>{ e.preventDefault(); this.setState({index: (this.state.index + 1)%6})}}>

            <Text style={styles.quote}  >{quotes[this.state.index]} </Text>
            </TouchableOpacity>

          </View>

        </Card>


      </View>
      );
  }
}

const quotes = [
  '"Only I can change my life. No one can do it for me" - Carol Burnett',
  '"Good, better, best. Never let it rest." - St. Jerome',
  '"Life is 10% what happens to you and 90% how you react to it" - Charles R. Swindoll',
  '"With the new day comes new strength and new thoughts" - Eleanor Roosevelt',
  '"The past cannot be changed. The future is yet in your power" - Unknown',
  '"Set your goals high, and dont stop till you get there" - Bo Jackson"'
]

const width = layout.windowSize.width;   //Get width of the users screen
const height = layout.windowSize.height; //Get height of the users screen

const styles = StyleSheet.create({
  containerMale: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: height * (2/112),
    backgroundColor: 'lightblue',
  },
  containerFemale: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: height * (2/112),
    backgroundColor: 'pink',
  },
  label: {
    color: "dodgerblue",
    fontSize: width * (4 / 20),
    marginTop: 14,
    marginBottom: 1
  },
  labeltext: {
    textAlign: 'center',
    fontSize: width * (1 / 21),
  },
  quote: {
    textAlign: 'center',
    fontSize: width * (1 / 21),
    color: 'white',
    margin: 10
  },
  card: {
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
  button: {
    backgroundColor: '#2ECC40',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * (4/5),
    height: width * (2/7)
  }
});