import { useEffect } from "react";
import PropType from "prop-types";

const OnRender = props => {
	useEffect(() => {
		props.mutation();
	}, []);
	return null;
};

OnRender.propTypes = {
	mutation: PropType.func.isRequired
};

export default OnRender;
