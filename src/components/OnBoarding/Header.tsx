import React from "react";

const OnBoardingHeader = () => {
	return (
		<div className="font-dm_sans">
			<a
				className="flex gap-[1rem] items-center"
				href="/"
			>
				<span className="material-symbols-outlined text-white">cyclone</span>
				<h1 className="text-md text-highlight_font_color font-semibold font-dm_sans">
					Sign for AgileShift
				</h1>
			</a>

			<p className="text-white/40 text-md mt-[1rem]">
				Welcome to AgileShift, our mission is to help the world's most customer
				centric companies build and support great products.
			</p>
		</div>
	);
};

export { OnBoardingHeader };
