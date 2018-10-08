import React from 'react';
import Expo from "expo";
import {Pedometer, Icon} from "expo";

import {View, Text, AsyncStorage, StyleSheet, Button, TouchableHighlight, Platform} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import LogoTitle from '../components/LogoTitle';


export default class TodayScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0,
        userGoal: 0,
        userWeight: 0,
        userHeight: 0
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <LogoTitle></LogoTitle>,
            headerLeft: <Button title={"Edit"} onPress={() => navigation.navigate("Edit")}/>
        };
    };

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

    _calculateGoalProgress = () => {
        return this.state.pastStepCount / this.state.userGoal <= 1 ? (this.state.pastStepCount / this.state.userGoal) * 100 : 100;
    };

    _calculateDistanceWalked = () => {

    }

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
        return (
            <View style={styles.container}>
                <AnimatedCircularProgress
                    size={300}
                    width={7}
                    fill={this._getGoalProgress()}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                        (fill) => (
                            <View>
                                <Text style={styles.textInsideCircleBig}>
                                    {this._addSpaceBetweenNumber(this.state.pastStepCount)}
                                </Text>
                                <Text style={styles.textInsideCircleSmall}>OF
                                    GOAL: {this._addSpaceBetweenNumber(this.state.userGoal)}</Text>
                            </View>
                        )
                    }
                </AnimatedCircularProgress>
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

 

  
