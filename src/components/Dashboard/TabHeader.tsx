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
	get_data_by_column_name,
	get_text_color_from_name,
} from "../../Utils/Backend";
import VistaList from "../Filters/VistaList";

interface Type_TabHeaderProps {
	fieldsData: TYPE_FIELD[];
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

	const tabName = useAppSelector((state) => state.datatable.tabName);

	return (
		<div className="relative flex gap-[3vw] px-[2rem] items-center border-b-[1px] justify-center border-Secondary_background_color py-[0.5rem]">
			<button
				style={{
					color:
						tabName === "All"
							? `${get_text_color_from_name("purple")}`
							: "rgba(255, 255, 255, 0.3)",
				}}
				className={`p-[0.5rem_1.5rem] font-dm_sans text-[1rem] flex gap-[0.5rem] items-center text-white/30 cursor-pointer rounded-sm hover:text-purple-500`}
				onClick={() => {
					dispatch(setFieldColor("purple"));
					get_data_by_column_name(organizationId, "all").then((res) => {
						dispatch(setDatas(res));
					});
					get_all_columns_name(organizationId).then((res) => {
						dispatch(setDataSchema(res));
					});
					dispatch(setTabName("All"));
				}}
			>
				<span className="material-symbols-outlined text-inherit">menu</span>
				<p>All</p>
			</button>
			{props.fieldsData.map((field: TYPE_FIELD, index: number) => {
				let textColor = get_text_color_from_name(field.color);
				const isHovered = index === hoveredButtonIndex;
				const buttonStyle = {
					color:
						isHovered || tabName === field.name
							? `${textColor}`
							: `rgba(255, 255, 255, 0.3)`,
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
						}}
						ref={tabButtonRef}
						key={index}
						className={`p-[0.5rem_1.5rem] font-dm_sans text-[1rem] flex items-center gap-[0.5rem] text-white/30 cursor-pointer rounded-sm`}
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
			<VistaList />
			<button
				onClick={() => openSchemaEditForm()}
				className={`p-[0.5rem_1.5rem] font-dm_sans text-[1rem] flex gap-[0.5rem] text-white/30 cursor-pointer rounded-sm absolute right-[0.5rem] hover:bg-Secondary_background_color flex items-center gap-[0.5rem]`}
			>
				<span className="material-symbols-outlined text-inherit">
					edit_note
				</span>
				<p className="text-inherit font-dm_sans">Schema</p>
			</button>
		</div>
	);
};

export default TabHeader;
