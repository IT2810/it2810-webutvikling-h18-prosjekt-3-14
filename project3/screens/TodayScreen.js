import React from 'react';
import Expo, {Pedometer} from "expo";
import {ActivityIndicator, AsyncStorage, StyleSheet, Text, View} from 'react-native';

import {EventRegister} from 'react-native-event-listeners'
import {Col, Grid, Row} from "react-native-easy-grid";
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import helpers from "../utils/Helpers"
import colors from '../constants/Colors';
import layout from '../constants/Layout';


export default class TodayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStepCount: 0,
            isPedometerAvailable: null,
            pedometerStatusMsg: "checking",
            pastStepCount: null,
            userGoal: null,
            userWeight: null,
            userHeight: null,
            isLoading: true,
            user: null
        };
        this.constants = {
            circularBigSize: width * (3 / 4),
            circularBigWidth: width / 30,
        };
    }

    componentWillMount() {
        this.storageUpdateListener = EventRegister.addEventListener('updateAsyncStorage', () => { // Add EventListener
            this.updateFromStorage();
        })
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.storageUpdateListener); // Unregister EventListener
        this.unsubscribe();
    }

  async componentDidMount() {
    this.subscribeToPedometerUpdates();
    this.updateFromStorage(); // Get the newest update in AsyncStorage
    await this.getStepCount();  // Get users step count from Pedometer
  }

  subscribeToPedometerUpdates() {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });
  }

  /**
   * Get todays steps from pedometer
   * @returns {Promise<void>}
   * @private
   */
  async getStepCount() {
    // Set dates to be today
    const end = new Date();
    let start = new Date();
    start.setHours(0, 0, 0, 0);   // Set time so that you get all steps from 00:00 today

    await Pedometer.getStepCountAsync(start, end)
      .then(result => {
          this.setState({
            isPedometerAvailable: true,
            pastStepCount: result.steps,
            pedometerStatusMsg: 'OK',
          });
        },
        error => {
          this.setState({
            isPedometerAvailable: false,
            pastStepCount: 0,
            pedometerStatusMsg: String(error),
          });
        });
  };

    unsubscribe() {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    }

    /**
     * Gets user details from async storage and updates states
     * @returns {Promise<void>}
     * @private
     */
    updateFromStorage() {
        AsyncStorage.getItem('USER', (err, result) => {
            let user = JSON.parse(result);
            this.setState({
                isLoading: false,
                userGoal: user.goal,
                userWeight: user.weight,
                userHeight: user.height,
                user: user,
            })
        });
    };

    render() {
        if (!this.state.isPedometerAvailable) { // Show error screen if there pedometer isn't available
            return (
                <View style={styles.container}>
                    <Text style={styles.errorMsg}>{this.state.pedometerStatusMsg}</Text>
                </View>
            );
        } else if (this.state.isLoading) {  // Show loading screen while data not collected from AsyncStorage
            return (
                <View styles={styles.loading}>
                    <ActivityIndicator style={{top: layout.windowSize.height / 3}}/>
                    <Text style={styles.loading}>Loading data..</Text>
                </View>
            );
        } else {  // Show normal view
            // Parse states
            const goal = parseInt(this.state.userGoal);
            const height = parseInt(this.state.userHeight);
            const weight = parseInt(this.state.userWeight);
            const pastSteps = parseInt(this.state.pastStepCount);
            const currentSteps = parseInt(this.state.currentStepCount);
            let totaltSteps = pastSteps + currentSteps;

            const bmi = helpers.calculateBMI(weight, height);
            const calories = helpers.calculateCaloriesBurned(weight, height, totaltSteps);
            const stepGoal = helpers.calculateGoalProgress(totaltSteps, goal); //Step goal is between 0-100 as it is used for the percentage to fill the progress bar

            // Display distance with appropriate unit
            const distance = helpers.calculateDistance(height, totaltSteps);
            const distanceDisplayed = distance > 1000 ? distance / 1000 : distance;
            const distanceUnit = distance > 1000 ? "km" : "meters";

            return (
                <View style={styles.container}>
                    <Grid>{/* Grid with 2 rows*/}
                        <Row size={3}>
                            <AnimatedCircularProgress
                                size={this.constants.circularBigSize}
                                width={this.constants.circularBigWidth}
                                fill={stepGoal}
                                tintColor={colors.progressTint}
                                backgroundColor={colors.progressBackground}>
                                {() => (
                                    <View>
                                        <Text
                                            style={styles.textInsideCircleBig}>{helpers.addSpaceBetweenNumber(totaltSteps)}</Text>
                                        <Text style={styles.textInsideCircleSmall}>OF
                                            GOAL: {helpers.addSpaceBetweenNumber(goal)}</Text>
                                    </View>
                                )}
                            </AnimatedCircularProgress>
                        </Row>
                        <Row size={1}>{/* 3 internal columns for separating the 3 different values*/}
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

const width = layout.windowSize.width;   //Get width of the users screen
const height = layout.windowSize.height; //Get height of the users screen

// All styles for TodayScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: colors.defaultBackground,
        alignItems: 'center',
    },

    loading: {
        color: colors.fontColor,
        alignSelf: 'center',
        textAlign: 'center',
        top: height / 3
    },

    textInsideCircleBig: {
        color: colors.fontColor,
        textAlign: 'center',
        fontSize: width * (2 / 15), // Use screen width to get relative sizes
    },

    textInsideCircleSmall: {
        color: colors.fontColor,
        textAlign: 'center',
        fontSize: width * (1 / 35),

    },

    underTextLarge: {
        color: colors.fontColor,
        textAlign: 'center',
        fontSize: width * (1 / 15),
    },

    underTextSmall: {
        color: colors.fontColor,
        textAlign: 'center',
        fontSize: width * (1 / 35),
    },

    errorMsg: {
        color: colors.fontColor,
        top: height / 3,
    }
});

Expo.registerRootComponent(TodayScreen);
