import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import EditScreen from "../EditScreen";
it("PedometerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<EditScreen/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});