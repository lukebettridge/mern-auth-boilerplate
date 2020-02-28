module.exports = date => {
	if (typeof date === "string") date = new Date(parseInt(date));
	else if (typeof date === "number") date = new Date(date);
	try {
		return date.toLocaleDateString("en-GB", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		});
	} catch {
		return null;
	}
};
