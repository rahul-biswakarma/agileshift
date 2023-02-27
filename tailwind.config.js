module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// font colors
				primary_font_color: "#808080",
				highlight_font_color: "#FFFFFF",
				highlight_icon_color: "#CE43FF",

				// SignUp Components
				bg_1: "#ffffff",
				bg_2: "#f2f2f2",
				border_color: "#e5e7eb",
				blue_1: "#0040ff",
				blue_2: "#00134d",
				dark_gray: "#575757",
				input_bg: "#f1f1f1",

				// Dashboard Components
				background_color: "#161616",
				Secondary_background_color: "#1F1F1F", //color use in navBar and serch

				//Sidebar
				sidebar_bg: "#262626",
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
				dm_sans: ["DM Sans", "sans-serif"],
				fira_code: ["Fira Code", "monospace"],
			},
			backgroundImage: {
				login_hero_image: "url('./assets/images/login.webp')",
			},
		},
	},
	plugins: [],
};
