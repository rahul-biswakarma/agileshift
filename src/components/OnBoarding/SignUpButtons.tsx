import React from "react";

import InfoIcon from "../../assets/icons/info-icon.svg";
import GithubIcon from "../../assets/icons/github-icon.svg";
import GoogleIcon from "../../assets/icons/google-icon.svg";

import { authWithGithub, authWithGoogle } from "../../Utils/Auth";

function SignUpButtons() {
	return (
		<div className="flex flex-col gap-[1rem] w-full max-[400px]:mt-[2rem] mt-[4rem]">

			{/* Google Authentication Button */}
			<button
				data-testid="continue-with-google-button"
				className="relative w-full bg-blue_1 p-[0.5rem_1rem] rounded flex flex-wrap items-center"
				onClick={()=>authWithGoogle()}
			>
				<img
					src={GoogleIcon}
					alt="Google Icon"
					className="w-6 h-6"
				/>
				<span className="absolute text-center w-full text-white text-sm font-[500] ml-2">
					Continue with Google
				</span>
			</button>

			{/* Github Authentication Button */}
			<button
				data-testid="continue-with-github-button"
				className="relative w-full bg-dark_gray p-[0.5rem_1rem] rounded flex items-center flex-wrap"
				onClick={()=>authWithGithub()}
			>
				<img
					src={GithubIcon}
					alt="Google Icon"
					className="w-6 h-6"
				/>
				<span className="absolute text-center w-full text-white text-sm font-[500] ml-2">
					Continue with Github
				</span>
			</button>

			<div className="flex items-center gap-[10px]">
				<img
					src={InfoIcon}
					alt="Info Icon"
					className="w-5 h-5"
				/>
				<p className="text-sm text-white/40">
					We recommend using your work email
				</p>
			</div>
		</div>
	);
};

export { SignUpButtons };
