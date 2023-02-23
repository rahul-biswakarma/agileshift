import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import { useAppSelector } from "../../redux/hooks";
import { get_user_by_id } from "../../Utils/Backend";
import {OrganizationCard} from "./OrganizationCard";
import { get_organizations_details } from "../../Utils/Backend";
// import UploadJSON from "./UploadJSON";

const OrganizationList: React.FunctionComponent = () => {
	const [user, setUser] = useState<any>();
	const [organization, setOrganizations] = useState<any>([]);
	const organizationList  = useAppSelector((state) => state.auth.organisationList);
	const userId  = useAppSelector((state) => state.auth.userId);

	useEffect(() => {
		const getUserObj = async () => {
			await get_user_by_id(userId).then((data) => {
				setUser(data);
			})
		}
		const getOrganizationsDetails = async () => {
			organizationList.map(async (orgId) => {
				const orgObject = await get_organizations_details(orgId);
				setOrganizations([
					...organization,
					orgObject
				])
			})
		}
		getOrganizationsDetails();
		getUserObj();
	},[userId, organizationList, organization]);
	
	const navigate = useNavigate();
	// console.log(organizationList);
	console.log(user);
	console.log(organization);

	return (
		<div className="bg-background_color h-screen w-screen flex items-center justify-center font-dm_sans">
			<div className="w-[350px] flex flex-col gap-5">
				<div className="text-highlight_font_color">
					<h3 className="text-xl mb-2">Create or Join a AgileShift Org</h3>
					{/* Change this to dynamic username */}
					<p className="text-primary_font_color text-sm">We found following organizations that matches your email address - {user?.email}</p>  
				</div>
				<div className="text-highlight_font_color flex flex-col gap-5 my-5">
					<h4 className="text-md">You AgileOrgs <span className="p-2 rounded-md bg-Secondary_background_color">{organization?.length}</span></h4>
					{
						organization.map((orgData:any) => {
							return <OrganizationCard name={orgData?.data.name} orgId={orgData?.data.id} url={orgData?.data.id} />
						})
					}
				</div>
				<button onClick={() => navigate("/createOrg")} className="flex gap-4 items-center justify-center border border-dark_gray py-4 rounded-lg text-highlight_font_color">
					<img
						src={PlusIcon}
						alt="Plus Icon"
						className="w-4 h-4"
					/>
					Create new AgileOrg
				</button>
			</div>
			{/* <UploadJSON schemaType="tickets"/> */}
		</div>
	);
};

export default OrganizationList;
