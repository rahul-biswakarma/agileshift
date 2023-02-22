import {
	get_background_color_from_name,
	get_text_color_from_name,
} from "../../Utils/Backend";

type Type_IssuesIdComponentProps = {
	issuesId: string;
	color: string;
};

const IdComponent = (props: Type_IssuesIdComponentProps) => {
	console.log(props);
	let textColor = get_text_color_from_name(props.color);
	let bgColor = get_background_color_from_name(props.color);
	return (
		<div
			style={{
				color: textColor,
				backgroundColor: bgColor,
			}}
			className="w-max h-[25px] rounded-xl text-fira_code rounded-[8px] text-blue-600 text-center px-[10px] flex justify-center items-center"
		>
			{props.issuesId}
		</div>
	);
};

export { IdComponent };
