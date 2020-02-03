import { act } from "react-dom/test-utils";

const wait = async (amount = 0) =>
	await new Promise(resolve => setTimeout(resolve, amount));

const actAwait = async (amount = 0) =>
	act(async () => {
		await wait(amount);
	});

const updateWrapper = async (wrapper, amount = 0) =>
	act(async () => {
		await wait(amount);
		wrapper.update();
	});

export { actAwait, updateWrapper };
