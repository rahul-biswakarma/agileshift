import React from "react";

const OnBoardingHeader = () => {
	return (
		<div className="font-dm_sans">
			<a href="/">
				<span className="material-symbols-outlined text-white">cyclone</span>
			</a>
			<h1 className="text-md text-highlight_font_color mt-[0.5rem] font-semibold font-dm_sans">
				Sign for AgileShift
			</h1>
			<p className="text-white/40 text-md mt-[1rem]">
				Welcome to AgileShift, our mission is to help the world's most customer
				centric companies build and support great products.
			</p>
		</div>
	);
};

export { OnBoardingHeader };
