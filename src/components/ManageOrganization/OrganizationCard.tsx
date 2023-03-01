import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrganisationId } from "../../redux/reducers/AuthSlice";
import { add_organisation_to_user } from "../../Utils/Backend";

type organizationCardProps = {
	name: string;
	orgId: string;
	pendingInvitation?: boolean;
	user: TYPE_USER;
};

export const OrganizationCard = ({
	name,
	orgId,
	pendingInvitation,
	user,
}: organizationCardProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const userId = useAppSelector((state) => state.auth.userId);

	return (
		<div className="w-full flex justify-between items-center text-highlight_font_color border border-background_color hover:border-white/5 hover:bg-white/5 rounded-lg p-[5px]">
			<div className="flex gap-[1rem] items-center">
				<img
					src="https://app.devrev.ai/static/profile-circle-black.png"
					className="w-10 h-10 rounded-full"
					alt=""
				/>
				<h3 className="text-[1.2rem] font-dm_sans">{name}</h3>
			</div>
			{!pendingInvitation ? (
				<button
					onClick={() => {
						dispatch(setOrganisationId(orgId));
						navigate(`/organization/${orgId}`);
					}}
					className="p-[0.5rem_1rem] flex items-center bg-Secondary_background_color border border-inherit text-center text-lg rounded-lg"
				>
					<span className="material-symbols-outlined">arrow_forward</span>
				</button>
			) : (
				<button
						onClick={() => {
							console.log("Accepting invitation");
							add_organisation_to_user(userId, orgId, user.email);
					}}	
				>
					Accept
				</button>
			)}
		</div>
	);
};
