import helpers from "../Helpers"


// Calculate BMI
test('calculateBMI: Check general BMI example. Calculated using formula for BMI', () => {
    expect(helpers.calculateBMI(80, 180)).toBe(24.691358024691358);
});

test('calculateBMI: Check BMI with zero input', () => {
    expect(()=>{helpers.calculateBMI(0,0)}).toThrow(RangeError);
});

test('calculateBMI: Check BMI with not number input', () => {
    expect(()=>helpers.calculateBMI("hello", "there")).toThrowError(TypeError);
});

test('calculateBMI: Check BMI with not null  input', () => {
    expect(()=>helpers.calculateBMI(null, null)).toThrow(TypeError);
});

// Add space between numbers
test('addSpaceBetweenNumber: Check general example', () => {
    expect(helpers.addSpaceBetweenNumber(1000)).toBe("1 000");
});

test('addSpaceBetweenNumber: Check null input', () => {
    expect(helpers.addSpaceBetweenNumber(null)).toBe(NaN);
});

test('addSpaceBetweenNumber: Check not number', () => {
    expect(helpers.addSpaceBetweenNumber("general")).toBe(NaN);
});


// Calculate calories
test('calculateCaloriesBurned: Check general example', () => {
    expect(helpers.calculateCaloriesBurned(80, 180, 10000)).toBe(423);
});

test('calculateCaloriesBurned: Check for 0', () => {
    expect(helpers.calculateCaloriesBurned(0, 0, 0)).toBe(0);
});

test('calculateCaloriesBurned: Check for negative numbers', () => {
    expect(()=>helpers.calculateCaloriesBurned(-1, -2, -3)).toThrow(RangeError);
});

test('calculateCaloriesBurned: Check not number', () => {
    expect(()=>helpers.calculateCaloriesBurned("kenobi", [""], null)).toThrow(TypeError);
});

// Calculate distance
test('calculateDistance: Check general example', () => {
    expect(helpers.calculateDistance(183, 1000)).toBe(823.5000000000001); //TODO: Find actual example
});

test('calculateDistance: Check for 0', () => {
    expect(helpers.calculateDistance(0, 0)).toBe(0);
});

test('calculateDistance: Check for negative numbers', () => {
    expect(()=>helpers.calculateDistance(-1, -2)).toThrow(RangeError);
});

test('calculateDistance: Check for not number', () => {
    expect(()=>helpers.calculateDistance("ur", ["mom"])).toThrow(TypeError);
});

// Calculate goal progress
test('calculateGoalProgress: Check general example', () => {
    expect(helpers.calculateGoalProgress(10, 100)).toBe(10);
});

test('calculateGoalProgress: Check 0', () => {
    expect(()=>helpers.calculateGoalProgress(0, 0)).toThrow(RangeError);
});

test('calculateGoalProgress: Check negative', () => {
    expect(()=>helpers.calculateGoalProgress(-2, -3)).toThrow(RangeError);
});

test('calculateGoalProgress: Check not number', () => {
    expect(()=>helpers.calculateGoalProgress([2], "hello")).toThrow(TypeError);
});

// As the calculateGoalProgress function is used for calculating the percentage to fill the circular progress bar, all current > goal => 100
test('calculateGoalProgress: Check current > goal', () => {
    expect(helpers.calculateGoalProgress(1000, 100)).toBe(100);
});
