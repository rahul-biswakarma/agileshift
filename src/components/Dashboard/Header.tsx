import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";

import logoSvg from "../../assets/logo.svg";
import {  get_user_by_id, get_organization_name_by_id } from "../../Utils/Backend";

import InviteUserComponent from "./InviteUserComponent";
import { SearchComponent } from "./SearchComponent";

interface TYPE_HeaderProps {
	showNotification: boolean;
	setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: TYPE_HeaderProps) => {
	const userId = useAppSelector((state) => state.auth.userId);
	const organizationId = useAppSelector((state) => state.auth.organisationId);

	const [userData, setUserData] = useState<TYPE_USER>({
		id: "",
		name: "",
		email: "",
		avatar: "",
		organisation: [""],
	});
	const [isSettingOptionMenuOpen, setIsSettingOptionMenuOpen] =
		useState<boolean>(false);
	const [isInviteUserComponentOpen, setIsInviteUserComponentOpen] =
		useState<boolean>(false);

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
		props.setShowNotification((state) => {
			return !state;
		});
	};

	const toggleSettingOptionMenu = () => {
		setIsSettingOptionMenuOpen(!isSettingOptionMenuOpen);
	};

	const handleInviteUerButtonClick = () => {
		setIsInviteUserComponentOpen(!isInviteUserComponentOpen);
	};

	useEffect(() => {
		get_organization_name_by_id(organizationId).then((data) => {
			console.log(data)
			document.title = `${data} | Dashboard`

		})
	},[organizationId])

	return (
		<div
			id="header"
			className="p-[1rem_2rem] flex gap-[3rem] justify-between border-[2px] border-Secondary_background_color"
		>
			<div className="flex gap-[1rem] items-center">
				<img
					className="w-8"
					src={logoSvg}
					alt="logo"
				/>
			</div>

			<SearchComponent />

			<div className="flex gap-[2rem] items-center">
				<button
					className="material-symbols-outlined text-white/20 cursor-pointer hover:text-white transition-all"
					onClick={() => handleNotificationToggle()}
				>
					notifications
				</button>
				<div className="flex gap-[1rem] items-center transition-all">
					<button
						style={{
							color: `${
								isInviteUserComponentOpen ? "white" : "rgba(255, 255, 255, 0.2)"
							}`,
						}}
						onClick={() => handleInviteUerButtonClick()}
						className="material-symbols-outlined text-white/20 hover:text-white transition-all"
					>
						person_add
					</button>
					{isInviteUserComponentOpen && (
						<InviteUserComponent
							setIsInviteUserComponentOpen={setIsInviteUserComponentOpen}
						/>
					)}
				</div>
				<div className="relative text-white/20 cursor-pointer  flex flex-col item-center transition-all">
					<span
						className="material-symbols-outlined hover:text-white"
						onClick={() => toggleSettingOptionMenu()}
					>
						settings
					</span>
					<div
						className={`mt-[30px] right-0 absolute flex flex-col gap-[0.7rem] w-[200px] min-h-[200px] h-full bg-Secondary_background_color overflow-auto border border-white/30 rounded-xl z-50 ${
							isSettingOptionMenuOpen ? "flex" : "hidden"
						}`}
					>
						<div className="w-full flex items-center justify-between p-[0.5rem] border-b border-white/30 transition-all ">
							<p className="text-white/50">Settings</p>
							<span
								onClick={() => toggleSettingOptionMenu()}
								className="material-symbols-outlined text-[17px] hover:text-rose-500"
							>
								close
							</span>
						</div>
					</div>
				</div>
				<img
					className="max-w-[35px] max-h-[35px] min-w-[35px] min-h-[35px]  rounded-full cursor-pointer transition-all"
					src={`${userData.avatar}`}
					alt={`${userData.name}`}
				/>
			</div>
		</div>
	);
};

export default Header;
