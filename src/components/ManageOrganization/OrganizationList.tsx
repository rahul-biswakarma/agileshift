import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { get_user_by_id } from "../../Utils/Backend";
import { OrganizationCard } from "./OrganizationCard";
import { get_organizations_details } from "../../Utils/Backend";

const OrganizationList: React.FunctionComponent = () => {
	const [user, setUser] = useState<any>();
	const [organization, setOrganizations] = useState<any>([]);
	const userId = useAppSelector((state) => state.auth.userId);

	useEffect(() => {
		const getUserObj = async () => {
			const data = await get_user_by_id(userId);
			setUser(data);
		};
		getUserObj();
	}, [userId]);

	useEffect(() => {
		const getOrganizationsDetails = async () => {
			if (user && user.organisation) {
				const organizations = await Promise.all(
					user.organisation.map(async (orgId: any) => {
						const orgObject = await get_organizations_details(orgId);
						return orgObject;
					})
				);
				setOrganizations(organizations);
			}
		};
		if (user) getOrganizationsDetails();
	}, [user]);

	const navigate = useNavigate();

	return (
		<div className="bg-background_color h-screen w-screen flex items-center justify-center font-dm_sans">
			<div className="w-[500px] flex flex-col gap-5">
				<div className="text-highlight_font_color">
					<h3 className="text-[1.5rem] mb-2 font-[600]">
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
					<div className="flex flex-col gap-[1rem] max-h-[40vh] overflow-auto px-[0.3rem]">
						{organization.map((orgData: any, index: number) => {
							return (
								<OrganizationCard
									key={`oraganization-${index}`}
									name={orgData?.name}
									orgId={orgData?.id}
								/>
							);
						})}
					</div>
				</div>
				<button
					onClick={() => navigate("/create-organization")}
					className="flex gap-4 items-center justify-center py-4 rounded-lg text-highlight_font_color bg-Secondary_background_color hover:bg-purple-300 hover:text-purple-800 transition-all"
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
