import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import ProfileScreen from "../ProfileScreen";
it("PedometerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<ProfileScreen/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});