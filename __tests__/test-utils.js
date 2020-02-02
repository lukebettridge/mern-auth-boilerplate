import { act } from "react-dom/test-utils";

const wait = async (amount = 0) =>
	await new Promise(resolve => setTimeout(resolve, amount));

module.exports = {
	actAwait: async (amount = 0) =>
		act(async () => {
			await wait(amount);
		}),
	updateWrapper: async (wrapper, amount = 0) =>
		act(async () => {
			await wait(amount);
			wrapper.update();
		})
};
