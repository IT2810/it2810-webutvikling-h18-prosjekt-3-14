import Helpers from "./../Helpers"



// Calculate BMI
test('_calculateBMI: Check general BMI example. Calculated using formula for BMI', () => {
    expect(Helpers._calculateBMI(80, 180)).toBe(24.691358024691358);
});

test('_calculateBMI: Check BMI with zero input', () => {
    expect(()=>Helpers._calculateBMI(0,0)).toThrow(RangeError);
});

test('_calculateBMI: Check BMI with not number input', () => {
    expect(()=>Helpers._calculateBMI("hello", "there")).toThrowError(TypeError);
});

test('_calculateBMI: Check BMI with not null  input', () => {
    expect(()=>Helpers._calculateBMI(null, null)).toThrow(TypeError);
});

// Add space between numbers
test('_addSpaceBetweenNumber: Check general example', () => {
    expect(Helpers._addSpaceBetweenNumber(1000)).toBe("1 000");
});

test('_addSpaceBetweenNumber: Check null input', () => {
    expect(Helpers._addSpaceBetweenNumber(null)).toBe(NaN);
});

test('_addSpaceBetweenNumber: Check not number', () => {
    expect(Helpers._addSpaceBetweenNumber("hello")).toBe(NaN);
});


// Calculate calories
test('_calculateCaloriesBurned: Check general example', () => {
    expect(Helpers._calculateCaloriesBurned(80, 180, 10000)).toBe(389);
});

test('_calculateCaloriesBurned: Check for 0', () => {
    expect(Helpers._calculateCaloriesBurned(0, 0, 0)).toBe(NaN);
});

test('_calculateCaloriesBurned: Check for negative numbers', () => {
    expect(()=>Helpers._calculateCaloriesBurned(-1, -2, -3)).toThrow(RangeError);
});

test('_calculateCaloriesBurned: Check not number', () => {
    expect(()=>Helpers._calculateCaloriesBurned("Hello", ["there"], null)).toThrow(TypeError);
});

// Calculate distance
test('_calculateDistance: Check general example', () => {
    expect(()=>Helpers._calculateDistance(183, 1000)).toBe("0.76"); //TODO: Find actual example
});

test('_calculateDistance: Check for 0', () => {
    expect(()=>Helpers._calculateDistance(0, 0)).toBe(0);
});

test('_calculateDistance: Check for negative numbers', () => {
    expect(()=>Helpers._calculateDistance(-1, -2)).toThrow(RangeError);
});

test('_calculateDistance: Check for not number', () => {
    expect(()=>Helpers._calculateDistance("hello", ["there"])).toThrow(TypeError);
});

// Calculate goal progress
test('_calculateGoalProgress: Check general example', () => {
    expect(()=>Helpers._calculateGoalProgress(10, 100)).toBe(10);
});

test('_calculateGoalProgress: Check 0', () => {
    expect(()=>Helpers._calculateGoalProgress(0, 0)).toThrow(RangeError);
});

test('_calculateGoalProgress: Check negative', () => {
    expect(()=>Helpers._calculateGoalProgress(-2, -3)).toThrow(RangeError);
});

test('_calculateGoalProgress: Check not number', () => {
    expect(()=>Helpers._calculateGoalProgress([2], "hello")).toThrow(RangeError);
});

// As the _calculateGoalProgress function is used for calculating the percentage to fill the circular progress bar, all current > goal => 100
test('_calculateGoalProgress: Check current > goal', () => {
    expect(()=>Helpers._calculateGoalProgress(1000, 100)).toBe(100);
});





// BMI Stage












