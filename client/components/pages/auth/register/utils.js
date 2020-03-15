import axios from "axios";

const register = (
	{ forename, surname, email, password, password2 },
	success,
	error
) => {
	axios
		.post("/api/auth/register", {
			forename,
			surname,
			email,
			password,
			password2
		})
		.then(success)
		.catch(error);
};

export { register };
