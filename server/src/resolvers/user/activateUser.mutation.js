const { AuthorizationError } = require("../../errors");
const User = require("../../models/User");

module.exports = (parent, args, context) => {
	if (!context.user || !context.user.roles.includes("admin"))
		throw new AuthorizationError();

	return User.findById(args.id).then(user =>
		user.updateOne({ active: true }).then(() => true)
	);
};
