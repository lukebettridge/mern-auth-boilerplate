const nodemailer = require("nodemailer");

module.exports = async ({ from, to, subject, text, html }) => {
	const transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: Number(process.env.MAIL_PORT),
		secure: Number(process.env.MAIL_PORT) === 465,
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD
		}
	});

	return await transporter.sendMail({
		from: from || `"${process.env.APP_NAME}" <${process.env.MAIL_FROM}>`,
		to,
		subject,
		text,
		html
	});
};
