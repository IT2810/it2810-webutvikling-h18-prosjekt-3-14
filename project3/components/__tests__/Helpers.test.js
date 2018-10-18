import Helpers from "./../Helpers"


// Calculate BMI
test('calculateBMI: Check general BMI example. Calculated using formula for BMI', () => {
    expect(Helpers.calculateBMI(80, 180)).toBe(24.691358024691358);
});

test('calculateBMI: Check BMI with zero input', () => {
    expect(()=>{Helpers.calculateBMI(0,0)}).toThrow(RangeError);
});

test('calculateBMI: Check BMI with not number input', () => {
    expect(()=>Helpers.calculateBMI("hello", "there")).toThrowError(TypeError);
});

test('calculateBMI: Check BMI with not null  input', () => {
    expect(()=>Helpers.calculateBMI(null, null)).toThrow(TypeError);
});

// Add space between numbers
test('addSpaceBetweenNumber: Check general example', () => {
    expect(Helpers.addSpaceBetweenNumber(1000)).toBe("1 000");
});

test('addSpaceBetweenNumber: Check null input', () => {
    expect(Helpers.addSpaceBetweenNumber(null)).toBe(NaN);
});

test('addSpaceBetweenNumber: Check not number', () => {
    expect(Helpers.addSpaceBetweenNumber("general")).toBe(NaN);
});


// Calculate calories
test('calculateCaloriesBurned: Check general example', () => {
    expect(Helpers.calculateCaloriesBurned(80, 180, 10000)).toBe(389);
});

test('calculateCaloriesBurned: Check for 0', () => {
    expect(Helpers.calculateCaloriesBurned(0, 0, 0)).toBe(0);
});

test('calculateCaloriesBurned: Check for negative numbers', () => {
    expect(()=>Helpers.calculateCaloriesBurned(-1, -2, -3)).toThrow(RangeError);
});

test('calculateCaloriesBurned: Check not number', () => {
    expect(()=>Helpers.calculateCaloriesBurned("kenobi", [""], null)).toThrow(TypeError);
});

// Calculate distance
test('calculateDistance: Check general example', () => {
    expect(Helpers.calculateDistance(183, 1000)).toBe(757.62); //TODO: Find actual example
});

test('calculateDistance: Check for 0', () => {
    expect(Helpers.calculateDistance(0, 0)).toBe(0);
});

test('calculateDistance: Check for negative numbers', () => {
    expect(()=>Helpers.calculateDistance(-1, -2)).toThrow(RangeError);
});

test('calculateDistance: Check for not number', () => {
    expect(()=>Helpers.calculateDistance("ur", ["mom"])).toThrow(TypeError);
});

// Calculate goal progress
test('calculateGoalProgress: Check general example', () => {
    expect(Helpers.calculateGoalProgress(10, 100)).toBe(10);
});

test('calculateGoalProgress: Check 0', () => {
    expect(()=>Helpers.calculateGoalProgress(0, 0)).toThrow(RangeError);
});

test('calculateGoalProgress: Check negative', () => {
    expect(()=>Helpers.calculateGoalProgress(-2, -3)).toThrow(RangeError);
});

test('calculateGoalProgress: Check not number', () => {
    expect(()=>Helpers.calculateGoalProgress([2], "hello")).toThrow(TypeError);
});

// As the calculateGoalProgress function is used for calculating the percentage to fill the circular progress bar, all current > goal => 100
test('calculateGoalProgress: Check current > goal', () => {
    expect(Helpers.calculateGoalProgress(1000, 100)).toBe(100);
});
