import React, { useEffect } from "react";

import { LoginForm } from "./LoginForm";
import { OnBoardingHeader } from "./Header";

const Login = () => {
	useEffect(() => {
		document.title = "Login | AgileShift";
	}, []);

	return (
		<div
			data-testid="login-component"
			className="w-full h-[100vh] overflow-hidden justify-center grid max-[800px]:grid-cols-[100%] max-[1200px]:grid-cols-[500px_auto] grid-cols-[700px_auto] font-dm_sans"
		>
			<section className="flex flex-col items-center justify-center bg-background_color  w-full h-full p-12">
				<main className="max-w-[500px]">
					<OnBoardingHeader />
					<LoginForm />
					<p className="text-sm text-highlight_font_color">
						Don't have an account?{" "}
						<span className="text-white/40 font-semibold font-fira_code cursor-pointer hover:text-purple-400 hover:underline">
							<a href="/signup">Sign Up</a>
						</span>
					</p>
				</main>
			</section>
		</div>
	);
};

export { Login };
