import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import WeekScreen from "../WeekScreen";
it("PedometerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<WeekScreen/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});