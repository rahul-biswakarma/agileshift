import React from "react";

const UsersType = (props: any) => {
	return (
		<div className="flex items-center">
			{props.value.avatar !== undefined &&
			props.value.avatar !== null &&
			props.value.avatar !== "" ? (
				<img
					className="w-8 h-8 rounded-full"
					src={`${props.value.avatar}`}
					alt={`${props.value.name}`}
				/>
			) : props.value.avatar !== undefined &&
			  props.value.avatar !== null &&
			  props.value.avatar !== "" ? (
				<span className="font-dm_sans text-[15px]">{props.value.name}</span>
			) : (
				"-"
			)}
		</div>
	);
};

export default UsersType;
