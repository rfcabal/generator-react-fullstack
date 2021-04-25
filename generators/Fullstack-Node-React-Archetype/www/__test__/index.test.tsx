import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

describe("Main control testing", function () {

    /*it('renders without problems', function () {
        let app = ReactTestUtils.renderIntoDocument(<SignIn/>);
        expect(app).not.toBeNull();
    });

    it('renders without crashing', () => {
        const container = document.createElement('div'); // create the div here
        ReactDOM.render(<SignIn />, container);
    });*/

    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });

});
