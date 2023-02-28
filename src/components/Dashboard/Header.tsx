import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";

import logoSvg from "../../assets/logo.svg";
import { set_notification, get_user_by_id } from "../../Utils/Backend";
import {  } from "../../Utils/Backend";

interface TYPE_HeaderProps {
	showNotification: boolean;
	setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props:TYPE_HeaderProps) => {

	const userId = useAppSelector((state) => state.auth.userId);
    const organizationId = useAppSelector((state) => state.auth.organisationId);

	const [userData, setUserData] = useState<TYPE_USER>({
		id: "",
		name: "",
		email: "",
		avatar: "",
		organisation: [""],
	});

	useEffect(() => {
		get_user_by_id(userId).then((data) => {
			if (data) {
				const user = {
					id: data.id,
					name: data.name,
					email: data.email,
					avatar: data.avatar,
					organisation: data.organisation,
				};
				setUserData(user);
			}
		});
	}, [userId]);

	const handleNotificationToggle = () => {
		props.setShowNotification((state => { 
			console.log(!state);
			return !state
		}))
	}

	const setTempNotification = () =>{
		set_notification(
			organizationId,
			userId,
			"UBKYEHHULHNG",
			"New Issue Added"
		)
	}

	return (
		<div className="p-[1rem_2rem] flex gap-[3rem] justify-between border-[2px] border-Secondary_background_color">
			<div className="flex gap-[1rem] items-center">
				<img
					className="w-8"
					src={logoSvg}
					alt="logo"
				/>
				{/* <h1 className="font-inter text-indigo-500 font-[500] text-[1.2rem]">
					AgileShift
				</h1> */}
			</div>

			<div className="relative w-full max-w-[800px] rounded-md flex gap-[10px] bg-Secondary_background_color p-[2px]">
				<div className="flex rounded-md bg-background_color items-center px-4">
					<span className="material-symbols-outlined text-white/30">
						search
					</span>
				</div>
				<input
					name="search-input"
					type="text"
					placeholder="Search items, fields, users and etc"
					className="w-full flex-1 font-fira_code font-lg rounded-r-lg px-4 bg-Secondary_background_color h-9 outline-none text-white placeholder:text-white/20"
				/>
			</div>
			<div className="flex gap-[2rem] items-center">
				<span className="material-symbols-outlined text-white/20 cursor-pointer hover:text-white" onClick={()=>handleNotificationToggle()}>
					notifications
				</span>
				<span className="material-symbols-outlined text-white/20 cursor-pointer hover:text-white" onClick={()=>setTempNotification()}>
					settings
				</span>
				<img
					className="max-w-[35px] max-h-[35px] min-w-[35px] min-h-[35px]  rounded-full cursor-pointer"
					src={`${userData.avatar}`}
					alt={`${userData.name}`}
				/>
			</div>
		</div>
	);
};

export default Header;
