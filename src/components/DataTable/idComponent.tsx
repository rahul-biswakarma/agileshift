import React from "react";

type Type_IssuesIdComponentProps = {
	issuesId: string;
	color: string;
};

const IssuesIdComponent = (props: Type_IssuesIdComponentProps) => {
	// let textColor = getTextColorFromName(props.color);
	// let bgColor = getBackgroundColorFromName(props.color);
	return (
		<div  className="bg-blue-300 text-fira_code rounded-sm text-blue-600 p-[5px]">
			{props.issuesId}
		</div>
	);
};

export default IssuesIdComponent;
