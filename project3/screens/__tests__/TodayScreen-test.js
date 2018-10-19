import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import TodayScreen from "../TodayScreen";
it("PedometerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TodayScreen/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});