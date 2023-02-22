import React from "react";
import DataTable from "../DataTable";
import NavBar from "./NavBar";
import SearchCompont from "./SearchCompont";

export default function Dashboard() {
	const [selectedTab, setSelectedTab] = React.useState<string>("Dashboard");

	let dummyData = [
		{
			id: "TKT-1",
			title: "Add Responsiveness",
			stage: "Work In Progress",
			owner: "Rahul",
			tag: {
				color: "#FFFFFF",
				tagName: "Now",
			},
		},
		{
			id: "TKT-2",
			title: "Add Custom Theme",
			stage: "Queued",
			owner: "Nikhil",
			tag: {
				color: "#000000",
				tagName: "Now",
			},
		},
		{
			id: "TKT-3",
			title: "Add Responsiveness",
			stage: "Work In Progress",
			owner: "Rahul",
			tag: {
				color: "#FFFFFF",
				tagName: "Next",
			},
		},
	];

	return (
		<div className="bg-background_color h-[100vh]">
			<header className="p-2 flex flex-wrap text-primary_font_color justify-between gap-x-4 gap-y-2">
				<NavBar
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>
				<SearchCompont />
			</header>
			<DataTable
				datas={dummyData}
				dataSchema={[
					{ columnTitle: "id", columnType: "string" },
					{ columnTitle: "title", columnType: "string" },
					{ columnTitle: "stage", columnType: "string" },
					{ columnTitle: "owner", columnType: "string" },
					{ columnTitle: "tag", columnType: "tag" },
				]}
				feildColor="purple"
			/>
		</div>
	);
}
