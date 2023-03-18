import React, { useRef, SyntheticEvent, useState } from "react";

import LockIcon from "../../assets/icons/lock-icon.svg";
import EmailIcon from "../../assets/icons/email-icon.svg";
import ArrowIcon from "../../assets/icons/arrow-icon.svg";
import {
	get_users_organization,
	get_user_by_email,
	sendEmail,
} from "../../Utils/Backend";
import { useAppDispatch } from "../../redux/hooks";
import { setOrganisationList, setUserId } from "../../redux/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";
import { storeInSession } from "../../Utils/Auth";

type Type_Login_State = {
	onOtp: boolean;
	otp: number;
};

const LoginForm = () => {
	const [state, setState] = useState<Type_Login_State>({
		onOtp: false,
		otp: 0,
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const emailInputRef = useRef<HTMLInputElement>(null);
	const emailLabelRef = useRef<HTMLLabelElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const handleLoginFormSubmit = async (
		e: SyntheticEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (passwordInputRef.current) {
			const passwordInput: number = parseInt(passwordInputRef.current.value);

			if (passwordInput) {
				if (passwordInput === state.otp && emailInputRef.current) {
					const userData: any = await get_user_by_email(
						emailInputRef.current.value
					);
					const userId = userData.id;
					const organizationList = await get_users_organization(userId);
					dispatch(setUserId(userId));
					if (organizationList) dispatch(setOrganisationList(organizationList));
					storeInSession("userId", userId);
					navigate("/organization-lists");
				}
			} else {
				emailInputRef.current!.style.borderColor = "#f54966";
				emailLabelRef.current!.innerText = "Please enter valid otp";
			}
		}

		emailInputRef.current!.value = "";
		passwordInputRef.current!.value = "";
	};

	const handleNext = async (
		e: SyntheticEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		let emailInput = emailInputRef.current?.value;

		let emailPattern = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

		if (emailInput && emailPattern.test(emailInput!)) {
			const sentOtp = await sendEmail("otp", emailInput);
			if (sentOtp) setState({ ...state, onOtp: true, otp: sentOtp });
			else {
				emailInputRef.current!.style.borderColor = "#f54966";
				emailLabelRef.current!.style.color = "#f54966";
				emailLabelRef.current!.innerText =
					"User does not exists. Please Signup";
			}
		} else {
			emailInputRef.current!.style.borderColor = "#f54966";
			emailLabelRef.current!.innerText = "Please enter valid email address";
		}
	};

	return (
		<form className="py-[3rem] flex flex-col gap-[2rem] font-dm_sans">
			<div>
				<label
					ref={emailLabelRef}
					className=" text-white text-sm font-dm_sans"
					htmlFor="email"
				>
					Email
				</label>
				<div className="flex mt-[0.3rem]">
					<span className="w-[3rem] h-[2.5rem] flex justify-center items-center bg-dark_gray rounded-l font-dm_sans">
						<span className="material-symbols-outlined text-white/50">
							alternate_email
						</span>
					</span>
					<input
						data-testid="email-input"
						ref={emailInputRef}
						className="w-full h-[2.5rem] caret-white/70 bg-Secondary_background_color border border-dark_gray rounded-r px-4 code-font text-white/80"
						type="email"
						placeholder="name@work.com"
						readOnly={state.onOtp}
						required
					/>
				</div>
			</div>
			{state.onOtp ? (
				<React.Fragment>
					<div>
						<label
							className=" text-white/60 text-sm font-dm_sans"
							htmlFor="email"
						>
							OTP
						</label>
						<div className="flex mt-[0.3rem]">
							<span className="w-[3rem] h-[2.5rem] flex justify-center items-center bg-dark_gray rounded-l">
								<span className="material-symbols-outlined text-white/50">
									lock
								</span>
							</span>
							<input
								data-testid="password-input"
								ref={passwordInputRef}
								className="w-full h-[2.5rem] caret-white/70 bg-Secondary_background_color border border-dark_gray rounded-r px-4 code-font text-white/80"
								type="number"
								placeholder="Otp"
								required
							/>
						</div>
					</div>
					<button
						onClick={(e) => handleLoginFormSubmit(e)}
						className="bg-blue_1 hover:bg-blue_2 p-[0rem_2rem] h-[2.5rem] rounded flex  items-center justify-center font-dm_sans"
					>
						<span className="code-font text-sm text-white font-dm_sans">
							Login
						</span>
						<img
							className="w-5 h-auto ml-[1rem]"
							src={ArrowIcon}
							alt="arrow icon"
						/>
					</button>
				</React.Fragment>
			) : (
				<button
					onClick={(e) => handleNext(e)}
					className="bg-blue_1 hover:bg-blue_2 p-[0rem_2rem] h-[2.5rem] rounded flex  items-center justify-center font-dm_sans"
				>
					<span className="code-font text-sm text-white font-dm_sans">
						Next
					</span>
					<span className="material-symbols-outlined text-white">
						navigate_next
					</span>
				</button>
			)}
		</form>
	);
};

export { LoginForm };
