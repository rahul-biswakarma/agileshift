import React from "react";

type Type_BuildQuadrantHeaderProp = {
	itemName: string;
};

const BuildQuadarntHeader = (props: Type_BuildQuadrantHeaderProp) => {
	return (
		<div className="bg-Secondary_background_color p-[1rem_2rem]">
			<p className="font-fira_code text-[0.9rem] font-[600] text-white">
				<span className="text-white/50">BUILD /</span> {props.itemName}
			</p>
		</div>
	);
};

export default BuildQuadarntHeader;
