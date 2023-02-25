import React, { useState, useEffect } from "react";

import logoSvg from "../../assets/logo.svg";

const Header = () => {
	const [userData, setUserData] = useState<TYPE_USER>({
		id: "",
		name: "",
		email: "",
		avatar: "",
		organisation: [""],
	});

	useEffect(() => {
		setUserData({
			id: "123",
			name: "Rahul",
			email: "rahul.id39@gmail.com",
			avatar: "https://cdn.wallpapersafari.com/30/24/Vwmyh9.jpg",
			organisation: ["dsjbfshj"],
		});
	}, []);

	return (
		<div className="p-[1rem_2rem] flex gap-[3rem] justify-between border-[2px] border-Secondary_background_color">
			<div className="flex gap-[1rem] items-center">
				<img
					className="w-8"
					src={logoSvg}
					alt="logo"
				/>
				{/* <h1 className="font-inter text-indigo-500 font-[500] text-[1.2rem]">
					AgileShift
				</h1> */}
			</div>

			<div className="w-full max-w-[800px] rounded-md flex gap-[10px] bg-Secondary_background_color p-[2px]">
				<div className="flex rounded-md bg-background_color items-center px-4">
					<span className="material-symbols-outlined text-white/30">
						search
					</span>
				</div>
				<input
					name="search-input"
					type="text"
					placeholder="Search items, feilds, users and etc"
					className="w-full flex-1 font-fira_code font-lg rounded-r-lg px-4 bg-Secondary_background_color h-9 outline-none text-white placeholder:text-white/20"
				/>
			</div>
			<div className="flex gap-[2rem] items-center">
				<span className="material-symbols-outlined text-white/20 cursor-pointer hover:text-white">
					notifications
				</span>
				<span className="material-symbols-outlined text-white/20 cursor-pointer hover:text-white">
					settings
				</span>
				<img
					className="max-w-[35px] max-h-[35px] min-w-[35px] min-h-[35px]  rounded-full cursor-pointer"
					src={`${userData.avatar}`}
					alt={`${userData.name}`}
				/>
			</div>
		</div>
	);
};

export default Header;
 