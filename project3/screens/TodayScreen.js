import React from 'react';
import Expo from "expo";
import {Pedometer, Icon} from "expo";
import Helpers from "./../components/Helpers"

import {View, Text, AsyncStorage, StyleSheet, Button, TouchableHighlight, Platform, Alert} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import LogoTitle from '../components/LogoTitle';


export default class TodayScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isPedometerAvailable: false,
        pedometerStatusMsg: "checking",
        pastStepCount: 0,
        userGoal: 0,
        userWeight: 0,
        userHeight: 0
    };

    constants = {
        circularBigSize: 300,
        circularBigWidth: 10,
        circularSmallSize: 50,
        circularSmallWidth: 7,
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <LogoTitle></LogoTitle>,
            headerLeft: <Button title={"Edit"} onPress={() => navigation.navigate("Edit")}/>
        };
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
                    isPedometerAvailable: true,
                    pedometerStatusMsg: String(result)
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: false,
                    pedometerStatusMsg: "Pedometer not available: " + error
                });
            }
        )
            .then( () => {
                if (!this.state.isPedometerAvailable) {
                    throw new Error(this.state.pedometerStatusMsg);
                }
            });

        const end = new Date();
        let start = new Date();
        start.setHours(0, 0, 0, 0);

        await Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({pastStepCount: result.steps});
            },
            error => {
                this.setState({
                    pastStepCount: 0,
                    pedometerStatusMsg: "Could not get stepCount: " + error
                });
                throw new Error(this.state.pedometerStatusMsg);
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
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

    async componentDidMount() {
        try {
            await this._subscribe();
        }
        catch (e) {
            Alert.alert(
                e.message,
                this.state.pedometerStatusMsg,
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            );
        }
        this._updateFromStorage();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        const bmi = Helpers._calculateBMI(parseInt(this.state.userWeight), parseInt(this.state.userHeight));
        const bmiStages = Helpers._getBMIstage(parseFloat(bmi));
        const calories = Helpers._calculateCaloriesBurned(parseInt(this.state.userWeight), parseInt(this.state.userHeight), parseInt(this.state.pastStepCount));
        const distance = Helpers._calculateDistance(parseInt(this.state.userHeight), parseInt(this.state.pastStepCount));

        const stepGoal = Helpers._calculateGoalProgress(parseInt(this.state.pastStepCount), parseInt(this.state.userGoal));
        const distanceGoal = Helpers._calculateGoalProgress(parseInt(this.state.pastStepCount), parseInt(this.state.userGoal));
        const caloriesGoal = Helpers._calculateGoalProgress(parseInt(this.state.pastStepCount), parseInt(this.state.userGoal));

        if (this.state.isPedometerAvailable) {
            return (
                <View style={styles.container}>
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
                                        GOAL: {Helpers._addSpaceBetweenNumber(this.state.userGoal)}</Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                    <Text>Distance: {distance} km</Text>
                    <Text>Calories: {calories}</Text>
                    <Text style={{color: bmiStages[2]}}>BMI: {bmiStages[0]}: {bmiStages[1]}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text>{this.state.pedometerStatusMsg}</Text>
                    <Button title={"Check for accelerometer"} onPress={this._subscribe}/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
        alignItems: 'center'
    },

    textInsideCircleBig: {
        textAlign: 'center',
        fontSize: 40
    },
    textInsideCircleSmall: {
        textAlign: 'center',
        fontSize: 10
    }
});

Expo.registerRootComponent(TodayScreen);

 

  
