import React from "react";
import DataTable from "../DataTable";
import NavBar from "./NavBar";
import SearchCompont from "./SearchCompont";

export default function Dashboard() {
	return (
		<div className="bg-background_color h-[100vh]">
			<header className="p-2 flex flex-wrap text-primary_font_color justify-between gap-x-4 gap-y-2">
				<NavBar />
				<SearchCompont />
			</header>
		</div>
	);
}
