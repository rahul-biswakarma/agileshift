import React from "react";

import DataTable from "../DataTable";
import BuildQuadarntHeader from "./BuildQuadarntHeader";

type Type_BuildQuadarntProps = {
	fieldData: TYPE_FIELD;
	datas: any;
};

const BuildQuadarnt = (props: Type_BuildQuadarntProps) => {
	return (
		<div>
			<BuildQuadarntHeader itemName={props.fieldData.name} />
			<main className="p-[1rem]">
				<DataTable
					datas={props.datas}
					dataSchema={props.fieldData.list}
					fieldColor={props.fieldData.color}
				/>
			</main>
		</div>
	);
};

export default BuildQuadarnt;
