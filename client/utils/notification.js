module.exports = ref => ({
	ref,
	success: (message = "") => {
		ref.current.addNotification({
			message,
			title: "Success",
			level: "success",
			position: "bl"
		});
	}
});
