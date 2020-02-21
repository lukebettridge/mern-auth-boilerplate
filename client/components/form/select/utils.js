const validate = ({ friendlyName, isMulti, isRequired, name, value }) => {
	let error = "";
	const prefix = friendlyName || name || "This";

	if (typeof value === "object") value = value.value;

	if (
		isRequired &&
		(!value ||
			(isMulti && value.length === 0) ||
			(!isMulti && value.replace(/^\s+|\s+$/g, "").length === 0))
	) {
		error = `${prefix} field is required`;
	}
	return error;
};

export { validate };
