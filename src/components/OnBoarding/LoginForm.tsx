import React, { useRef, SyntheticEvent } from "react";

import LockIcon from "../../assets/icons/lock-icon.svg";
import EmailIcon from "../../assets/icons/email-icon.svg";
import ArrowIcon from "../../assets/icons/arrow-icon.svg";

const LoginForm = () => {
	const emailInputRef = useRef<HTMLInputElement>(null);
	const emailLabelRef = useRef<HTMLLabelElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	function handleLoginFormSubmit(
		e: SyntheticEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		let emailInput = emailInputRef.current?.value;
		let passwordInput = passwordInputRef.current?.value;

		let emailPattern = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

		if (emailPattern.test(emailInput!))
			alert(`Hacking successful: ${emailInput}, ${passwordInput}`);
		else {
			emailInputRef.current!.style.borderColor = "red";
			emailLabelRef.current!.innerText = "Please enter valid email address";
		}

		emailInputRef.current!.value = "";
		passwordInputRef.current!.value = "";
	}

	return (
		<form className="py-[3rem] flex flex-col gap-[2rem] font-dm_sans">
			<div>
				<label
					ref={emailLabelRef}
					className=" text-black/60 text-sm font-dm_sans"
					htmlFor="email"
				>
					Email
				</label>
				<div className="flex mt-[0.3rem]">
					<span className="w-[3rem] h-[2.5rem] flex justify-center items-center bg-input_bg rounded-l font-dm_sans">
						<img
							src={EmailIcon}
							alt="id card icon"
							className="w-5 h-auto"
						/>
					</span>
					<input
						data-testid="email-input"
						ref={emailInputRef}
						className="w-full h-[2.5rem] border border-input_bg rounded-r px-4 code-font focus:border-input_bg font-dm_sans"
						type="email"
						placeholder="name@work.com"
						required
					/>
				</div>
			</div>
			<div>
				<label
					className=" text-black/60 text-sm font-dm_sans"
					htmlFor="email"
				>
					OTP
				</label>
				<div className="flex mt-[0.3rem]">
					<span className="w-[3rem] h-[2.5rem] flex justify-center items-center bg-input_bg rounded-l">
						<img
							src={LockIcon}
							alt="id card icon"
							className="w-5 h-auto"
						/>
					</span>
					<input
						data-testid="password-input"
						ref={passwordInputRef}
						className="w-full h-[2.5rem] border border-input_bg rounded-r px-4 code-font font-dm_sans"
						type="password"
						required
					/>
				</div>
			</div>
			<button
				onClick={(e) => handleLoginFormSubmit(e)}
				className="bg-blue_1 hover:bg-blue_2 p-[0rem_2rem] h-[2.5rem] rounded flex  items-center justify-center font-dm_sans"
			>
				<span className="code-font text-sm text-white font-dm_sans">Login</span>
				<img
					className="w-5 h-auto ml-[1rem]"
					src={ArrowIcon}
					alt="arrow icon"
				/>
			</button>
		</form>
	);
};

export { LoginForm };
