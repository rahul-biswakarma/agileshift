import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import logoSvg from "../../assets/logo.svg";
import {  get_user_by_id, get_organization_name_by_id } from "../../Utils/Backend";

import InviteUserComponent from "./InviteUserComponent";
import { SearchComponent } from "./SearchComponent";
import { setUserId } from "../../redux/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";

interface TYPE_HeaderProps {
	showNotification: boolean;
	setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: TYPE_HeaderProps) => {
	const userId = useAppSelector((state) => state.auth.userId);
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const dispatch = useAppDispatch();
	const navigate =useNavigate();
	const [organizationName,setOrganizationName]=useState<string>("NewOrg");

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
	const [isOrgMenuOpen, setIsOrgMenuOpen] = useState<boolean>(false);

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

	const handleLogout = () => {
		sessionStorage.clear();
		dispatch(setUserId(""));
		navigate('/login');
	}

	useEffect(() => {
		get_organization_name_by_id(organizationId).then((data) => {
			document.title = `${data} | Dashboard`
			setOrganizationName(data);
		})
	},[organizationId])

	return (
		<div
			id="header"
			className="p-[1rem_2rem] flex gap-[3rem] justify-between border-[2px] border-Secondary_background_color"
		>
			<button className="flex gap-[1rem] items-center" onClick={()=>setIsOrgMenuOpen(!isOrgMenuOpen)}>
				<img
					className="w-8"
					src={logoSvg}
					alt="logo"
				/>
			</button>
			{isOrgMenuOpen && <div
						className="top-[60px] left-8 absolute flex flex-col gap-[0.3rem] w-max bg-Secondary_background_color overflow-auto border border-white/30 rounded-md z-50 flex"
					>
						<div className="w-full flex items-center justify-between p-[0.5rem] border-b border-white/30 transition-all ">
							<p className="text-white/50">{organizationName}</p>
							<button
								onClick={() => navigate("/edit-organization-details")}
								className="material-symbols-outlined text-[17px] text-white/50 hover:text-yellow-500 mx-4"
							>
								edit
							</button>
							<button
								onClick={() => setIsOrgMenuOpen(!isOrgMenuOpen)}
								className="material-symbols-outlined text-[17px] text-white/50 hover:text-rose-500 ml-4"
							>
								close
							</button>
						</div>
						<ul className="text-white/80 w-full">
							<li className="p-2 hover:bg-[#262626]"><button className="w-full" onClick={()=>navigate("/organization-lists")}>Organisation List</button></li>
						</ul>
					</div>}
			<SearchComponent />

			<div className="flex gap-[2rem] items-center">
				<button
					className={`${props.showNotification ? "text-white": "text-white/20" } material-symbols-outlined cursor-pointer hover:text-white transition-all`}
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
				{/* <div className="relative text-white/20 cursor-pointer  flex flex-col item-center transition-all">
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
				</div> */}
				<div className="relative cursor-pointer  flex flex-col item-center transition-all">
					<button
						onClick={() => toggleSettingOptionMenu()}
					>
						<img
							className="max-w-[35px] max-h-[35px] min-w-[35px] min-h-[35px]  rounded-full cursor-pointer transition-all"
							src={`${userData.avatar}`}
							alt={`${userData.name}`}
						/>	
					</button>
					<div
						className={`top-[36px] right-0 absolute flex flex-col gap-[0.3rem] w-[200px] bg-Secondary_background_color overflow-auto border border-white/30 rounded-md z-50 ${
							isSettingOptionMenuOpen ? "flex" : "hidden"
						}`}
					>
						<div className="w-full flex items-center justify-between p-[0.5rem] border-b border-white/30 transition-all ">
							<p className="text-white/50">{userData.name}</p>
							<span
								onClick={() => toggleSettingOptionMenu()}
								className="material-symbols-outlined text-[17px] text-white/50 hover:text-rose-500"
							>
								close
							</span>
						</div>
						<ul className="text-white/80 w-full">
							<li className="p-2 hover:bg-[#262626]"><button className="w-full" onClick={()=>handleLogout()}>Log Out</button></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
