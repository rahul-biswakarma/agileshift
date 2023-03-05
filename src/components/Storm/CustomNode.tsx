import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";

import { Handle, Position } from "reactflow";

import {
	get_background_color_from_name,
	get_text_color_from_name,
} from "../../Utils/Backend";
import { IdComponent } from "../DataTable/idComponent";
import TagComponent from "../DataTable/tagComponent";
import UserComponent from "../DataTable/userComponent";
import { setSideBar } from "../../redux/reducers/SideBarSlice";

type Type_IdNodeProps = {
	data: {
		id: any;
		color: string;
		schemaData: any;
		data: any;
		fieldName: string;
	};
};

type Type_OrgNameNode = {
	data: {
		name: string;
	};
};

type Type_FieldNameNode = {
	data: {
		name: string;
		color: string;
		icon: string;
	};
};
type Type_FullDataNodeProps = {
	id: any;
	color: string;
	schemaData: any;
	data: any;
	fieldName: string;
};

const IdNode = (props: Type_IdNodeProps) => {
	const [showFullData, setShowFullData] = useState(false);
	return (
		<div
			className="transition-all"
			onClick={() => setShowFullData(!showFullData)}
		>
			<Handle
				type="target"
				position={Position.Top}
			/>
			{showFullData ? (
				<FullDataNode
					data={props.data.data}
					id={props.data.id}
					color={props.data.color}
					fieldName={props.data.fieldName}
					schemaData={props.data.schemaData}
				/>
			) : (
				<IdComponent
					itemId={props.data.id}
					color={props.data.color}
				/>
			)}
			<Handle
				type="source"
				position={Position.Bottom}
				id="a"
			/>
		</div>
	);
};

const FullDataNode = (props: Type_FullDataNodeProps) => {
	let schema = props.schemaData.filter((schema: any) => {
		return schema.name === props.fieldName;
	});
	const dispatch = useAppDispatch();
	return (
		<div
			style={{
				borderColor: get_background_color_from_name(props.color),
			}}
			className="bg-background_color p-[0.5rem] transition-all rounded-md border-2 flex flex-col gap-[0.5rem]"
		>
			<button
				onClick={() =>
					dispatch(
						setSideBar({
							sidebarType: "editMode",
							createModeCalledByField: "",
							fieldId: props.data.id,
							linkedData: [],
							id: props.data.id,
						})
					)
				}
			>
				<IdComponent
					itemId={props.id}
					color={props.color}
				/>
			</button>

			{schema[0].list &&
				schema[0].list.length > 0 &&
				schema[0].list.map((cols: any) => {
					if (cols.columnType === "user") {
						return (
							<div
								key={cols.columnName}
								className="flex gap-[0.5rem] items-center text-[14px]"
							>
								<p className="font-fira_code text-white/30 text-[14px]">
									{cols.columnName}
								</p>
								<UserComponent value={props.data[cols.columnName]} />
							</div>
						);
					} else if (cols.columnType === "tags") {
						return (
							<div
								key={cols.columnName}
								className="flex gap-[0.5rem] items-center text-[14px]"
							>
								<p className="font-fira_code text-white/30 text-[14px]">
									{cols.columnName}
								</p>
								<TagComponent value={props.data[cols.columnName]} />
							</div>
						);
					} else {
						return (
							<div
								key={cols.columnName}
								className="flex gap-[0.5rem] items-center text-[14px]"
							>
								<p className="font-fira_code text-white/30 text-[14px]">
									{cols.columnName}
								</p>
								{props.data[cols.columnName]}
							</div>
						);
					}
				})}
		</div>
	);
};

const FieldNameNode = (props: Type_FieldNameNode) => {
	return (
		<div className="transition-all">
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div
				style={{
					color: get_text_color_from_name(props.data.color),
					borderColor: get_background_color_from_name(props.data.color),
					backgroundColor: get_background_color_from_name(props.data.color),
				}}
				className="flex items-center gap-[0.5rem] border-2 p-[0.5rem_1rem] rounded-md font-fira_code text-[1rem]"
			>
				<span className="material-symbols-outlined">{props.data.icon}</span>
				{props.data.name}
			</div>
			<Handle
				type="source"
				position={Position.Bottom}
				id="a"
			/>
		</div>
	);
};

const OrgNameNode = (props: Type_OrgNameNode) => {
	return (
		<div className="transition-all rotate-[-90deg] p-[0.5rem_2rem] border-[2px] border-white/20 rounded-md">
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="text-white font-fira_code">{props.data.name}</div>
			<Handle
				type="source"
				position={Position.Bottom}
				id="a"
			/>
		</div>
	);
};

export { IdNode, FullDataNode, FieldNameNode, OrgNameNode };
