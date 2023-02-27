import React from "react";

const stringComponent = (props: any) => {
	return (
		<div>
			{props.value !== null && props.value !== "" && props.value !== undefined
				? props.value
				: "-"}
		</div>
	);
};

export default stringComponent;
