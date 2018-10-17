export default class Helpers {

    static calculateCaloriesBurned(weight, height, steps) {
        if (typeof weight !== typeof 0|| typeof height !== typeof 0|| typeof steps !== typeof 0) {
            throw new TypeError("Input not numbers");
        }
        if (weight < 0 || height < 0 || steps < 0) {
            throw new RangeError("Input out of range");
        }

        const distance = parseFloat(Helpers.calculateDistance(height,steps));
        const time = distance/1.34112;
        const met = (distance/time*2.23693629);
        return Math.round(met * 3.5 * (weight) / 200 * (time/60)); // formula found online
    };

    static addSpaceBetweenNumber(number) {
        if (typeof number !== typeof 0) {
            return NaN;
        }

        return number != null ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : null;
    };

    static calculateBMI(weight, height) {
        if (typeof weight !== typeof 0 || typeof height !== typeof 0) {
            throw new TypeError("Input not numbers");
        }
        if (weight < 0 || height <= 0) {
            throw new RangeError("Input out of range");
        }

        height = height === 0 ? 1 : height;
        return weight / ((height/100))**2;
    };

    static calculateDistance(height, steps) {
        if (typeof height !== typeof 0 || typeof steps !== typeof 0) {
            throw new TypeError("Input not numbers");
        }
        if (height < 0 || steps < 0) {
            throw new RangeError("Input out of range");
        }

        let sd = (height*0.414)/100; // step distance. Formula found online
        return steps * sd;
    };

    static calculateGoalProgress(current, goal) {
        if (typeof current !== typeof 0 || typeof goal !== typeof 0) {
            throw new TypeError("Input not numbers");
        }
        if (current < 0 || goal <= 0) {
            throw new RangeError("Goal cannot be 0 or lower");
        }
        return current / goal <= 1 ? (current / goal) * 100 : 100;
    };
}

Expo.registerRootComponent(Helpers);
