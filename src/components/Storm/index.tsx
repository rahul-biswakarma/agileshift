import { useMemo, useEffect, useState } from "react";
import ReactFlow from "reactflow";
import { v4 as uuidv4 } from "uuid";

import { IdNode, FieldNameNode, OrgNameNode } from "./CustomNode";

import "reactflow/dist/style.css";
import {
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
		let x = 0,
			y = 0;
		let tempNode: any = [];
		let tempEdge: any = [];

		// Org Name
		tempNode.push({
			id: "orgName",
			position: { x: -500, y: 100 },
			data: {
				name: orgName,
			},
			type: "OrgNameNode",
		});

		if (data && data.length > 0)
			data.map((field: any) => {
				tempNode.push({
					id: field.name,
					position: { x: x, y: y },
					data: {
						name: field.name,
						icon: fieldIconMap[field.name] || "home",
						color: fieldNameColorMap[field.name] || "#fff",
					},
					type: "FieldNameNode",
				});
				tempEdge.push({
					id: `${uuidv4()}-a`,
					source: "orgName",
					target: field.name,
					type: "smoothstep",
					animated: true,
					style: { stroke: "#fff" },
				});
				y += 200;

				field.data.map((data: any) => {
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
	}, [fieldNameColorMap, data, schemaData, fieldIconMap, orgName]);

	const handleNodeDrag = (event: any, node: any) => {
		setNodePositions((prevNodePositions) => ({
			...prevNodePositions,
			[node.id]: node.position,
		}));
	};

	return (
		<div className="w-sceen h-screen text-white">
			{nodes && nodes.length > 0 && edges && (
				<ReactFlow
					onNodeDrag={handleNodeDrag}
					draggable={true}
					nodesDraggable={true}
					snapToGrid={true}
					nodes={nodes.map((node: any) => ({
						...node,
						position: nodePositions[node.id] || node.position,
					}))}
					edges={edges}
					nodeTypes={nodeTypes}
				></ReactFlow>
			)}
		</div>
	);
};

export default Storm;
