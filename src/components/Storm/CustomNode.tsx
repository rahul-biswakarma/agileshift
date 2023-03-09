import { useAppDispatch } from "../../redux/hooks";

import { Handle, Position } from "reactflow";

import {
	get_background_color_from_name,
	get_text_color_from_name,
} from "../../Utils/Backend";
import TagComponent from "../DataTable/tagComponent";
import UserComponent from "../DataTable/userComponent";
import { setSideBar } from "../../redux/reducers/SideBarSlice";
import { DisplayIdComponent } from "../DataTable/displayIdComponentContainer";

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
	data: {
		id: any;
		color: string;
		schemaData: any;
		data: any;
		fieldName: string;
	};
};

const IdNode = (props: Type_IdNodeProps) => {
	return (
		<div className="transition-all">
			<Handle
				type="target"
				position={Position.Top}
			/>
			<DisplayIdComponent
				displayId={props.data.data.displayId}
				field={props.data.fieldName}
				color={props.data.color}
				opacity={100}
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id="a"
			/>
		</div>
	);
};

const FullDataNode = (props: Type_FullDataNodeProps) => {
	let schema = props.data.schemaData.filter((schema: any) => {
		return schema.name === props.data.fieldName;
	});

	const dispatch = useAppDispatch();
	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div
				style={{
					borderColor: get_background_color_from_name(props.data.color),
				}}
				className="relative bg-background_color p-[0.5rem] transition-all rounded-md border-2 flex flex-col gap-[0.5rem] min-w-[200px] w-full transition-all ease-in-out"
			>
				<button
					className="transition-all ease-in-out"
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
					<DisplayIdComponent
						displayId={props.data.data.displayId}
						color={props.data.color}
						field={props.data.fieldName}
					/>
				</button>

				{schema[0].list &&
					schema[0].list.length > 0 &&
					schema[0].list.map((cols: any) => {
						if (cols.columnType === "user") {
							return (
								<div
									key={cols.columnName}
									className="flex gap-[0.5rem] items-center text-[14px] w-full transition-all ease-in-out"
								>
									<p className="font-fira_code text-white/30 text-[14px]">
										{cols.columnName}
									</p>
									<UserComponent value={props.data.data[cols.columnName]} />
								</div>
							);
						} else if (cols.columnType === "tag") {
							return (
								<div
									key={cols.columnName}
									className="flex gap-[0.5rem] items-center text-[14px] w-full transition-all ease-in-out"
								>
									<p className="font-fira_code text-white/30 text-[14px]">
										{cols.columnName}
									</p>
									<TagComponent value={props.data.data[cols.columnName]} />
								</div>
							);
						} else {
							return (
								<div
									key={cols.columnName}
									className="flex gap-[0.5rem] items-center text-[14px] w-full transition-all ease-in-out"
								>
									<p className="font-fira_code text-white/30 text-[14px]">
										{cols.columnName}
									</p>
									{props.data.data[cols.columnName]}
								</div>
							);
						}
					})}
			</div>
			<Handle
				type="source"
				position={Position.Bottom}
				id="a"
			/>
		</>
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
		<div className="transition-all p-[0.5rem_2rem] border-[2px] border-white/20 rounded-md">
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="text-white font-fira_code uppercase">
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

export { IdNode, FullDataNode, FieldNameNode, OrgNameNode };
