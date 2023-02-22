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
			owner: {
				name: "Rahul",
				avatar:
					"https://i.pinimg.com/236x/52/fe/87/52fe873be054e7f8345c65281b02c63b.jpg",
			},
			tag: [
				{
					color: "#FFFFFF",
					tagName: "Now",
				},
			],
		},
		{
			id: "TKT-2",
			title: "Add Custom Theme",
			stage: "Queued",
			owner: {
				name: "Nikhil",
				avatar:
					"https://i.pinimg.com/236x/52/fe/87/52fe873be054e7f8345c65281b02c63b.jpg",
			},
			tag: [
				{
					color: "#000000",
					tagName: "Now",
				},
				{
					color: "#123456",
					tagName: "Now",
				},
				{
					color: "#943f43",
					tagName: "Now",
				},
			],
		},
		{
			id: "TKT-3",
			title: "Add Responsiveness",
			stage: "Work In Progress",
			owner: {
				name: "Rahul",
				avatar:
					"https://i.pinimg.com/236x/52/fe/87/52fe873be054e7f8345c65281b02c63b.jpg",
			},
			tag: [
				{
					color: "#FFFFFF",
					tagName: "Next",
				},
			],
		},
	];

	return (
		<div className="bg-background_color h-[100vh] font-dm_sans">
			<header className="p-2 flex flex-wrap text-primary_font_color justify-between gap-x-4 gap-y-2">
				<NavBar
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>
				<SearchCompont />
			</header>
			<DataTable
				datas={dummyData}
				dataSchema={{
					color: "purple",
					schema: [
						{ columnTitle: "id", columnType: "id" },
						{ columnTitle: "title", columnType: "title" },
						{ columnTitle: "stage", columnType: "string" },
						{ columnTitle: "owner", columnType: "user" },
						{ columnTitle: "tag", columnType: "tag" },
					],
				}}
				feildColor="purple"
			/>
		</div>
	);
}
