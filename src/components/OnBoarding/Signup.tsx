import { useEffect } from "react";

import { OnBoardingHeader } from "./Header";
import { SignUpButtons } from "./SignUpButtons";
import InfoIcon from "../../assets/icons/info-icon.svg";

// import ProductImage from "../../assets/images/product-image.png";
import { useAppSelector } from "../../redux/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { authWithGithub, authWithGoogle } from "../../Utils/Auth";
import GithubIcon from "../../assets/icons/github-icon.svg";
import GoogleIcon from "../../assets/icons/google-icon.svg";

const SignUp = () => {
	const userId = useAppSelector((state: RootState) => state.auth.userId);
	let navigate = useNavigate();

	useEffect(() => {
		document.title = "Sign into AgileShift";
	}, []);

	useEffect(() => {
		if (userId.length > 0) navigate("/organization-lists");
	}, [userId, navigate]);

	return (
		<div
			data-testid="landing-component"
			className="w-full h-[100vh] flex justify-center overflow-hidden grid max-[1100px]:grid-cols-[100%]  grid-cols-[700px_auto] font-dm_sans"
		>
			<section className="flex flex-col items-center justify-center bg-background_color  w-full h-full p-24 max-[600px]:p-12">
				<main className="max-w-[500px] gap-[1rem]">
					<OnBoardingHeader />
					<div className="flex flex-col gap-[1rem] w-full max-[400px]:mt-[2rem] mt-[4rem]">
					<SignUpButtons
						onClick={() => {
							console.log("clicked")
							authWithGoogle()}}
						imgSrc={GoogleIcon}
						altText="Google Icon"
						spanText="Continue with google" 
						className="bg-blue_1"/>
					<SignUpButtons
						onClick={() => authWithGithub()}
						imgSrc={GithubIcon}
						altText="Github Icon"
						spanText="Continue with github"
						className="bg-dark_gray" />
				</div>
					<div className="flex items-center gap-[10px] mt-[1rem]">
						<img
							src={InfoIcon}
							alt="Info Icon"
							className="w-5 h-5"
						/>
						<p className="text-sm text-white/40">
							We recommend using your work email
						</p>
					</div>
					<p className="text-sm text-primary_font_color max-[400px]:my-[2rem] my-[4rem]">
						By continuing, you acknowledge that you have read and understood,
						and agree to AgileShift's{" "}
						<strong className="text-purple-400 font-semibold">
							Terms & Conditions
						</strong>{" "}
						and{" "}
						<strong className="text-purple-400 font-semibold">
							Privacy Policy
						</strong>
						.
					</p>
					<p className="text-sm text-highlight_font_color">
						Already have an account?{" "}
						<span className="text-primary_font_color font-semibold cursor-pointer">
							<a href="/login">Login</a>
						</span>
					</p>
				</main>
			</section>
			<Outlet />
		</div>
	);
};

export { SignUp };
