import { Handle, Position, NodeProps } from "reactflow";
import { IdComponent } from "../DataTable/idComponent";

type Type_FullDataNodeProps = NodeProps & {
	onClick?: () => void;
};

type Type_IdNodeProps = {
	data: { id: string; color: string };
};

const IdNode = (props: Type_FullDataNodeProps) => {
	return (
		<div
			className="clickable"
			onClick={props.onClick}
		>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<IdComponent
				itemId={props.data.id}
				color={props.data.color}
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id="a"
			/>
		</div>
	);
};

const FullDataNode = (props: Type_IdNodeProps) => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<IdComponent
				itemId={props.data.id}
				color="#fff"
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id="a"
			/>
		</>
	);
};

export { IdNode, FullDataNode };
