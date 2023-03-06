import {
	get_background_color_from_name,
	get_text_color_from_name,
} from "../../Utils/Backend";
import { uniqueAbbreviations } from "../../Utils/HelperFunctions";

type Type_DisplayIdComponentProps = {
	displayId: string;
	color: string;
	field: string;
	opacity?: number;
};

const DisplayIdComponent = (props: Type_DisplayIdComponentProps) => {
	let textColor = get_text_color_from_name(props.color);
	let bgColor = get_background_color_from_name(props.color);

	return (
		<div
			style={{
				color: textColor,
				background: props.opacity?`${bgColor}${props.opacity}`:`${bgColor}40`,
				borderColor: textColor,
			}}
			className="w-max h-[20px] font-fira_code rounded-md text-blue-600 text-center px-[8px] py-[12px] flex justify-center items-center text-[12px] font-[500] border-y uppercase"
		>
			{uniqueAbbreviations(props.field)}-{props.displayId}
		</div>
	);
};

export { DisplayIdComponent };
