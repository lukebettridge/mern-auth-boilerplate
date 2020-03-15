import axios from "axios";

const login = ({ email, password }, success, error) => {
	axios
		.post(
			"/api/auth/login",
			{ email, password },
			{
				withCredentials: true
			}
		)
		.then(success)
		.catch(error);
};

const resetPassword = (email, success, error) => {
	axios
		.get(`/api/auth/reset-password?email=${email}`, {
			withCredentials: true
		})
		.then(success)
		.catch(error);
};

export { login, resetPassword };
