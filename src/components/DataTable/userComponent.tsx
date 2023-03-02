import React, { useEffect, useCallback } from "react";
import { get_user_by_id } from "../../Utils/Backend";

type Type_UsersTypeProps = {
	value: any;
};

const UsersType = (props: Type_UsersTypeProps) => {
	const [avatar, setAvatar] = React.useState<any>();
	const [name, setName] = React.useState<any>();

	const getUser = useCallback(async () => {
		if (props.value !== undefined && props.value !== null && props.value !== "")	
			get_user_by_id(props.value).then((res) => {
				if (res && res.name && res.avatar) {
					setAvatar(res.avatar);
					setName(res.name);
				}
			});
	}, [props.value]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	return (
		<div className="flex items-center">
			{avatar !== undefined && avatar !== null && avatar !== "" ? (
				<img
					className="w-8 h-8 rounded-full"
					src={`${avatar}`}
					alt={`${name}`}
				/>
			) : avatar !== undefined && avatar !== null && avatar !== "" ? (
				<span className="font-dm_sans text-[15px]">{name}</span>
			) : (
				"-"
			)}
		</div>
	);
};

export default UsersType;
