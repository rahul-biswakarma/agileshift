import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";

import logoSvg from "../../assets/logo.svg";
import { get_user_by_id, set_notification } from "../../Utils/Backend";
import { SearchComponent } from "./SearchComponent";

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
			[userId],
			["New Issue Added"],
			"UBKYEHHULHNG"
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

			<SearchComponent />

			<div className="flex gap-[2rem] items-center">
				<span className={`material-symbols-outlined cursor-pointer hover:text-white ${props.showNotification===true?'text-white':'text-white/20'}`} onClick={()=>handleNotificationToggle()}>
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
