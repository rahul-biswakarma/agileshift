import React, { useState, useRef } from "react";
import {
	get_background_color_from_name,
	get_text_color_from_name,
} from "../../Utils/Backend";

interface Type_TabHeaderProps {
	fieldsData: Array<TYPE_FIELD>;
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
}

const TabHeader = (props: Type_TabHeaderProps) => {
	const [hoveredButtonIndex, setHoveredButtonIndex] = useState(-1);
	const tabButtonRef = useRef(null);

	return (
		<div className="flex gap-[3vw] px-[2rem] items-center border-b-[1px] justify-center border-Secondary_background_color py-[0.5rem]">
			{props.fieldsData.map((field: TYPE_FIELD, index: number) => {
				let bgColor = get_background_color_from_name(field.color);
				let textColor = get_text_color_from_name(field.color);
				const isHovered = index === hoveredButtonIndex;
				const buttonStyle = {
					color: isHovered ? `${textColor}` : `rgba(255, 255, 255, 0.3)`,
					backgroundColor: isHovered ? bgColor : "transparent",
				};

				return (
					<button
						ref={tabButtonRef}
						key={index}
						className={`p-[0.5rem_1.5rem] font-dm_sans text-[1rem] flex gap-[0.5rem] text-white/30 cursor-pointer rounded-sm`}
						style={buttonStyle}
						onMouseOver={() => setHoveredButtonIndex(index)}
						onMouseOut={() => setHoveredButtonIndex(-1)}
					>
						<span className="material-symbols-outlined text-inherit">
							{field.icon}
						</span>
						<p>{field.name}</p>
					</button>
				);
			})}
		</div>
	);
};

export default TabHeader;
