import { useMemo, useEffect, useState } from "react";
import ReactFlow, { MarkerType, Background, MiniMap } from "reactflow";
import { v4 as uuidv4 } from "uuid";

import { IdNode, FieldNameNode, OrgNameNode } from "./CustomNode";
import { CustomEdge } from "./CustomEdge";

import "reactflow/dist/style.css";
import {
	count_data_in_organisation,
	get_background_color_from_name,
	get_data_by_column_name,
	get_organizations_details,
	get_schema_data,
} from "../../Utils/Backend";

type Type_StormProps = {
	organizationId: string;
};

const Storm = (props: Type_StormProps) => {
	const nodeTypes = useMemo(
		() => ({
			idNode: IdNode,
			FieldNameNode: FieldNameNode,
			OrgNameNode: OrgNameNode,
		}),
		[]
	);

	const edgeTypes = {
		custom: CustomEdge,
	};

	// State
	const [data, setData] = useState<any>(null);
	const [orgName, setOrgName] = useState<any>(null);
	const [nodes, setNodes] = useState<any>(null);
	const [edges, setEdges] = useState<any>(null);
	const [schemaData, setSchemaData] = useState<any>(null);
	const [nodePositions, setNodePositions] = useState<{
		[key: string]: { x: number; y: number };
	}>({});

	const [fieldNameColorMap, setFieldNameColorMap] = useState<any>(null);
	const [fieldIconMap, setFieldIconMap] = useState<any>(null);
	const [totalNodes, setTotalNodes] = useState<any>(null);
	count_data_in_organisation(props.organizationId).then((data: any) => {
		setTotalNodes(data["total"]);
	});

	// Effects
	useEffect(() => {
		get_schema_data(props.organizationId).then((res) => {
			if (res) {
				setSchemaData(res.schemaData);
			}
		});
		get_organizations_details(props.organizationId).then((res) => {
			if (res) {
				setOrgName(res.name);
			}
		});
	}, [props.organizationId]);

	useEffect(() => {
		if (schemaData && schemaData.length > 0) {
			let promises = schemaData.map((schema: any) => {
				return get_data_by_column_name(props.organizationId, schema.name);
			});

			Promise.all(promises)
				.then((results) => {
					let tempData = results.map((res, index) => {
						return {
							name: schemaData[index].name,
							data: res,
						};
					});
					let tempFeildNameColorMap: any = {};
					schemaData.map((schema: any) => {
						return (tempFeildNameColorMap[schema.name] = schema.color);
					});
					let tempFieldIconMap: any = {};
					schemaData.map((schema: any) => {
						return (tempFieldIconMap[schema.name] = schema.icon);
					});
					setFieldIconMap(tempFieldIconMap);
					setFieldNameColorMap(tempFeildNameColorMap);
					setData(tempData);
				})
				.catch((error) => {
					console.log("Error fetching data:", error);
				});
		}
	}, [schemaData, props.organizationId]);

	useEffect(() => {
		let totoalArea = 0;
		let x = 0,
			y = 600,
			fieldNameY = 300;
		let tempNode: any = [];
		let tempEdge: any = [];

		if (totalNodes && fieldNameColorMap) {
			totoalArea =
				totalNodes * 250 + Object.keys(fieldNameColorMap).length - 1 * 300;
			x = -1 * Math.floor(totoalArea / Object.keys(fieldNameColorMap).length);
		}

		// Org Name
		tempNode.push({
			id: "orgName",
			position: { x: 0, y: 0 },
			data: {
				name: orgName,
			},
			type: "OrgNameNode",
		});

		if (data && data.length > 0) {
			data.map((field: any, index: number) => {
				let count = 0;
				tempEdge.push({
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
						stroke: get_background_color_from_name(
							fieldNameColorMap[field.name]
						),
					},
				});

				field.data.map((data: any) => {
					count += 1;
					tempNode.push({
						id: data.id,
						position: { x: x, y: y },
						data: {
							id: data.id,
							color: fieldNameColorMap[field.name] || "#fff",
							schemaData: schemaData,
							data: data,
							fieldName: field.name,
						},
						type: "idNode",
					});

					data.linkedData.map((link: any) => {
						tempEdge.push({
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

					tempEdge.push({
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
					x += 250;
					return "";
				});

				tempNode.push({
					id: field.name,
					position: { x: x - (count * 250) / 2, y: fieldNameY },
					data: {
						name: field.name,
						icon: fieldIconMap[field.name] || "home",
						color: fieldNameColorMap[field.name] || "#fff",
					},
					type: "FieldNameNode",
				});
				x += 300;
				y += 300;
				fieldNameY += 300;
				return "";
			});
		}
		setNodes(tempNode);
		setEdges(tempEdge);
	}, [fieldNameColorMap, data, schemaData, fieldIconMap, orgName, totalNodes]);

	const handleNodeDrag = (event: any, node: any) => {
		setNodePositions((prevNodePositions) => ({
			...prevNodePositions,
			[node.id]: node.position,
		}));
	};

	const defaultViewport = { x: 0, y: 0, zoom: 1 };

	return (
		<div className="w-screen h-screen text-white">
			{nodes && nodes.length > 0 && edges && (
				<ReactFlow
					onNodeDrag={handleNodeDrag}
					draggable={true}
					nodesDraggable={true}
					snapToGrid={true}
					edgeTypes={edgeTypes}
					nodes={nodes.map((node: any) => ({
						...node,
						position: nodePositions[node.id] || node.position,
					}))}
					edges={edges}
					nodeTypes={nodeTypes}
					defaultViewport={defaultViewport}
					fitView={true}
				>
					<MiniMap />
					<Background />
				</ReactFlow>
			)}
		</div>
	);
};

export default Storm;
