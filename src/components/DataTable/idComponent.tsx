import {
	get_background_color_from_name,
	get_text_color_from_name,
} from "../../Utils/Backend";

type Type_IssuesIdComponentProps = {
	issuesId: string;
	color: string;
};

const IdComponent = (props: Type_IssuesIdComponentProps) => {
	let textColor = get_text_color_from_name(props.color);
	let bgColor = get_background_color_from_name(props.color);
	return (
		<div
			style={{
				color: textColor,
				backgroundColor: bgColor,
			}}
			className="w-max h-[25px] rounded-[5px] font-fira_code text-blue-600 text-center px-[10px] flex justify-center items-center text-[12px] font-[500]"
		>
			{props.issuesId}
		</div>
	);
};

export { IdComponent };
