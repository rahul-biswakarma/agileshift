import { useState } from "react";

import { Handle, Position } from "reactflow";
import { get_background_color_from_name } from "../../Utils/Backend";
import { IdComponent } from "../DataTable/idComponent";
import TagComponent from "../DataTable/tagComponent";
import UserComponent from "../DataTable/userComponent";

type Type_IdNodeProps = {
	data: {
		id: any;
		color: string;
		schemaData: any;
		data: any;
		fieldName: string;
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
	return (
		<div
			style={{
				borderColor: get_background_color_from_name(props.color),
			}}
			className="bg-background_color p-[0.5rem] transition-all rounded-md border-2"
		>
			<IdComponent
				itemId={props.id}
				color={props.color}
			/>
			{schema[0].list &&
				schema[0].list.length > 0 &&
				schema[0].list.map((cols: any) => {
					if (cols.columnType === "user") {
						return (
							<UserComponent
								key={cols.columnName}
								value={props.data[cols.columnName]}
							/>
						);
					} else if (cols.columnType === "tags") {
						return (
							<TagComponent
								key={cols.columnName}
								value={props.data[cols.columnName]}
							/>
						);
					} else {
						return (
							<div key={cols.columnName}>
								{cols.name}: {props.data[cols.columnName]}
							</div>
						);
					}
				})}
		</div>
	);
};

export { IdNode, FullDataNode };
