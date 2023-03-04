import { useMemo, useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import { v4 as uuidv4 } from "uuid";

import { IdNode, FullDataNode } from "./CustomNode";

import "reactflow/dist/style.css";
import { get_data_by_column_name, get_schema_data } from "../../Utils/Backend";

type Type_StormProps = {
	organizationId: string;
};

const Storm = (props: Type_StormProps) => {
	const nodeTypes = useMemo(
		() => ({
			idNode: IdNode,
			fullDataNode: FullDataNode,
		}),
		[]
	);

	// State
	const [data, setData] = useState<any>(null);
	const [nodes, setNodes] = useState<any>(null);
	const [edges, setEdges] = useState<any>(null);
	const [schemaData, setSchemaData] = useState<any>(null);
	const [selectedNode, setSelectedNode] = useState<string | null>(null);
	const [feildNameColorMap, setFeildNameColorMap] = useState<any>(null);

	// Effects
	useEffect(() => {
		get_schema_data(props.organizationId).then((res) => {
			if (res) {
				setSchemaData(res.schemaData);
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
					setFeildNameColorMap(tempFeildNameColorMap);
					setData(tempData);
				})
				.catch((error) => {
					console.log("Error fetching data:", error);
				});
		}
	}, [schemaData, props.organizationId]);

	useEffect(() => {
		let x = 0,
			y = 0;
		let tempNode: any = [];
		let tempEdge: any = [];
		if (data && data.length > 0)
			data.map((field: any) => {
				tempNode.push({
					id: field.name,
					position: { x: x, y: y },
					data: {
						id: field.name,
						color: feildNameColorMap[field.name] || "#fff",
					},
					type: "idNode",
				});
				y += 100;

				field.data.map((data: any) => {
					tempNode.push({
						id: data.id,
						position: { x: x, y: y },
						data: {
							id: data.id,
							color: feildNameColorMap[field.name] || "#fff",
						},
						type: selectedNode === field.name ? "fullDataNode" : "idNode",
						onClick: () => {
							setSelectedNode(data.id);
							console.log("Clicked");
						},
					});

					data.linkedData.map((link: any) => {
						tempEdge.push({
							id: `${uuidv4()}-a`,
							source: data.id,
							target: link,
							type: "smoothstep",
							animated: true,
							style: { stroke: "#fff" },
						});
						return "";
					});

					tempEdge.push({
						id: `${uuidv4()}-a`,
						source: field.name,
						target: data.id,
						type: "smoothstep",
						animated: true,
						style: { stroke: "#fff" },
					});
					x += 120;
					return "";
				});
				x = 0;
				y += 300;
				return "";
			});
		setNodes(tempNode);
		setEdges(tempEdge);
	}, [feildNameColorMap, data, selectedNode]);

	useEffect(() => {
		if (selectedNode) {
			get_data_by_column_name(props.organizationId, selectedNode).then(
				(res) => {
					if (res) {
						console.log(res);
						let tempNode = nodes.map((node: any) => {
							if (node.id === selectedNode) {
								return {
									...node,
									data: res,
									type: "fullDataNode",
								};
							}
							return node;
						});
						setNodes(tempNode);
					}
				}
			);
		}
	}, [selectedNode, props.organizationId, nodes]);

	return (
		<div className="w-sceen h-screen text-white">
			{nodes && nodes.length > 0 && edges && (
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
				>
					<Background />
					<Controls />
				</ReactFlow>
			)}
		</div>
	);
};

export default Storm;
