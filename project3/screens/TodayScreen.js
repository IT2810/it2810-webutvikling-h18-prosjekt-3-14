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

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps
            });
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result)
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: "Could not get isPedometerAvailable: " + error
                });
            }
        );

        const end = new Date();
        let start = new Date();
        start.setHours(0, 0, 0, 0);

        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({pastStepCount: result.steps});
            },
            error => {
                this.setState({
                    pastStepCount: "Could not get stepCount: " + error
                });
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

        this.setState({userGoal: user.goal});
        this.setState({userWeight: user.weight});
        this.setState({userHeight: user.height});
    };

    _addSpaceBetweenNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    _getGoalProgress = () => {
        return this.state.pastStepCount / this.state.userGoal <= 1 ? (this.state.pastStepCount / this.state.userGoal) * 100 : 100;
    };

    componentDidMount() {
        this._subscribe();
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

 

  
