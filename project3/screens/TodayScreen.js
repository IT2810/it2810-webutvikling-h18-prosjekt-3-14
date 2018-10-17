import React from 'react';
import Expo, {Pedometer} from "expo";
import {View, Text, AsyncStorage, StyleSheet, Button, Alert, TouchableHighlight} from 'react-native';

import {Col, Row, Grid} from "react-native-easy-grid";
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/FontAwesome';


import Helpers from "./../components/Helpers"
import LogoTitle from '../components/LogoTitle';
import colors from '../constants/Colors';
import layout from '../constants/Layout'

export default class TodayScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <LogoTitle></LogoTitle>,
      headerLeft:
        <TouchableHighlight
          onPress={() => navigation.navigate("Edit")}
          style={styles.button}
          underlayColor={colors.buttonUnderlay}
          activeOpacity={0.7}
        >
          <Icon
            name={'cog'}
            color={colors.buttonDefault}
            size={width / 15}
          />
        </TouchableHighlight>
    };
  };

  state = {
    isPedometerAvailable: null,
    pedometerStatusMsg: "checking",
    pastStepCount: null,
    userGoal: null,
    userWeight: null,
    userHeight: null,
  };

  constants = {
    circularBigSize: width * (3 / 4),
    circularBigWidth: width / 30,
  };

  /**
   * Subscribes to pedometer updates and gets todays steps
   * @returns {Promise<void>}
   * @private
   */
  _subscribe = async () => {
    await Pedometer.isAvailableAsync()
      .then(
        result => {
          this.setState({
            isPedometerAvailable: (result == 'true'),
          });
        },
        error => {
          this.setState({
            isPedometerAvailable: (result == 'true'),
            pedometerStatusMsg: "Pedometer not available: " + error
          });
        }
      );

    // Set dates
    const end = new Date();
    let start = new Date();
    start.setHours(0, 0, 0, 0);

    await Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({
          isPedometerAvailable: true,
          pastStepCount: result.steps
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: true,
          pastStepCount: 0,
          pedometerStatusMsg: "Could not get stepCount"
        });
        throw new Error(error);
      }
    );
  };

  /**
   * Gets user details from async storage and updates states
   * @returns {Promise<void>}
   * @private
   */
  _updateFromStorage = async () => {
    let user;
    await AsyncStorage.getItem('USER', (err, result) => {
      user = JSON.parse(result);
    });

    this.setState({
      userGoal: user.goal,
      userWeight: user.weight,
      userHeight: user.height
    });
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      await this._subscribe();
    }
    catch (e) {
      Alert.alert(
        this.state.pedometerStatusMsg,
        e.message,
        [{text: 'OK'}],
        {cancelable: false}
      );
    }
    this._updateFromStorage();
  }

  render() {
    const goal = parseInt(this.state.userGoal);
    const height = parseInt(this.state.userHeight);
    const weight = parseInt(this.state.userWeight);
    const pastSteps = parseInt(this.state.pastStepCount);

    const bmi = Helpers._calculateBMI(weight, height);
    // const bmiStages = Helpers._getBMIstage(parseFloat(bmi));
    const calories = Helpers._calculateCaloriesBurned(weight, height, pastSteps);
    const stepGoal = Helpers._calculateGoalProgress(pastSteps, goal);
    const distance = Helpers._calculateDistance(height, pastSteps);

    const distnaceDisplayed = distance > 1000 ? distance / 1000 : distance;
    let distanceUnit = distance > 1000 ? "KM" : "M";

    if (!this.state.isPedometerAvailable) {
      return (
        <View style={styles.container}>
          <Text>{this.state.pedometerStatusMsg}</Text>
          <Button title={"Check for accelerometer"} onPress={this._subscribe}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Grid>
            <Row size={3}>
              <AnimatedCircularProgress
                size={this.constants.circularBigSize}
                width={this.constants.circularBigWidth}
                fill={stepGoal}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {
                  (fill) => (
                    <View>
                      <Text style={styles.textInsideCircleBig}>
                        {Helpers._addSpaceBetweenNumber(this.state.pastStepCount)}
                      </Text>
                      <Text style={styles.textInsideCircleSmall}>OF
                        GOAL: {Helpers._addSpaceBetweenNumber(parseInt(this.state.userGoal))}</Text>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
            </Row>
            <Row size={1}>
              <Col>
                <Text style={styles.underTextLarge}>{(distnaceDisplayed).toFixed(2)}</Text>
                <Text style={styles.underTextSmall}>{distanceUnit}</Text>
              </Col>
              <Col>
                <Text style={styles.underTextLarge}>{calories}</Text>
                <Text style={styles.underTextSmall}>Calories</Text>
              </Col>
              <Col>
                <Text style={styles.underTextLarge}>{bmi.toFixed(2)}</Text>
                <Text style={styles.underTextSmall}>BMI</Text>
              </Col>
            </Row>
          </Grid>
        </View>
      );
    }
  }
}

const width = layout.windowSize.width; //Get sizes of the users screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },

  textInsideCircleBig: {
    textAlign: 'center',
    fontSize: screen.width * (2 / 15),
  },

  textInsideCircleSmall: {
    textAlign: 'center',
    fontSize: screen.width * (1 / 35),

  },

  underTextLarge: {
    textAlign: 'center',
    fontSize: screen.width * (1 / 15),
    margin: '-1%'
  },

  underTextSmall: {
    textAlign: 'center',
    fontSize: screen.width * (1 / 35),
    margin: '-1%',
  }
});

Expo.registerRootComponent(TodayScreen);

 

  
