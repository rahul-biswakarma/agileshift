import React from "react";
import { getBezierPath } from "reactflow";

const CustomEdge = (props: any) => {
	const {
		id,
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
		style = {},
		data,
		markerEnd,
	} = props;
	const [edgePath] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	const solidLine = {
		...style,
		strokeDasharray: "unset",
	};

	return (
		<>
			{data.dottedEdge ? (
				<path
					id={id}
					style={style}
					className="react-flow__edge-path"
					d={edgePath}
					markerEnd={markerEnd}
				/>
			) : (
				<path
					id={id}
					style={solidLine}
					className="react-flow__edge-path"
					d={edgePath}
					markerEnd={markerEnd}
				/>
			)}
			{/* <text>
				<textPath
					href={`#${id}`}
					style={{ fontSize: 12 }}
					startOffset="50%"
					textAnchor="middle"
				>
					{data.text}
				</textPath>
			</text> */}
		</>
	);
};

export { CustomEdge };
