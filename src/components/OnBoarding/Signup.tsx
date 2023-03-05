import { useEffect } from "react";

import { OnBoardingHeader } from "./Header";
import { SignUpButtons } from "./SignUpButtons";

// import ProductImage from "../../assets/images/product-image.png";
import { useAppSelector } from "../../redux/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

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
			className="w-full h-[100vh] flex justify-center overflow-hidden grid max-[1100px]:grid-cols-[100%] grid-cols-[700px_auto] font-dm_sans"
		>
			<section className="flex flex-col items-center justify-center bg-background_color  w-full h-full p-24 max-[600px]:p-12">
				<main className="max-w-[500px]">
					<OnBoardingHeader />
					<SignUpButtons />
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
