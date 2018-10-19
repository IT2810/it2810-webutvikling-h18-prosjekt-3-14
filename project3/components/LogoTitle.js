import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

class LogoTitle extends Component {
    render() {
        return (
            <View style={styles.imageview}>
                <Image
                    source={require('../walktrue.jpg')}
                    style={{width: "50%", height: 25, resizeMode: 'contain',}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageview: {
        width: "100%",
        alignItems: "center",
    }
});

export default LogoTitle;