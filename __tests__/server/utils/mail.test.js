const nodemailer = require("nodemailer");

const mail = require("server/utils/mail");

jest.mock("nodemailer", () => ({
	createTransport: jest.fn()
}));
const sendMail = jest.fn();

global.process.env = {
	MAIL_HOST: "host",
	MAIL_PORT: 465,
	MAIL_USERNAME: "username",
	MAIL_PASSWORD: "password",
	MAIL_FROM: "hello@example.com",
	APP_NAME: "app"
};

describe("mail utility", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		nodemailer.createTransport.mockReturnValue({ sendMail });
	});

	it("sends an email", () => {
		mail({
			from: "john@example.com",
			to: "jane@example.com",
			subject: "foo",
			text: "bar",
			html: false
		});

		expect(nodemailer.createTransport).toHaveBeenCalledWith({
			host: "host",
			port: 465,
			secure: true,
			auth: {
				user: "username",
				pass: "password"
			}
		});
		expect(sendMail).toHaveBeenCalledWith({
			from: "john@example.com",
			to: "jane@example.com",
			subject: "foo",
			text: "bar",
			html: false
		});
	});

	it("sends an insecure email", () => {
		global.process.env.MAIL_PORT = 587;
		mail({
			from: "john@example.com",
			to: "jane@example.com",
			subject: "foo",
			text: "bar",
			html: false
		});

		expect(nodemailer.createTransport).toHaveBeenCalledWith({
			host: "host",
			port: 587,
			secure: false,
			auth: {
				user: "username",
				pass: "password"
			}
		});
		expect(sendMail).toHaveBeenCalledWith({
			from: "john@example.com",
			to: "jane@example.com",
			subject: "foo",
			text: "bar",
			html: false
		});
	});

	it("sends an email without from address", () => {
		mail({
			to: "jane@example.com",
			subject: "foo",
			text: "bar",
			html: false
		});

		expect(sendMail).toHaveBeenCalledWith({
			from: '"app" <hello@example.com>',
			to: "jane@example.com",
			subject: "foo",
			text: "bar",
			html: false
		});
	});
});
