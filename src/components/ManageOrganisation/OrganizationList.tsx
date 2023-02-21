import React, { ChangeEvent } from "react";

const OrganizationList: React.FunctionComponent = () => {
	function createTypes(
		content: TYPE_TICKETS_SCHEMA[] | TYPE_ISSUES_SCHEMA[] | TYPE_PARTS_SCHEMA[]
	) {
		content.forEach((data) => {});
	}

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const contents = event.target?.result as string;
				createTypes(JSON.parse(contents));
			};
			reader.readAsText(file);
		}
	};

	return (
		<div>
			<input
				type="file"
				onChange={handleFileChange}
			/>
		</div>
	);
};

export default OrganizationList;
