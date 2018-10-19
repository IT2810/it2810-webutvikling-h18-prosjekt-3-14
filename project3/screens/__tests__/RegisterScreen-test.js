import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import RegisterScreen from "../RegisterScreen";
it("PedometerScreen Matches snapshot.", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<RegisterScreen/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});