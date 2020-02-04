import axios from "axios";

const resetPassword = (
	{ resetKey, newPassword, newPassword2 },
	success,
	error
) => {
	axios
		.post(
			"/api/auth/reset-password",
			{
				resetKey,
				newPassword,
				newPassword2
			},
			{ baseURL: process.env.BASE_URL }
		)
		.then(success)
		.catch(error);
};

export { resetPassword };
