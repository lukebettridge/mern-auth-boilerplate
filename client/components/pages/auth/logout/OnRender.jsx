import { useEffect } from "react";
import PropTypes from "prop-types";

const OnRender = props => {
	useEffect(() => {
		props.mutation();
	}, []);
	return null;
};

OnRender.propTypes = {
	mutation: PropTypes.func.isRequired
};

export default OnRender;
