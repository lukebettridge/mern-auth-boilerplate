const validate = ({ friendlyName, isRequired, name, value }) => {
	let error = "";
	let prefix = friendlyName || name || "This";
	prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);

	if (isRequired && (!value || value.replace(/^\s+|\s+$/g, "").length === 0)) {
		error = `${prefix} field is required`;
	}
	return error;
};

export { validate };
