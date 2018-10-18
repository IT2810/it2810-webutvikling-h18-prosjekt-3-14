import React from 'react';
import Expo, {Pedometer} from "expo";
import {View, Text, AsyncStorage, StyleSheet, Button, Alert, TouchableHighlight} from 'react-native';

import {Col, Row, Grid} from "react-native-easy-grid";
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/FontAwesome';

import Helpers from "./../components/Helpers"
import LogoTitle from '../components/LogoTitle';
import colors from '../constants/Colors';
import layout from '../constants/Layout';

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
            size={26}
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

  constructor(props) {
    super(props);
  }

  /**
   * Get todays steps from pedometer
   * @returns {Promise<void>}
   * @private
   */
  async getStepCount() {
    // Set dates
    const end = new Date();
    let start = new Date();
    start.setHours(0, 0, 0, 0);   // Set time so that you get all steps from 00:00 today

    await Pedometer.getStepCountAsync(start, end)
      .then(
        result => {
          this.setState({
            isPedometerAvailable: true,
            pastStepCount: result.steps
          });
        },
        error => {
          this.setState({
            isPedometerAvailable: false,
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
  async updateFromStorage() {
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

  async componentDidMount() {
    try {
      await this.getStepCount();
    }
    catch (e) { // Send an alert with the error message
      Alert.alert(
        this.state.pedometerStatusMsg,
        e.message,
        [{text: 'OK'}],
        {cancelable: false}
      );
    }
    this.updateFromStorage();
  }

  render() {
    // Parse states
    const goal = parseInt(this.state.userGoal);
    const height = parseInt(this.state.userHeight);
    const weight = parseInt(this.state.userWeight);
    const pastSteps = parseInt(this.state.pastStepCount);

    const bmi = Helpers.calculateBMI(weight, height);
    const calories = Helpers.calculateCaloriesBurned(weight, height, pastSteps);
    const stepGoal = Helpers.calculateGoalProgress(pastSteps, goal); //Step goal is between 0-100 as it is used for the percentage to fill the progress bar

    // Display distance with appropriate unit
    const distance = Helpers.calculateDistance(height, pastSteps);
    const distanceDisplayed = distance > 1000 ? distance / 1000 : distance;
    const distanceUnit = distance > 1000 ? "KM" : "Meters";

    if (!this.state.isPedometerAvailable) { // Show error screen if there pedometer isn't available
      return (
        <View style={styles.container}>
          <Text>{this.state.pedometerStatusMsg}</Text>
          <Button title={"Check for accelerometer"} onPress={this.getStepCount}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Grid>  /* Grid with 2 rows*/
            <Row size={3}>
              <AnimatedCircularProgress
                size={this.constants.circularBigSize}
                width={this.constants.circularBigWidth}
                fill={stepGoal}
                tintColor={colors.progressTint}
                backgroundColor={colors.progressBackground}>
                {
                  (fill) => (
                    <View>
                      <Text style={styles.textInsideCircleBig}>
                        {Helpers.addSpaceBetweenNumber(this.state.pastStepCount)}
                      </Text>
                      <Text style={styles.textInsideCircleSmall}>OF
                        GOAL: {Helpers.addSpaceBetweenNumber(parseInt(this.state.userGoal))}</Text>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
            </Row>
            <Row size={1}> /* 3 internal columns for separating the 3 different values*/
              <Col>
                <Text style={styles.underTextLarge}>{(distanceDisplayed).toFixed(2)}</Text>
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
    backgroundColor: colors.defaultBackground,
    alignItems: 'center'
  },

  textInsideCircleBig: {
    textAlign: 'center',
    fontSize: width * (2 / 15), // Use screen width to get relative sizes
  },

  textInsideCircleSmall: {
    textAlign: 'center',
    fontSize: width * (1 / 35),

  },

  underTextLarge: {
    textAlign: 'center',
    fontSize: width * (1 / 15),
    margin: '-1%'
  },

  underTextSmall: {
    textAlign: 'center',
    fontSize: width * (1 / 35),
    margin: '-1%',
  },

  button: {
    left: '20%'
  }
});

Expo.registerRootComponent(TodayScreen);
