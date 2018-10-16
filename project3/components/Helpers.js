import React from "react";
import Expo from "expo";
import TodayScreen from "../screens/TodayScreen";


export default class Helpers {

    static _calculateCaloriesBurned = (weight, height, steps) => {
        if (typeof weight !== typeof 0|| typeof height !== typeof 0|| typeof steps !== typeof 0) {
            throw new TypeError("Input not numbers");
        }
        if (weight < 0 || height < 0 || steps < 0) {
            throw new RangeError("Input out of range");
        }

        const distance = parseFloat(Helpers._calculateDistance(height,steps));
        const time = distance/1.34112;
        const met = (distance/time*2.23693629);
        return Math.round(met * 3.5 * (weight) / 200 * (time/60)); // formula found online
    };

    static _addSpaceBetweenNumber = (number) => {
        if (typeof number !== typeof 0) {
            return NaN;
        };

        return number != null ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : null;
    };

    static _calculateBMI = (weight, height) => {
        if (typeof weight !== typeof 0 || typeof height !== typeof 0) {
            throw new TypeError("Input not numbers");
        }
        if (weight < 0 || height <= 0) {
            throw new RangeError("Input out of range");
        }

        height = height === 0 ? 1 : height;
        return weight / ((height/100))**2;
    };

    static _calculateDistance = (height, steps) => {
        if (typeof height !== typeof 0 || typeof steps !== typeof 0) {
            throw new TypeError("Input not numbers");
        }
        if (height < 0 || steps < 0) {
            throw new RangeError("Input out of range");
        }

        let sd = (height*0.414)/100; // step distance. Formula found online
        return (steps * sd);
    };

    static _mapInt = (mappedNumber, inMin, inMax, outMin, outMax) => {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };

    static _calculateGoalProgress = (current, goal) => {
        if (current < 0 || goal <= 0) {
            throw new RangeError("Goal cannot be 0 or lower");
        }
        return current / goal <= 1 ? (current / goal) * 100 : 100;
    };

    static _getBMIstage = (bmi) => {
        if (typeof bmi !== typeof 0) {
            throw new TypeError("Input not numbers");
        }
        if (bmi < 0) {
            throw new RangeError("Input out of range");
        }

        if (bmi < 18.5) {
            return [bmi, "Underweight", "#87b5ff"];
        } else if (bmi >= 18.5 && bmi < 25.0) {
            return [bmi, "Normal weight", "#17d629"];
        } else if (bmi >= 25.0 && bmi < 30.0) {
            return [bmi, "Overweight", "#ffd333"];
        } else if (bmi >= 30.0 && bmi < 35.0) {
            return [bmi, "Class I obesity", "#ff7c02"];
        } else if (bmi >= 35 && bmi < 40.0) {
            return [bmi, "Class II obesity", "#ff002c"];
        } else if (bmi >= 40) {
            return [bmi, "Class III obesity", "#ff0002"];
        } else {
            return [bmi, "No BMI stage", "#fff"];
        }
    }
}

Expo.registerRootComponent(Helpers);
