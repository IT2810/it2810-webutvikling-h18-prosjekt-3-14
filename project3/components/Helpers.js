import Expo from 'expo'

export default class Helpers {

  /**
   * Gets the calories burned based on a formula found online
   * @param weight Users weight
   * @param height Users height
   * @param steps Number of steps taken today
   * @returns {number}
   */
  static calculateCaloriesBurned(weight, height, steps) {
    if (typeof weight !== typeof 0 || typeof height !== typeof 0 || typeof steps !== typeof 0) {
      throw new TypeError("Input not numbers");
    }
    if (weight < 0 || height < 0 || steps < 0) {
      throw new RangeError("Input out of range");
    }

    const distance = parseFloat(Helpers.calculateDistance(height, steps));
    const time = distance / 1.34112 > 0 ? distance / 1.34112 : 1;   // Guaranteed no zero division
    const met = (distance / time * 2.23693629);
    return Math.round(met * 3.5 * (weight) / 200 * (time / 60)); // Formula found online
  };

  /**
   * Formats numbers to have spaces for every third number. 1000 -> 1 000.
   * Regex found: {@link https://answers.acrobatusers.com/How-to-separate-thousands-with-space-and-adding-2-decimal-places-q282162.aspx}
   * @param number
   * @returns {String}
   */
  static addSpaceBetweenNumber(number) {
    if (typeof number !== typeof 0) {
      return NaN;
    }

    return number != null ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : null;
  };

  /**
   * Calculates BMI with formula: weight/(height)²
   * @param weight Weight in KG
   * @param height Height in CM
   * @returns {number}
   */
  static calculateBMI(weight, height) {
    if (typeof weight !== typeof 0 || typeof height !== typeof 0) {
      throw new TypeError("Input not numbers");
    }
    if (weight < 0 || height <= 0) {
      throw new RangeError("Input out of range");
    }

    height = height === 0 ? 1 : height;
    return weight / ((height / 100)) ** 2;
  };

  /**
   * Calculate distance walked based on users step distance which is estimated from users height
   * @param height Height of user in CM
   * @param steps Number of steps taken
   * @returns {number}
   */
  static calculateDistance(height, steps) {
    if (typeof height !== typeof 0 || typeof steps !== typeof 0) {
      throw new TypeError("Input not numbers");
    }
    if (height < 0 || steps < 0) {
      throw new RangeError("Input out of range");
    }

    let sd = (height * 0.414) / 100; // step distance. Formula found online
    return steps * sd;
  };

  /**
   * Calculates the percentage done on a goal, outputs 100 if current > goal
   * @param current
   * @param goal
   * @returns {number}
   */
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
