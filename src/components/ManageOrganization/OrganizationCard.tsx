import { useNavigate } from "react-router-dom";

type organizationCardProps = {
	name: string;
	orgId: string;
};

export const OrganizationCard = ({ name, orgId }: organizationCardProps) => {
	const navigate = useNavigate();

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
			<button
				onClick={() => navigate(`/organization/${orgId}`)}
				className="p-[0.5rem_1rem] flex items-center bg-Secondary_background_color border border-inherit text-center text-lg rounded-lg"
			>
				<span className="material-symbols-outlined">arrow_forward</span>
			</button>
		</div>
	);
};
