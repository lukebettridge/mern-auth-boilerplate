/// <reference types="cypress" />

const user = require("../fixtures/users/user");
const admin = require("../fixtures/users/admin");

describe("Login", () => {
	context("Unauthenticated", () => {
		it("redirects to /auth/login when no session", () => {
			cy.getCookie("jwt").should("not.exist");
			cy.visit(`${Cypress.env("baseUrl")}/home`);

			cy.url().should("include", "/auth/login");
		});
	});

	context("HTML form submission", () => {
		beforeEach(() => {
			cy.visit(`${Cypress.env("baseUrl")}/auth/login`);
		});

		[
			[
				"display error on empty email",
				"",
				user.password,
				"email",
				"Email field is required"
			],
			[
				"displays error on unknown email",
				"hello@example.com",
				user.password,
				"email",
				"The email address that you've entered doesn't match any account"
			],
			[
				"displays error on invalid email",
				"foo",
				user.password,
				"email",
				"Email field is invalid"
			],
			[
				"display error on empty password",
				user.email,
				"",
				"password",
				"Password field is required"
			],
			[
				"displays error on incorrect password",
				user.email,
				"foo",
				"password",
				"The password that you've entered is incorrect"
			]
		].map(([scenario, email, password, subject, value]) =>
			it(scenario, () => {
				if (email) cy.get("input[name=email]").type(email);
				if (password) cy.get("input[name=password]").type(password);
				cy.get("form").submit();

				cy.get(`[data-cy=error][for=${subject}]`).should("contain", value);
				cy.url().should("include", "/auth/login");
			})
		);

		it("redirects to /home on success", () => {
			cy.get("input[name=email]").type(user.email);
			cy.get("input[name=password]").type(user.password);
			cy.get("form").submit();

			cy.url().should("include", "/home");
			cy.get("[data-cy=user]").should("contain", user.forename);
			cy.getCookie("jwt").should("exist");
		});
	});

	context("Direct to end point", () => {
		it("sets JWT cookie on success", () => {
			cy.request({
				method: "POST",
				url: `${Cypress.env("apiUrl")}/api/auth/login`,
				form: true,
				body: { email: user.email, password: user.password }
			});

			cy.getCookie("jwt").should("exist");
		});
	});

	context("Reusable 'login' custom command", () => {
		it("can visit /home", () => {
			cy.login(user.email, user.password);
			cy.visit(`${Cypress.env("baseUrl")}/home`);

			cy.get("[data-cy=user]").should("contain", user.forename);
		});

		it("can visit /admin/accounts", () => {
			cy.login(admin.email, admin.password);
			cy.visit(`${Cypress.env("baseUrl")}/admin/accounts`);

			cy.get("h2").should("contain", "Accounts");
		});

		it("redirects to /auth/login for unauthorized", () => {
			cy.login(user.email, user.password);
			cy.visit(`${Cypress.env("baseUrl")}/admin/accounts`);

			cy.url().should("contain", "/auth/login");
		});
	});
});
