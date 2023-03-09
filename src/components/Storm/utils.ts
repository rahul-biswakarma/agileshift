import { MarkerType } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { get_background_color_from_name } from "../../Utils/Backend";

type generateAllNodesWithEdgesProps = {
	data: any;
	schemaData: any;
	orgName: string;
	fieldIconMap: any;
	fieldNameColorMap: any;
	isExpanded: boolean;
	excludedNodes: string[];
	nodeCountByFieldName: any;
};

type Type_fieldNameNodeX = {
	[key: string]: number;
};

export const generateAllNodesWithEdges = (
	props: generateAllNodesWithEdgesProps
) => {
	let totalArea = 0;
	let tempNodes: any = [];
	let tempEdges: any = [];
	let fieldNameNodeX: Type_fieldNameNodeX = {};

	console.log("props", props);

	let {
		data,
		schemaData,
		fieldNameColorMap,
		orgName,
		fieldIconMap,
		isExpanded,
		nodeCountByFieldName,
	} = props;

	let x = 0,
		y = 0;
	if (isExpanded) {
		y = 600;
	} else {
		y = 300;
	}

	let nodeSize = isExpanded ? 250 : 100;
	let yIncrement = isExpanded ? 400 : 150;
	let fieldNameY = isExpanded ? 300 : 150;

	// Calculating X position of the nodes
	if (data && data.length > 0) {
		let area = 0;
		data.map((field: any, index: number) => {
			let count = nodeCountByFieldName[field.name] || 0;
			let fieldArea = 0;
			if (count > 0) fieldArea = count * nodeSize;
			else fieldArea = 200;
			fieldNameNodeX[field.name] = x + fieldArea / 2 + area;
			area += fieldArea + 150;
			return "";
		});
		totalArea = area;
	}

	// Generating OrgName Node
	tempNodes.push({
		id: "orgName",
		position: { x: Math.floor(totalArea / 2), y: 0 },
		data: {
			name: orgName,
		},
		type: "OrgNameNode",
	});

	// Generating Nodes and Edges
	if (data && data.length > 0) {
		data.map((field: any, index: number) => {
			// Generating FieldName Node
			tempNodes.push({
				id: field.name,
				position: {
					x: fieldNameNodeX[field.name],
					y: fieldNameY,
				},
				data: {
					name: field.name,
					icon: fieldIconMap[field.name] || "home",
					color: fieldNameColorMap[field.name] || "#fff",
					excludedNodes: props.excludedNodes,
				},
				type: "FieldNameNode",
			});

			// Generating Edge from OrgName Node to FieldName Node
			tempEdges.push({
				id: `${uuidv4()}-a`,
				source: "orgName",
				target: field.name,
				animated: true,
				type: "custom",
				data: { dottedEdge: false },
				markerEnd: {
					type: MarkerType.ArrowClosed,
				},
				style: {
					stroke: get_background_color_from_name(fieldNameColorMap[field.name]),
				},
			});

			// Generating Id Nodes and Edges
			field.data.map((data: any) => {
				// Generating Id Node
				if (!props.excludedNodes.includes(field.name))
					tempNodes.push({
						id: data.id,
						position: { x: x, y: y },
						data: {
							id: data.id,
							color: fieldNameColorMap[field.name] || "#fff",
							schemaData: schemaData,
							data: data,
							fieldName: field.name,
						},
						type: isExpanded ? "FullDataNode" : "IdNode",
						hidden: false,
					});

				// Generating Edges
				console.log("data.linkedData", data.linkedData);
				data.linkedData.map((link: any) => {
					tempEdges.push({
						id: `${uuidv4()}-a`,
						source: data.id,
						target: link,
						type: "custom",
						data: { dottedEdge: true },
						markerEnd: {
							type: MarkerType.ArrowClosed,
						},
						animated: true,
						style: {
							stroke: get_background_color_from_name(
								fieldNameColorMap[field.name]
							),
						},
					});
					return "";
				});

				// Generating Edges from FieldName Node to Id Node
				tempEdges.push({
					id: `${uuidv4()}-a`,
					source: field.name,
					target: data.id,
					type: "custom",
					data: { dottedEdge: true },
					markerEnd: {
						type: MarkerType.ArrowClosed,
					},
					animated: true,
					style: {
						stroke: get_background_color_from_name(
							fieldNameColorMap[field.name]
						),
					},
				});
				x += nodeSize;
				return "";
			});
			x += 150;
			y += yIncrement;
			fieldNameY += yIncrement;
			return "";
		});
	}

	return { nodes: tempNodes, edges: tempEdges, totalArea: totalArea };
};
