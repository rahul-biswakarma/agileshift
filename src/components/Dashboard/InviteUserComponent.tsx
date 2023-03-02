import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { send_invite } from "../../Utils/Backend";

type Type_InviteUserComponentProps = {
	setIsInviteUserComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InviteUserComponent = (props: Type_InviteUserComponentProps) => {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const userId = useAppSelector((state) => state.auth.userId);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		if (event.target.value === "") {
			setError(false);
			return;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setError(!emailRegex.test(event.target.value));
	};

	const sendInivitation = (email: string) => {
		if (email === "") {
			toast.warning("Enter email first", {
				// position: toast.POSITION.BOTTOM_RIGHT,
				className: 'toast-message'
			});
			setError(true);
			return;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setError(!emailRegex.test(email));
		if (!emailRegex.test(email)) {
		toast.error("Invalid Email",{
			className: 'toast-message'
		});
			return;
		}
		toast.success("Invitation sent", {
			className: 'toast-message'
		});
		props.setIsInviteUserComponentOpen(false);

		send_invite(userId, email, organizationId);
	};

	return (
		<div className="p-[2px] relative min-w-[250px] flex justify-between items-center border-[1.5px] border-white/10 rounded-md bg-Secondary_background_color transition-all">
			<div>
				<input
					type="text"
					value={email}
					onChange={handleChange}
					placeholder="Enter email"
					className="px-[5px] rounded-md w-full outline-none bg-Secondary_background_color  text-highlight_font_color placeholder:text-white/20 "
				/>
				{error && (
					<p className="absolute text-red-500 text-xs bg-background_color px-[2px] ml-[3px]">
						* Please enter a valid email
					</p>
				)}
			</div>
			<button
				onClick={() => {
					sendInivitation(email);
				}}
				className="material-symbols-outlined rounded-md border-[1.5px] border-white/10 rounded-md bg-background_color text-white/40 hover:text-purple-800 hover:bg-purple-400 hover:border:purple-400 text-[18px] p-[5px]"
			>
				send
			</button>
		</div>
	);
};

export default InviteUserComponent;
