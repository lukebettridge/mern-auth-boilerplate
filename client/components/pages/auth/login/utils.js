import axios from "axios";

const login = ({ email, password }, success, error) => {
	axios
		.post(
			"/api/auth/login",
			{ email, password },
			{
				baseURL: process.env.BASE_URL,
				withCredentials: true
			}
		)
		.then(success)
		.catch(error);
};

export { login };
