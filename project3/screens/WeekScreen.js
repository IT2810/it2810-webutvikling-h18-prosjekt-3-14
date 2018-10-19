import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet, AsyncStorage} from 'react-native';
import PureChart from 'react-native-pure-chart';
import colors from '../constants/Colors';
import layout from "../constants/Layout";
import {Col, Grid, Row} from "react-native-easy-grid";
import {Pedometer} from "expo";
import helpers from "../utils/Helpers";
import {EventRegister} from "react-native-event-listeners";


export default class WeekScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weekData: [
                {
                    data: null,
                    color: colors.progressTint
                }],
            daysToLoad: null,
            loadedDays: null,
            userGoal: null,
            userWeight: null,
            userHeight: null,
        };
    }


    componentDidMount() {
        this.getStepCounts();  // Get users step count from Pedometer
        this.updateFromStorage(); // Get the newest update in AsyncStorage
    }


    componentWillUnmount() {
        EventRegister.removeEventListener(this.storageUpdateListener); // Unregister EventListener
    }


    componentWillMount() {
        this.storageUpdateListener = EventRegister.addEventListener('updateAsyncStorage', () => { // Add EventListener
            this.updateFromStorage();
        })
    }


    /**
     * Get the steps from this week
     * @returns {Promise<void>}
     * @private
     */
    getStepCounts() {
        // Standard structure of the data
        let data = [
            {x: 'Mon', y: 0},
            {x: 'Tue', y: 0},
            {x: 'Wed', y: 0},
            {x: 'Thu', y: 0},
            {x: 'Fri', y: 0},
            {x: 'Sat', y: 0},
            {x: 'Sun', y: 0}
        ];
        let today = new Date();
        // Right shift days to have monday as 0th day
        let todayDay = today.getDay() + -1;
        if (todayDay < 0) todayDay = 6;
        // Keep track over how many days to load so that the interface renders after every day is parsed from storage
        this.setState({
            daysToLoad: todayDay + 1
        });

        // Iterate over all days from monday until today
        for (let day = 0; day <= todayDay; day++) {
            let from = new Date();
            from.setDate(from.getDate() - (todayDay - day));
            let to = new Date();
            to.setDate(to.getDate() - (todayDay - day));

            from.setHours(0, 0, 0, 0);
            // If this is the current day, use the current time. If not, use the whole day.
            if (day !== todayDay) {
                to.setHours(23, 59, 59, 0)
            }

            // Gets the steps from this day and updates the state
            Pedometer.getStepCountAsync(from, to)
                .then(result => {
                        data[day]["y"] = result.steps;
                        this.setState({
                            weekData: [
                                {
                                    data: data,
                                    color: colors.progressTint
                                }],
                            loadedDays: this.state.loadedDays + 1,
                            isPedometerAvailable: true,
                            pedometerStatusMsg: 'OK',
                        });
                    },
                    error => {
                        this.setState({
                            isPedometerAvailable: false,
                            pedometerStatusMsg: String(error),
                        });
                    });
        }
    };


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
        } else if (this.state.loadedDays !== this.state.daysToLoad) {  // Show simple loading screen while data not collected from AsyncStorage
            return (
                <View styles={styles.loading}>
                    <ActivityIndicator style={{top: layout.windowSize.height / 3}}/>
                    <Text style={styles.loading}>Loading data..</Text>
                </View>
            ); }
            else { // Show the actual interface if all the days are loaded, and the pedometer is available
            // Parse data state and calculate relevant values for visualization
            let data = this.state.weekData[0]["data"];
            let maxSteps = data[0]["y"];
            let maxStepDay = "";
            let totalSteps = 0;
            let reachedGoalCounter = 0;
            let currentDay = parseInt(this.state.daysToLoad);
            // Loop over every day and gather relevant data
            data.forEach((element) => {
                let steps = element["y"];
                if (steps > maxSteps) {
                    maxSteps = steps;
                    maxStepDay = element["x"];
                }
                if (steps >= parseInt(this.state.userGoal)) reachedGoalCounter += 1;
                totalSteps += steps;
            });
            maxStepDay = maxStepDay.toLowerCase();
            // Calculate and formulate values
            let totalCals = helpers.calculateCaloriesBurned(
                parseInt(this.state.userWeight),
                parseInt(this.state.userHeight),
                totalSteps);
            let totalDistance = helpers.calculateDistance(parseInt(this.state.userHeight), totalSteps);
            let distanceDisplayed = totalDistance > 1000 ? totalDistance / 1000 : totalDistance;
            let distanceUnit = totalDistance > 1000 ? "km" : "meters";

            return (
                <View style={styles.container}>
                    <Grid>{/* Grid with 2 rows*/}
                        <Row size={3}>
                            <PureChart data={this.state.weekData}
                                       type='bar'
                                       showEvenNumberXaxisLabel={false}
                                       height={200}
                                       defaultColumnWidth={25}
                                       highlightColor={colors.progressBackground}
                            />
                        </Row>
                        <Row size={1}>{/* 3 internal columns for separating the 3 different values*/}
                            <Col>
                                <Text style={styles.underTextLarge}>{distanceDisplayed.toFixed(2)}</Text>
                                <Text style={styles.underTextSmall}>{distanceUnit}</Text>
                            </Col>
                            <Col>
                                <Text style={styles.underTextLarge}>{totalCals}</Text>
                                <Text style={styles.underTextSmall}>calories</Text>
                            </Col>
                            <Col>
                                <Text style={styles.underTextLarge}>{totalSteps}</Text>
                                <Text style={styles.underTextSmall}>steps</Text>
                            </Col>
                        </Row>
                        <Row size={1}>{/* 3 internal columns for separating the 3 different values*/}
                            <Col>
                                <Text style={styles.underTextLarge}>{reachedGoalCounter} / {currentDay}</Text>
                                <Text style={styles.underTextSmall}>Goals reached</Text>
                            </Col>
                            <Col>
                                <Text style={styles.underTextLarge}>{maxSteps}</Text>
                                <Text style={styles.underTextSmall}>max steps ({maxStepDay})</Text>
                            </Col>
                        </Row>
                    </Grid>
                </View>
            ); }
    }
}

const width = layout.windowSize.width;   //Get width of the users screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    chartContainer: {
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
});
