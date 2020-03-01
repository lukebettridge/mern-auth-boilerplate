const validate = ({
	friendlyName,
	isRequired,
	max,
	min,
	name,
	pattern,
	value
}) => {
	let error = "";
	let prefix = friendlyName || name || "This";
	prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);

	if (isRequired && (!value || value.replace(/^\s+|\s+$/g, "").length === 0)) {
		error = `${prefix} field is required`;
	} else if (value && pattern && !RegExp(pattern).test(value)) {
		error = `${prefix} field is invalid`;
	} else if (
		typeof max === "number" &&
		typeof min === "number" &&
		(parseInt(value) < min || parseInt(value) > max)
	) {
		error = `${prefix} must be between ${min} and ${max}.`;
	} else if (typeof max === "number" && parseInt(value) > max) {
		error = `${prefix} must be smaller than ${max}.`;
	} else if (typeof min === "number" && parseInt(value) < min) {
		error = `${prefix} must be larger than ${min}.`;
	} else if (
		typeof max === "string" &&
		typeof min === "string" &&
		(value.length < min || value.length > max)
	) {
		error = `${prefix} must have a length between ${min} and ${max}.`;
	} else if (typeof max === "string" && value.length > max) {
		error = `${prefix} must have a length smaller than ${max}.`;
	} else if (typeof min === "string" && value.length < min) {
		error = `${prefix} must have a length larger than ${min}.`;
	}
	return error;
};

export { validate };
