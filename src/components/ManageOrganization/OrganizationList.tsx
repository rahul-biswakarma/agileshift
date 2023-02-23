import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import { useAppSelector } from "../../redux/hooks";
import {OrganizationCard} from "./OrganizationCard";
// import UploadJSON from "./UploadJSON";

const OrganizationList: React.FunctionComponent = () => {
	
	const [user, setUser] = useState<TYPE_USER>();
	const organizationList  = useAppSelector((state) => state.auth.organisationList);
	const userId  = useAppSelector((state) => state.auth.userId);


	useEffect(() => {
		
	}, [userId])
	
	const navigate = useNavigate();

	console.log(organizationList);
	console.log(userId);
	return (
		<div className="bg-background_color h-screen w-screen flex items-center justify-center font-dm_sans">
			<div className="w-[350px] flex flex-col gap-5">
				<div className="text-highlight_font_color">
					<h3 className="text-xl mb-2">Create or Join a AgileShift Org</h3>
					{/* Change this to dynamic username */}
					<p className="text-primary_font_color text-sm">We found following organizations that matches your email address - i-nikhil.tidke@devrev.ai</p>  
				</div>
				<div className="text-highlight_font_color flex flex-col gap-5 my-5">
					<h4 className="text-md">You AgileOrgs <span className="p-2 rounded-md bg-Secondary_background_color">2</span></h4>
					<OrganizationCard/>
					<OrganizationCard/>
					<OrganizationCard/>
					<OrganizationCard/>
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
