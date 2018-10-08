import React from "react";
import Expo from "expo";
import TodayScreen from "../screens/TodayScreen";


export default class Helpers {

    static _calculateCaloriesBurned = (weight, height, steps) => {
        if (typeof weight !== "number" || typeof height !== "number" || typeof steps !== "number") {
            throw new TypeError("Input not numbers");
        }
        if (weight < 0 || height < 0 || steps < 0) {
            throw new RangeError("Input out of range");
        }

        let distance = Helpers._calculateDistance(height,steps);
        let time = distance/1.34112;
        let met = (distance/time*2.23693629);
        return Math.round(met * 3.5 * (weight) / 200 * (time/60)); // formula found online
    };

    static _addSpaceBetweenNumber = (number) => {
        return number != null ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : null;
    };

    static _calculateBMI = (weight, height) => {
        if (typeof weight !== "number" || typeof height !== "number" ) {
            throw new TypeError("Input not numbers");
        }
        if (weight < 0 || height < 0) {
            throw new RangeError("Input out of range");
        }

        height = height === 0 ? 1 : height;
        return (weight / ((height/100))**2).toFixed(2);
    };

    static _calculateDistance = (height, steps) => {
        let sd = (height*0.414)/100; // step distance. Formula found online
        return ((steps * sd)/1000).toFixed(2);
    };
}

Expo.registerRootComponent(Helpers);
