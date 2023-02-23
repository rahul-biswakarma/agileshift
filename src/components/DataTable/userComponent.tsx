import React from "react";

const UsersType = (props: any) => {
	console.log(props);
	return (
		<div className="flex items-center justify-center">
			<img
				className="w-8 h-8 rounded-full"
				src={`${props.value.avatar}`}
				alt={`${props.value.name}`}
			/>
		</div>
	);
};

export default UsersType;
