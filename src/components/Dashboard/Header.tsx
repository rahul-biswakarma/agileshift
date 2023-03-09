import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
	get_user_by_id,
	get_organization_name_by_id,
} from "../../Utils/Backend";

import InviteUserComponent from "./InviteUserComponent";
import { SearchComponent } from "./SearchComponent";
import { setUserId } from "../../redux/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Modal, Tooltip} from "@mui/material";
import OrganizationListModal from "../ManageOrganization/OrganizationListModal";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { setNotificationList, setUnreadNotificationCount } from "../../redux/reducers/NotificationSlice";

interface TYPE_HeaderProps {
	showNotification: boolean;
	setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: TYPE_HeaderProps) => {
	const userId = useAppSelector((state) => state.auth.userId);
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [organizationName, setOrganizationName] = useState<string>("NewOrg");
	const [openOrgList, setOpenOrgList] = useState(false);
	const unReadNotificationCountFromStore = useAppSelector((state) => state.notification.unreadNotificationCount);

	

	const [userData, setUserData] = useState<TYPE_USER>({
		id: "",
		name: "",
		email: "",
		avatar: "",
		organisation: [""],
	});
	const [isSettingOptionMenuOpen, setIsSettingOptionMenuOpen] =
		useState(false);
	const [isInviteUserComponentOpen, setIsInviteUserComponentOpen] =
		useState<boolean>(false);
	// const [isOrgMenuOpen, setIsOrgMenuOpen] = useState<boolean>(false);
	const [isOrgMenuOpen , setIsOrgMenuOpen] = useState(false);

	const handleOpenOrgMenu = () => {
		setIsOrgMenuOpen(true);
	  };
	
	  const handleCloseOrgMenu = () => {
		setIsOrgMenuOpen(false);
	  };

	  const handleOpenOrgList = () => {
		setOpenOrgList(true);
	  };
	
	  const handleCloseOrgList = () => {
		setOpenOrgList(false);
	  };

	  const handleOpenSettingOption = () => {
		setIsSettingOptionMenuOpen(true);
	  }

	  const handleCloseSettingOption = () => {
		setIsSettingOptionMenuOpen(false);
	  }



	const [isNotificationFetched, setIsNotificationFetched] =
    React.useState(false);

	const fetchNotificationList = async () => {
		let unReadNotificationCount = 0;
		onSnapshot(doc(db, "organizations", organizationId), async (doc) => {
			if (doc.data()) {
				const notificationListFromBackend = doc.data()!.notifications[userId];
				if(notificationListFromBackend &&
					notificationListFromBackend.length > 0 ){
						notificationListFromBackend.forEach((notification: TYPE_NOTIFICATION) => {
							if (notification.isSeen === false) {
								unReadNotificationCount++;
							}
						}); 
						notificationListFromBackend.reverse();
						const updatedNotificationList = notificationListFromBackend.sort(
							(notificationA: TYPE_NOTIFICATION, notificationB: TYPE_NOTIFICATION) => {
								if (notificationA.isSeen && !notificationB.isSeen) {
									return 1;
								}
								if (!notificationA.isSeen && notificationB.isSeen) {
									return -1;
								}
								return 0;
							}
						);
						dispatch(setUnreadNotificationCount(unReadNotificationCount));
						dispatch(setNotificationList(updatedNotificationList));
				}else{
					dispatch(setUnreadNotificationCount(0));
					dispatch(setNotificationList([]));
				}
			}
		});
	};

	if (isNotificationFetched === false) {
		fetchNotificationList();
		setIsNotificationFetched(true);
	}

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
		navigate("/login");
	};

	useEffect(() => {
		get_organization_name_by_id(organizationId).then((data) => {
			document.title = `${data} | Dashboard`;
			setOrganizationName(data);
		});
	}, [organizationId]);

	return (
		<div
			id="header"
			className="p-[0_2rem] h-full min-h-[60px] max-h-[61px] flex items-center justify-between border-[2px] border-Secondary_background_color text-white/30 hover:text-purple-500"
		>
			<button
				className="flex gap-[0.5rem] items-center"
				onClick={handleOpenOrgMenu}
			>
				<span className="material-symbols-outlined ">cyclone</span>
				<p className="uppercase font-fira_code font-[500]">{organizationName}</p>
			</button>
			<Modal
				open={isOrgMenuOpen}
				onClose={handleCloseOrgMenu}
			>
			<div>		
			{isOrgMenuOpen && (
				<div className="top-[60px] left-8 absolute flex flex-col gap-[0.3rem] w-max bg-background_color overflow-auto border border-[#444444] rounded-lg z-50">
					<div className="w-full flex items-center justify-between p-[0.5rem] border-b border-white/30 transition-all ">
						<p className= "text-white/50">{organizationName}</p>
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
						<li className="p-2 hover:bg-[#262626]">
							<button
								className="w-full"
								onClick={() => navigate("/organization-lists")}
							>
								Organization List
							</button>
						</li>
					</ul>
				</div>
			)}
			</div>
			
			</Modal>
			<SearchComponent />

			<div className="flex gap-[2rem] items-center">
				
					<div className="relative flex items-center">
					<Tooltip
					title="Organisation Lists"
					placement="top"
				>
						<button
							className={`${openOrgList?"text-white":"text-white/20"} material-symbols-outlined cursor-pointer hover:text-white transition-all`}
							onClick={handleOpenOrgList}
						>
							{openOrgList ? "close" : "list"}
						</button>
						</Tooltip>
						<Modal
							open={openOrgList}
							onClose={handleCloseOrgList}
						>
							<div>
							{openOrgList && (
								<div className="absolute min-w-[300px] top-[50px] right-52 rounded-lg font-dm_sans bg-background_color border border-[#444444] 
									shadow-lg p-2 flex items-center justify-center text-primary_font_color z-50">
									<OrganizationListModal userId={userId} boxSize="small"/>
								</div>
							)}
							</div>
						</Modal>
					</div>
							

				<Tooltip
					title="Notifications"
					placement="top"
				>
					<div className="relative flex items-center">
						<button
							className={`${
								props.showNotification ? "text-white" : "text-white/20"
							} material-symbols-outlined cursor-pointer hover:text-white transition-all`}
							onClick={() => handleNotificationToggle()}
						>
							notifications
						</button>
						{unReadNotificationCountFromStore>0 && (
							<div className="absolute w-[15px] h-[15px] top-[-4px] left-[14px] rounded-full font-fira_code bg-highlight_icon_color p-1 flex items-center justify-center text-white text-[8px] font-bold">
								{unReadNotificationCountFromStore}
							</div>
						)}

					</div>
				</Tooltip>

				
					<div className="flex gap-[1rem] items-center transition-all hover:text-white">
					<Tooltip
					title="Invite Member"
					placement="top"
					>
						<button
							style={{
								color: `${
									isInviteUserComponentOpen
										? "white"
										: "rgba(255, 255, 255, 0.2)"
								}`,
							}}
							onClick={() => handleInviteUerButtonClick()}
							className="material-symbols-outlined transition-all"
						>
							person_add
						</button>
					</Tooltip>
						{isInviteUserComponentOpen && (
							<InviteUserComponent
								setIsInviteUserComponentOpen={setIsInviteUserComponentOpen}
							/>
						)}
					</div>
				<div className="relative cursor-pointer  flex flex-col item-center transition-all">
					<button onClick={handleOpenSettingOption}>
						<img
							className="max-w-[35px] max-h-[35px] min-w-[35px] min-h-[35px]  rounded-full cursor-pointer transition-all"
							src={`${userData.avatar}`}
							alt={`${userData.name}`}
						/>
					</button>
					<Modal
						open={isSettingOptionMenuOpen}
						onClose={handleCloseSettingOption}
					>
						
					<div
						className={`top-[60px] right-[35px] absolute flex flex-col gap-[0.3rem] w-[170px] font-dm_sans bg-background_color overflow-auto border border-[#444444] rounded-lg z-50 ${
							isSettingOptionMenuOpen ? "flex" : "hidden"
						}`}
					>
						<div className="w-full flex items-center justify-between p-[0.5rem] border-b border-white/30 transition-all ">
							<p className="text-white/50">{userData.name}</p>
							<button
								onClick={() => toggleSettingOptionMenu()}
								className="material-symbols-outlined text-[17px] text-white/50 hover:text-rose-500"
							>
								close
							</button>
						</div>
						<ul className="text-white/80 w-full">
							<li className="hover:bg-[#262626]">
								<button
									className="w-full flex gap-2 justify-start items-center p-2 px-3 "
									onClick={() => handleLogout()}
								>
									<span className="material-symbols-outlined">
										logout
									</span>
									Logout
								</button>
							</li>
						</ul>
					</div>					
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default Header;
