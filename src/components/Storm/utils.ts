import { MarkerType } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { get_background_color_from_name } from "../../Utils/Backend";

type generateAllNodesWithEdgesProps = {
	data: any;
	schemaData: any;
	orgName: string;
	totalNodes: number;
	fieldIconMap: any;
	fieldNameColorMap: any;
	isExpanded: boolean;
};

export const generateAllNodesWithEdges = (
	props: generateAllNodesWithEdgesProps
) => {
	let totoalArea = 0;
	let tempNodes: any = [];
	let tempEdges: any = [];

	let {
		data,
		schemaData,
		fieldNameColorMap,
		orgName,
		totalNodes,
		fieldIconMap,
		isExpanded,
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
	if (totalNodes && fieldNameColorMap) {
		totoalArea =
			totalNodes * nodeSize + Object.keys(fieldNameColorMap).length - 1 * 300;
		x = -1 * Math.floor(totoalArea / Object.keys(fieldNameColorMap).length);
	}

	// Generating OrgName Node
	tempNodes.push({
		id: "orgName",
		position: { x: 0, y: 0 },
		data: {
			name: orgName,
		},
		type: "OrgNameNode",
	});

	// Generating Nodes and Edges
	if (data && data.length > 0) {
		data.map((field: any, index: number) => {
			let count = 0;

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
				count += 1;

				// Generating Id Node
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
				});

				// Generating Edges
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

			// Generating FieldName Node
			tempNodes.push({
				id: field.name,
				position: { x: x - (count * nodeSize) / 2, y: fieldNameY },
				data: {
					name: field.name,
					icon: fieldIconMap[field.name] || "home",
					color: fieldNameColorMap[field.name] || "#fff",
				},
				type: "FieldNameNode",
			});
			x -= 150;
			y += yIncrement;
			fieldNameY += yIncrement;
			return "";
		});
	}

	return { nodes: tempNodes, edges: tempEdges };
};
