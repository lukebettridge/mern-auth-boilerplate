const {
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_HOSTNAME,
	MONGO_PORT,
	MONGO_DB,
	MONGO_AUTHSOURCE,
	MONGO_REPLICASET
} = process.env;

module.exports = {
	url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTHSOURCE ||
		"admin"}${MONGO_REPLICASET ? `&replicaSet=${MONGO_REPLICASET}` : ""}`,
	options: {
		connectTimeoutMS: 10000,
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
};
