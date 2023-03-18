import React from "react";
import { ReactFlowProvider } from "reactflow";
import ReactFlowCustomWrapper from "./ReactFlowCustomWrapper";

type Type_StormProps = {
	organizationId: string;
};

const Storm = (props: Type_StormProps) => {
	return (
		<div className="relative w-screen h-screen text-white flex overflow-y-auto max-h-[calc(100vh-180px)]">
			<ReactFlowProvider>
				<ReactFlowCustomWrapper organizationId={props.organizationId} />
			</ReactFlowProvider>
		</div>
	);
};

export default Storm;
