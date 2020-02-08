Cypress.Commands.add("login", (email, password) => {
	Cypress.log({
		name: "login",
		message: `${email} | ${password}`
	});

	return cy.request({
		method: "POST",
		url: `${Cypress.env("apiUrl")}/api/auth/login`,
		form: true,
		body: { email, password }
	});
});
