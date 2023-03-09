import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { setActiveTab, setIsEdit } from "../../redux/reducers/SchemaSlice";
import {
	setFieldColor,
	setDatas,
	setDataSchema,
	setTabName,
} from "../../redux/reducers/DataTableSlice";

import {
	get_all_columns_name,
	get_background_color_from_name,
	get_data_by_column_name,
	get_text_color_from_name,
} from "../../Utils/Backend";
import VistaList from "../Filters/VistaList";

interface Type_TabHeaderProps {
	fieldsData: TYPE_FIELD[];
	showStorm: boolean;
	setShowStorm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TabHeader = (props: Type_TabHeaderProps) => {
	const navigate = useNavigate();
	const [hoveredButtonIndex, setHoveredButtonIndex] = useState(-1);
	const tabButtonRef = useRef(null);

	const dispatch = useAppDispatch();
	const organizationId = useAppSelector((state) => state.auth.organisationId);

	const openSchemaEditForm = () => {
		dispatch(setActiveTab(0));
		dispatch(setIsEdit(true));
		navigate("/edit-organization-schema");
	};

	const handleViewStorm = () => {
		let viewStorm = props.showStorm;
		props.setShowStorm(!viewStorm);
		if(viewStorm) {
			dispatch(setTabName("All"));
		}else{
			setHoveredButtonIndex(-1);
			dispatch(setTabName(""));
		}
	};

	const tabName = useAppSelector((state) => state.datatable.tabName);

	return (
		<div className="relative flex h-[60px] px-[1rem] items-center border-b-[1px] justify-between border-Secondary_background_color">
			<div className="flex items-center overflow-x-auto flex-nowrap w-3/4 gap-[1rem]">
				<button
					style={{
						color:
							hoveredButtonIndex === -10 || tabName === "All"
								? `${get_text_color_from_name("purple")}`
								: "rgba(255, 255, 255, 0.3)",
						backgroundColor:
							hoveredButtonIndex === -10 || tabName === "All"
								? `${get_background_color_from_name("purple")}30`
								: ``,
						// borderTop:
						// 	hoveredButtonIndex === -10 || tabName === "All"
						// 			? `2px solid ${get_text_color_from_name("purple")}`
						// 			: `2px solid #161616`,
						// borderBottom:
						// 	hoveredButtonIndex === -10 || tabName === "All"
						// 			? `2px solid ${get_text_color_from_name("purple")}`
						// 			: `2px solid #161616`,
					}}
					className={`p-[0.8rem_1.5rem] font-dm_sans text-[1rem] flex gap-[0.5rem] items-center text-white/30 cursor-pointer rounded-sm hover:text-purple-500`}
					onClick={() => {
						dispatch(setFieldColor("purple"));
						get_data_by_column_name(organizationId, "all").then((res) => {
							dispatch(setDatas(res));
						});
						get_all_columns_name(organizationId).then((res) => {
							dispatch(setDataSchema(res));
						});
						dispatch(setTabName("All"));
						props.setShowStorm(false);
					}}
					onMouseOver={() => setHoveredButtonIndex(-10)}
					onMouseOut={() => setHoveredButtonIndex(-1)}
				>
					<span className="material-symbols-outlined text-inherit">menu</span>
					<p>All</p>
				</button>
				{props.fieldsData.map((field: TYPE_FIELD, index: number) => {
					let textColor = get_text_color_from_name(field.color);
					let backgroundColor = get_background_color_from_name(field.color);
					const isHovered = index === hoveredButtonIndex;
					const buttonStyle = {
						color:
							isHovered || tabName === field.name
								? `${textColor}`
								: `rgba(255, 255, 255, 0.3)`,
						backgroundColor:
							isHovered || tabName === field.name ? `${backgroundColor}30` : ``,
						// borderTop:
						// 	isHovered || tabName === field.name
						// 		? `2px solid ${textColor}`
						// 		: `2px solid #161616`,
						// borderBottom:
						// 	isHovered || tabName === field.name
						// 		? `2px solid ${textColor}`
						// 		: `2px solid #161616`,
					};
					return (
						<button
							onClick={() => {
								dispatch(setFieldColor(field.color));
								get_data_by_column_name(organizationId, field.name).then(
									(res) => {
										dispatch(setDatas(res));
									}
								);
								dispatch(setDataSchema(field.list));
								dispatch(setTabName(field.name));
								props.setShowStorm(false);
							}}
							ref={tabButtonRef}
							key={index}
							className={`p-[0.8rem_1.5rem] font-dm_sans text-[1rem] flex items-center gap-[0.5rem] text-white/30 cursor-pointer rounded-sm`}
							style={buttonStyle}
							onMouseOver={() => setHoveredButtonIndex(index)}
							onMouseOut={() => setHoveredButtonIndex(-1)}
							data-testid={field.name}
						>
							<span className="material-symbols-outlined text-inherit">
								{field.icon}
							</span>
							<p>{field.name}</p>
						</button>
					);
				})}
			</div>
			<div className="flex flex-row items-center h-full gap-[1rem]">
				<button
					onClick={() => handleViewStorm()}
					className={`${
						props.showStorm ? "text-highlight_icon_color" : "text-white/30"
					} 
						p-[0.5rem_1rem] font-dm_sans text-[1rem] cursor-pointer rounded-sm hover:bg-Secondary_background_color flex items-center gap-[0.5rem]`}
				>
					<span className="material-symbols-outlined text-inherit">
						{props.showStorm ? "flash_on" : "flash_off"}
					</span>
					<p className="text-inherit font-dm_sans">Storm</p>
				</button>
				
				<VistaList />
				
				{/* <div className=""> */}
					<button
						onClick={() => openSchemaEditForm()}
						className={`p-[0.5rem_1rem] font-dm_sans text-[1rem] text-white/30 cursor-pointer rounded-sm hover:bg-Secondary_background_color flex items-center gap-[0.5rem]`}
						data-testid="edit-schema"
					>
						<span className="material-symbols-outlined text-inherit">
							edit_note
						</span>
						<p className="text-inherit font-dm_sans">Schema</p>
					</button>
				{/* </div> */}
			</div>
		</div>
	);
};

export default TabHeader;
