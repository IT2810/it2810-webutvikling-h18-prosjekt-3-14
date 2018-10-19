import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PureChart from 'react-native-pure-chart';
import colors from '../constants/Colors';
import layout from "../constants/Layout";
import {Col, Grid, Row} from "react-native-easy-grid";
import {EventRegister} from "react-native-event-listeners";
import {Pedometer} from "expo";


export default class WeekScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weekData: [
                {
                    data: null,
                    color: colors.progressBackground
                }],
            };
    }

    componentDidMount() {
        this.getStepCount();  // Get users step count from Pedometer
    }


    /**
     * Get the steps from this week
     * @returns {Promise<void>}
     * @private
     */
    getStepCount() {
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
        let today_day = today.getDay() + -1;
        if (today_day < 0) today_day = 6;

        // Iterate over all days from monday until today
        for (let day = 0; day <= today_day; day++) {
            let from = new Date();
            from.setDate(from.getDate() - (today_day - day));
            let to = new Date();
            to.setDate(to.getDate() - (today_day - day));
            console.log(from.getDate());

            from.setHours(0, 0, 0, 0);
            // If this is the current day, use the current time. If not, use the whole day.
            if (day !== today_day) {
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
                                    color: colors.progressBackground
                                }],
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


    render() {
        return (
            <View style={styles.container}>
                <Grid>{/* Grid with 2 rows*/}
                    <Row size={3}>
                        <PureChart data={this.state.weekData}
                                   type='bar'
                                   showEvenNumberXaxisLabel={false}
                                   height={200}
                                   defaultColumnWidth={25}
                                   highlightColor={colors.progressTint}
                        />
                    </Row>
                    <Row size={1}>{/* 3 internal columns for separating the 3 different values*/}
                        <Col>
                            <Text style={styles.underTextLarge}>Avg</Text>
                            <Text style={styles.underTextSmall}>Unit</Text>
                        </Col>
                        <Col>
                            <Text style={styles.underTextLarge}>Min</Text>
                            <Text style={styles.underTextSmall}>Unit</Text>
                        </Col>
                        <Col>
                            <Text style={styles.underTextLarge}>Max</Text>
                            <Text style={styles.underTextSmall}>Unit</Text>
                        </Col>
                    </Row>
                    <Row size={1}>{/* 3 internal columns for separating the 3 different values*/}
                        <Col>
                            <Text style={styles.underTextLarge}>Avg</Text>
                            <Text style={styles.underTextSmall}>Unit</Text>
                        </Col>
                        <Col>
                            <Text style={styles.underTextLarge}>Min</Text>
                            <Text style={styles.underTextSmall}>Unit</Text>
                        </Col>
                        <Col>
                            <Text style={styles.underTextLarge}>Max</Text>
                            <Text style={styles.underTextSmall}>Unit</Text>
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

const width = layout.windowSize.width;   //Get width of the users screen
const height = layout.windowSize.height; //Get height of the users screen

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
