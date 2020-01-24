module.exports = (len = 10, date = null) => {
	let str = [...Array(len)].map(() => ((Math.random() * 36) | 0).toString(36))
		.join``;
	return date ? str + `${date.getTime()}` : str;
};
