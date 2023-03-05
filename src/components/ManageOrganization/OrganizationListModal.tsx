import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import { get_user_by_id, user_active_time } from "../../Utils/Backend";
import { OrganizationCard } from "../ManageOrganization/OrganizationCard";
import { get_organizations_details } from "../../Utils/Backend";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface TYPE_TEST {
	userId: string;
	boxSize?: string;
}

const OrganizationListModal = (props: TYPE_TEST) => {
	const [user, setUser] = useState<any>();
	const [organization, setOrganizations] = useState<TYPE_ORGANISATION[]>([]);
	const [pendingInvitations, setPendingInvitations] = useState<string[]>([]);
	const [pendingInvitationsOrgData, setPendingInvitationsOrgData] =
		useState<any>([]);
	// const navigate = useNavigate();

	const userId = props.userId;

    

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
					let data = doc.data();
					let orgIds = data;
					setPendingInvitations(orgIds["pendingList"]);
				}
			});
	}, [user]);

	useEffect(() => {
		fetchPendingInvitations();
	}, [fetchPendingInvitations]);

	useEffect(() => {
		const getPendingInvitationsOrgData = async () => {
			if (pendingInvitations.length > 0) {
				const organizations = await Promise.all(
					pendingInvitations.map(async (orgId: string) => {
						const orgObject = await get_organizations_details(orgId);
						return orgObject;
					})
				);
				setPendingInvitationsOrgData(organizations);
			}
		};
		getPendingInvitationsOrgData();
	}, [pendingInvitations]);

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

	return (
		
			<div className="flex flex-col w-full gap-[1rem] max-h-[40vh] overflow-auto px-[0.3rem]">
				{pendingInvitationsOrgData.map((orgData: any, index: number) => {
					return (
						<OrganizationCard
							key={`oraganization-${index}`}
							name={orgData?.name}
							orgId={orgData?.id}
							pendingInvitation={true}
							user={user}
							boxSize={props.boxSize?props.boxSize:"normal"}
						/>
					);
				})}
				<div className="flex flex-col-reverse">
					{organization.map((orgData: any, index: number) => {
						return (
							<OrganizationCard
								key={`oraganization-${index}`}
								name={orgData?.name}
								orgId={orgData?.id}
								user={user}
								boxSize={props.boxSize?props.boxSize:"normal"}
							/>
						);
					})}
				</div>
			</div>
		
	);
};

export default OrganizationListModal;