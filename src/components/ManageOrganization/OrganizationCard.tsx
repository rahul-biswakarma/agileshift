import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrganisationId } from "../../redux/reducers/AuthSlice";
import {
	add_organisation_to_user,
	reject_invitation,
} from "../../Utils/Backend";

type organizationCardProps = {
	name: string;
	orgId: string;
	pendingInvitation?: boolean;
	user: TYPE_USER;
	boxSize: string;
};

export const OrganizationCard = ({
	name,
	orgId,
	pendingInvitation,
	user,
	boxSize,
}: organizationCardProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const cardRef = useRef<HTMLDivElement>(null);

	const userId = useAppSelector((state) => state.auth.userId);

	const fontSize = boxSize === "small" ? "text-sm" : "text-md";
	const iconSize = boxSize === "small" ? "text-base" : "text-lg";

	return (
		<div
			ref={cardRef}
			className={`${fontSize} w-full gap-[1rem] flex justify-between items-center text-highlight_font_color border border-background_color hover:border-white/5 hover:bg-white/5 rounded-lg p-[8px]`}
		>
			<div className="flex gap-[1rem] items-center">
				<span
					className={`${iconSize} material-symbols-outlined text-white/50 cursor-pointer`}
				>
					cyclone
				</span>
				<h3 className={`${fontSize} font-dm_sans`}>{name}</h3>
			</div>
			{!pendingInvitation ? (
				<button
					onClick={() => {
						dispatch(setOrganisationId(orgId));
						navigate(`/organization/${orgId}`);
						window.location.reload();
					}}
					className="p-[0.5rem_1rem] flex items-center bg-Secondary_background_color border border-inherit text-center text-lg rounded-lg"
				>
					<span className={`${fontSize} material-symbols-outlined`}>
						arrow_forward
					</span>
				</button>
			) : (
				<React.Fragment>
					<p className="text-[12px] font-fira_code">Invited</p>
					<div className="flex gap-[1rem] border-transparent">
						<button
							className="p-[0.5rem_1rem] flex items-center bg-Secondary_background_color border border-inherit text-center rounded-lg font-fira_code hover:text-green-800 hover:bg-green-400 hover:border-green-500 transition-all"
							onClick={async () => {
								await add_organisation_to_user(
									userId,
									orgId,
									user.email,
									"invitations"
								);
								cardRef.current!.style.display = "none";
								dispatch(setOrganisationId(orgId));
								navigate(`/organization/${orgId}`);
							}}
						>
							<span className={`${fontSize} material-symbols-outlined`}>
								check
							</span>
						</button>
						<button
							className="p-[0.5rem_1rem] flex items-center bg-Secondary_background_color border border-inherit text-center rounded-lg font-fira_code hover:text-rose-800 hover:bg-rose-400 hover:border-rose-500 transition-all"
							onClick={() => {
								reject_invitation(orgId, user.email);
								cardRef.current!.style.display = "none";
							}}
						>
							<span className={`${fontSize} material-symbols-outlined`}>
								close
							</span>
						</button>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};
