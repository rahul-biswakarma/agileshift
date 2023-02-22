import React from "react";

type Type_IssuesIdComponentProps = {
	issuesId: string;
};

const IssuesIdComponent = (props: Type_IssuesIdComponentProps) => {
	return (
		<div className="bg-blue-300 text-fira_code rounded-sm text-blue-600 p-[5px]">
			{props.issuesId}
		</div>
	);
};

export default IssuesIdComponent;
