import {
	get_background_color_from_name,
	get_text_color_from_name,
} from "../../Utils/Backend";

type Type_IssuesIdComponentProps = {
	itemId: string;
	color: string;
};

const IdComponent = (props: Type_IssuesIdComponentProps) => {
	let textColor = get_text_color_from_name(props.color);
	let bgColor = get_background_color_from_name(props.color);

	return (
		<div
			style={{
				color: textColor,
				background: `${bgColor}`,
				borderColor: textColor,
			}}
			className="w-max h-[20px] font-fira_code rounded-md text-blue-600 text-center px-[8px] py-[12px] flex justify-center items-center text-[12px] font-[500] border-y"
		>
			{props.itemId}
		</div>
	);
};

export { IdComponent };
