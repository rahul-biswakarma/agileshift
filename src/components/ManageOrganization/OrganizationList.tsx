import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { get_user_by_id, user_active_time } from "../../Utils/Backend";

import { get_organizations_details } from "../../Utils/Backend";
import { RootState } from "../../redux/store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import OrganizationListModal from "./OrganizationListModal";

const OrganizationList: React.FunctionComponent = () => {
	const [user, setUser] = useState<any>();
	const [organization, setOrganizations] = useState<TYPE_ORGANISATION[]>([]);
	// const [pendingInvitations, setPendingInvitations] = useState<string[]>([]);
	// const [pendingInvitationsOrgData, setPendingInvitationsOrgData] =
	// 	useState<any>([]);
	const userId = useAppSelector((state: RootState) => state.auth.userId);
	const navigate = useNavigate();

	useEffect(() => {
		const getUserObj = async () => {
			const data = await get_user_by_id(userId);
			setUser(data);
		};
		getUserObj();
		user_active_time(userId);
	}, [userId]);

	const fetchPendingInvitations = useCallback(() => {
		if (user && user.email)
			onSnapshot(doc(db, "invitation", user.email), (doc) => {
				if (doc.exists()) {
					// let data = doc.data();
					// let orgIds = data;
					// setPendingInvitations(orgIds["pendingList"]);
				}
			});
	}, [user]);

	useEffect(() => {
		fetchPendingInvitations();
	}, [fetchPendingInvitations]);

	// useEffect(() => {
	// 	const getPendingInvitationsOrgData = async () => {
	// 		if (pendingInvitations.length > 0) {
	// 			const organizations = await Promise.all(
	// 				pendingInvitations.map(async (orgId: string) => {
	// 					const orgObject = await get_organizations_details(orgId);
	// 					return orgObject;
	// 				})
	// 			);
	// 			// setPendingInvitationsOrgData(organizations);
	// 		}
	// 	};
	// 	getPendingInvitationsOrgData();
	// }, [pendingInvitations]);

	useEffect(() => {
		const getOrganizationsDetails = async () => {
			if (user && user.organisation) {
				const organizations = await Promise.all(
					user.organisation.map(async (orgId: string) => {
						const orgObject = await get_organizations_details(orgId);
						return orgObject;
					})
				);
				setOrganizations(organizations);
			}
		};
		if (user) getOrganizationsDetails();
	}, [user]);

	useEffect(() => {
		document.title = "Organization List";
		if (!userId) {
			navigate("/login");
		}
	}, [navigate, userId]);

	const navigateToLogin = () => {
		navigate("/login");
	}

	return (
		<div className="bg-background_color h-screen w-screen flex items-center justify-center font-dm_sans">
			<div className="w-[40vw] max-w-[600px] min-w-[400px] flex flex-col gap-5">
				<div className="text-highlight_font_color">
					<h3 className="text-[1.5rem] mb-4 font-[600] flex items-center gap-3">
						<span onClick={() => navigateToLogin()} className="material-symbols-outlined text-[20px] border border-white rounded-full p-1 cursor-pointer">
							arrow_back
						</span>
						Create or Join a AgileShift Org
					</h3>
					{/* Change this to dynamic username */}
					<p className="text-primary_font_color text-sm">
						We found following organizations that matches your email address -{" "}
						<span className="font-fira_code text-purple-400">
							{user?.email}
						</span>
					</p>
				</div>
				<div className="text-highlight_font_color flex flex-col gap-5 my-5">
					<div className="text-md flex justify-between p-2">
						<p>Your AgileOrgs</p>
						<p className="p-[2px_15px] rounded-md bg-Secondary_background_color">
							{organization?.length}
						</p>
					</div>

					<OrganizationListModal userId={userId} />
				</div>
				<button
					onClick={() => navigate("/create-organization")}
					className="flex gap-4 items-center justify-center py-4 rounded-lg text-highlight_font_color bg-Secondary_background_color hover:bg-purple-300 hover:text-purple-800 transition-all"
					data-testid="create-new-org-btn"
				>
					<span className="material-symbols-outlined">add</span>
					Create new AgileOrg
				</button>
			</div>
			{/* <UploadJSON schemaType="tickets"/> */}
		</div>
	);
};

export default OrganizationList;
