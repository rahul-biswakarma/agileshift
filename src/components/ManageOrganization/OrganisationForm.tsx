import { useRef, useState, ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrganisationId } from "../../redux/reducers/AuthSlice";
import { RootState } from "../../redux/store";
import {
	add_organisation_to_user,
	create_organization,
	get_organization_name_by_id
} from "../../Utils/Backend";
import { setActiveTab } from "../../redux/reducers/SchemaSlice";
import { toast } from "react-toastify";

require("tailwindcss-writing-mode")({
	variants: ["responsive", "hover"],
});





export const OrganisationForm = () => {
	// States
	const [isOrgCreated, setIsOrgCreated] = useState<boolean>(false);
	// const [toolTip, setToolTip] = useState<boolean>(false);
	const [orgNameErrorMessage, setOrgNameErrorMessage] = useState<string>("");
	const [orgUrlErrorMessage, setOrgUrlErrorMessage] = useState<string>("");
	const [orgNameState, setOrgNameState] = useState<string>("");
	const [orgUrlState, setOrgUrlState] = useState<string>("");
	// const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
	console.log(orgUrlErrorMessage,setOrgUrlState)


	const organizationId = useAppSelector((state) => state.auth.organisationId);

	// Refs
	const orgName = useRef<HTMLInputElement>(null);
	// const orgURL = useRef<HTMLInputElement>(null);
	const userId = useAppSelector((state: RootState) => state.auth.userId);

	// doc title

	useEffect(() => {
		get_organization_name_by_id(organizationId).then((data) => {
			document.title = `Schema Form | ${data}`
		})
	})

	// useEffect(() => {
	// 	setIsSubmitDisabled(!orgNameState || !orgUrlState);
	//   }, [orgNameState, orgUrlState]);

	// Redux
	const activeTab = useAppSelector(
		(state: RootState) => state.schema.activeTab
	);
	const dispatch = useAppDispatch();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		const value = event.target.value;
		switch (name) {
			case "org-name":
				if (value.length < 3) {
					setOrgNameErrorMessage(
						"AgileOrg name requires a minimum length of 3."
					);
				} else {
					setOrgNameErrorMessage("");
				}
				break;
			case "org-url":
				const urlRegExp = /^(ftp|http|https):\/\/[^ "]+$/;
				if (!urlRegExp.test(value)) {
					setOrgUrlErrorMessage("Please enter a valid URL.");
				} else {
					setOrgUrlErrorMessage("");
				}
				break;
		}
	};

	

	const addOrganisation = () => {
		const name = orgName.current?.value;


  

  if (!name) {
    toast.error("Please provide Name");
    return;
  }

  
		if (!isOrgCreated) {
			create_organization(userId, orgNameState, orgUrlState).then((id) => {
				add_organisation_to_user(userId, id,"");
				dispatch(setOrganisationId(id));
			});
			setIsOrgCreated(true);
			dispatch(setActiveTab(activeTab + 1));
		}
	};

	if (activeTab === -1)
		return (
			<div className="bg-background_color h-screen w-screen flex items-center justify-center font-dm_sans">
				<div className="h-3/5 max-w-[550px] w-full flex flex-col gap-5 p-[0_2rem]">
					<div className="text-highlight_font_color mb-5">
						<h3 className="flex gap-4 text-[20px] mb-4 items-center">
							<span className="material-symbols-outlined text-white text-[15px]">
								arrow_back
							</span>
							Create a new AgileShift Organisation
						</h3>
						{/* Change this to dynamic username */}
						<p className="text-primary_font_color text-lg">
							An organization is a workspace that helps your team collaborate
						</p>
					</div>
					<div className="text-highlight_font_color flex flex-col gap-5 mb-8">
						<div className="flex flex-col gap-1">
							<label
								htmlFor=""
								className="font-lg text-dark_gray font-[500]"
							>
								Name
							</label>
							<input
								ref={orgName}
								onChange={(e) => {
									handleChange(e);
									setOrgNameState(e.target.value);
								}}
								name="org-name"
								type="text"
								value={orgNameState}
								placeholder="Enter Org. Name"
								className="font-lg font-fira_code rounded-lg px-4 bg-Secondary_background_color h-10 outline-none border-dark_gray placeholder:text-white/20"
							/>
							{orgNameErrorMessage.length > 0 && (
								<p className="text-red-400 text-sm ml-1 mt-1">
									{orgNameErrorMessage}
								</p>
							)}
						</div>
						{/* <div className="relative flex flex-col gap-1">
							<label
								htmlFor=""
								className="font-lg text-dark_gray font-[500]"
							>
								Image URL
							</label>
							<div className="flex rounded-lg border-[2px] border-white/5 items-center">
								<input
									ref={orgURL}
									onChange={(e) => {
										handleChange(e);
										setOrgUrlState(e.target.value);
									}}
									name="org-url"
									value={orgUrlState}
									onFocus={() => setToolTip(!toolTip)}
									onBlur={() => setToolTip(!toolTip)}
									type="text"
									className="flex-1 font-fira_code font-lg rounded-r-lg px-4 bg-Secondary_background_color h-10 outline-none placeholder:text-white/20"
									placeholder="Enter Org. Logo URL"
								/>
							</div>
							{orgUrlErrorMessage.length > 0 && (
								<p className="text-red-400 text-sm ml-1 mt-1">
									{orgUrlErrorMessage}
								</p>
							)}
							{toolTip && (
								<div className="absolute left-[104%] bg-Secondary_background_color p-4 rounded-lg w-80 border border-dark_gray">
									<h3>AgileOrg URL</h3>
									<ul className="ml-5 list-disc text-sm">
										<li>Should be 3-50 characters long.</li>
										<li>Can have alphanumeric characters and hyphen</li>
										<li>Should not start or end with hyphen</li>
										<li>Cannot have two consecutive hyphens</li>
									</ul>
								</div>
							)}
						</div> */}
					</div>
					<button
						className={`flex gap-4 items-center justify-center py-2 rounded-lg border-[2px] border-Secondary_background_color text-white/40 stroke-white/40 ${
							isOrgCreated === false
								? "hover:bg-amber-400 hover:text-amber-800 hover:border-amber-400 hover:stroke-amber-800"
								: "cursor-not-allowed"
						} transition-all`}
						onClick={addOrganisation}
						// disabled={isSubmitDisabled}
					>
						<span className="material-symbols-outlined">add</span>
						Create new AgileOrg
					</button>
				</div>
			</div>
		);
	else
		return (
			<div className="h-screen w-12 flex flex-wrap text-primary_font_color  bg-Secondary_background_color">
				<button
					className="h-full w-full"
					onClick={() => dispatch(setActiveTab(-1))}
				>
					<span className="[writing-mode:vertical-rl] text-sm font-[600] uppercase font-fira_code">
						Organisation Form
					</span>
				</button>
			</div>
		);
};
