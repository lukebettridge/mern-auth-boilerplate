const { AuthorizationError, GenericError } = require("../../errors");
const User = require("../../models/User");

module.exports = (parent, args, context) => {
	if (!context.user || !context.user.roles.includes("admin"))
		throw new AuthorizationError();

	if (context.user._id.toString() === args.id.toString())
		throw new GenericError();

	return User.findById(args.id).then(user =>
		user.updateOne({ active: false }).then(() => false)
	);
};
