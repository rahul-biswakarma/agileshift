import React, { useState, useMemo, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type Type_DataTableProps = {
	dataSchema: Array<TYPE_SCHEMA>;
	datas: any;
	feildColor: string;
};

type Type_AgGridColsDefs = Array<{
	field: string;
	maxWidth?: number;
	minWidth?: number;
}>;

const DataTable = (props: Type_DataTableProps) => {
	const gridRef = useRef<any>();
	const defaultColDef = useMemo(() => {
		return {
			resizable: true,
		};
	}, []);

	const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

	const onGridReady = (params: any) => {
		params.api.sizeColumnsToFit();
	};

	const [rowData, setRowData] = useState();

	const [columnDefs, setColumnDefs] = useState<Type_AgGridColsDefs>([]);

	useEffect(() => {
		// Setting AgGridColumnsDefitions
		let tempColumnDefs: Type_AgGridColsDefs = [];
		props.dataSchema.map((schema: TYPE_SCHEMA) => {
			if (schema.columnTitle === "id")
				tempColumnDefs.push({
					field: schema.columnTitle,
					maxWidth: 100,
					minWidth: 100,
				});
			else {
				tempColumnDefs.push({
					field: schema.columnTitle,
					minWidth: 100,
				});
			}
		});
		setColumnDefs(tempColumnDefs);

		// Setting AgGridRowsData
		let tempRowData: any = [];
		props.datas.map((row: any) => {
			tempRowData.push({});
		});
		setRowData(tempRowData);
	}, []);

	return (
		<div
			className="ag-theme-alpine"
			style={gridStyle}
		>
			<AgGridReact
				ref={gridRef}
				rowData={rowData}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				onGridReady={onGridReady}
			></AgGridReact>
		</div>
	);
};

export default DataTable;
