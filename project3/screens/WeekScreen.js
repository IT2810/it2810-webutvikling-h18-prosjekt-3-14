import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PureChart from 'react-native-pure-chart';
import colors from '../constants/Colors';
import layout from "../constants/Layout";
import {Col, Grid, Row} from "react-native-easy-grid";


export default class WeekScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sampleData: [
                {
                    data: [
                        {x: 'Mon', y: 9124},
                        {x: 'Tue', y: 8042},
                        {x: 'Wed', y: 12004},
                        {x: 'Thu', y: 5421},
                        {x: 'Fri', y: 6621},
                        {x: 'Sat', y: 8525},
                        {x: 'Sun', y: 11158}
                    ],
                    color: colors.progressBackground
                }]};
    }

    render() {
        return (
            <View style={styles.container}>
                <Grid>{/* Grid with 2 rows*/}
                    <Row size={3}>
                        <PureChart data={this.state.sampleData}
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
