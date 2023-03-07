import { useMemo, useEffect, useState, useCallback } from "react";
import ReactFlow, {
	addEdge,
	Background,
	MiniMap,
	useEdgesState,
	useNodesState,
} from "reactflow";

import { IdNode, FieldNameNode, OrgNameNode, FullDataNode } from "./CustomNode";
import { CustomEdge } from "./CustomEdge";

import "reactflow/dist/style.css";
import {
	count_data_in_organisation,
	get_data_by_column_name,
	get_organizations_details,
	get_schema_data,
} from "../../Utils/Backend";
import { generateAllNodesWithEdges } from "./utils";

import { Node } from "reactflow";

type CustomNodeProps = Node & {
	id: string;
	// other custom properties
};

type Type_StormProps = {
	organizationId: string;
};

const Storm = (props: Type_StormProps) => {
	const nodeTypes = useMemo(
		() => ({
			IdNode: IdNode,
			FieldNameNode: FieldNameNode,
			OrgNameNode: OrgNameNode,
			FullDataNode: FullDataNode,
		}),
		[]
	);

	const edgeTypes = {
		custom: CustomEdge,
	};

	// State
	const [data, setData] = useState<any>(null);
	const [orgName, setOrgName] = useState<any>(null);
	const [schemaData, setSchemaData] = useState<any>(null);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [nodePositions, setNodePositions] = useState<{
		[key: string]: { x: number; y: number };
	}>({});
	const [hiddenNodes, setHiddenNodes] = useState<string[]>([]);

	const [fieldNameColorMap, setFieldNameColorMap] = useState<any>(null);
	const [fieldIconMap, setFieldIconMap] = useState<any>(null);
	const [totalNodes, setTotalNodes] = useState<any>(null);
	count_data_in_organisation(props.organizationId).then((data: any) => {
		setTotalNodes(data["total"]);
	});

	// Custom hooks
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const handleNodeClick = (event: MouseEvent, node: CustomNodeProps) => {
		event.preventDefault();
		event.stopPropagation();

		// toggle visibility of child nodes
		const toggleChildNodesVisibility = (node: Node, hidden: boolean) => {
			const childEdges = edges.filter(
				(edge: { source: any }) => edge.source === node.id
			);
			childEdges.forEach((edge: { target: any }) => {
				const childNode = nodes.find(
					(node: { id: any }) => node.id === edge.target
				);
				if (childNode) {
					setHiddenNodes((prevHiddenNodes) =>
						hidden
							? [...prevHiddenNodes, childNode.id]
							: prevHiddenNodes.filter((id) => id !== childNode.id)
					);
					toggleChildNodesVisibility(childNode, hidden);
				}
			});
		};

		const isHidden = hiddenNodes.includes(node.id);
		setHiddenNodes((prevHiddenNodes) =>
			isHidden
				? prevHiddenNodes.filter((id) => id !== node.id)
				: [...prevHiddenNodes, node.id]
		);
		toggleChildNodesVisibility(node, isHidden);
	};

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
					console.log("results", results);
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
		let result = generateAllNodesWithEdges({
			data,
			fieldNameColorMap,
			fieldIconMap,
			orgName,
			totalNodes,
			schemaData,
			isExpanded: isExpanded,
		});

		setNodes(result.nodes);
		setEdges(result.edges);
	}, [
		data,
		fieldIconMap,
		fieldNameColorMap,
		isExpanded,
		orgName,
		schemaData,
		setEdges,
		setNodes,
		totalNodes,
	]);

	const handleNodeDrag = (event: any, node: any) => {
		setNodePositions((prevNodePositions) => ({
			...prevNodePositions,
			[node.id]: node.position,
		}));
	};

	const onConnect = useCallback(
		(params: any) => setEdges((els) => addEdge(params, els)),
		[setEdges]
	);

	const defaultViewport = { x: 0, y: 0, zoom: 0.2 };

	return (
		<div className="relative w-screen h-screen text-white flex">
			<button
				className="absolute top-[1rem] right-[1rem] flex items-center justify-center bg-gray-800 rounded-md p-2 gap-[5px] text-[14px] z-50"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				{isExpanded ? (
					<>
						<span className="material-symbols-outlined">unfold_more</span>
						<p>Expand Nodes</p>
					</>
				) : (
					<>
						<span className="material-symbols-outlined">unfold_less</span>
						<p>Collapse Nodes</p>
					</>
				)}
			</button>
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
					onConnect={onConnect}
				>
					<MiniMap
						nodeStrokeWidth={3}
						zoomable
						pannable
					/>
					<Background />
				</ReactFlow>
			)}
		</div>
	);
};

export default Storm;
