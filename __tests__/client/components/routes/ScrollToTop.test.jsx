import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";

import { ScrollToTop } from "components/routes/ScrollToTop";

global.window.scrollTo = jest.fn();
const history = { listen: jest.fn() };
const unlisten = jest.fn();

describe("ScrollToTop component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		history.listen.mockReturnValue(unlisten);
	});

	it("snapshot renders", () => {
		const subject = mount(<ScrollToTop history={history} />);
		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("calls listen prop on mount", () => {
		const subject = mount(<ScrollToTop history={history} />);
		expect(history.listen).toHaveBeenCalledWith(expect.any(Function));
		expect(subject).toEqual({});
	});

	it("calls scrollTo on change of history", () => {
		mount(<ScrollToTop history={history} />);
		history.listen.mock.calls[0][0]();

		expect(global.window.scrollTo).toHaveBeenCalledWith(0, 0);
	});

	it("calls unlisten on unmount", () => {
		const subject = mount(<ScrollToTop history={history} />);
		subject.unmount();

		expect(unlisten).toHaveBeenCalled();
	});
});
