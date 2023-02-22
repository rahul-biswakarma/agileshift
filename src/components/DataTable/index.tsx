import React, { useState, useMemo, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";

import { IdComponent } from "./idComponent";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type Type_DataTableProps = {
	dataSchema: { color: string; schema: Array<TYPE_SCHEMA> };
	datas: any;
	feildColor: string;
};
type Type_AgGridColsDefs = Array<{
	field: string;
	maxWidth?: number;
	minWidth?: number;
	cellRenderer?: React.ComponentType<any>;
	cellRendererParams?: any;
	cellClass?: Array<string>;
	headerClass?: Array<string>;
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
		props.dataSchema.schema.map((schema: TYPE_SCHEMA) => {
			function idComponentWrapper(params: any) {
				return (
					<IdComponent
						color={props.dataSchema.color}
						issuesId={params.value}
					/>
				);
			}
			if (schema.columnTitle === "id")
				tempColumnDefs.push({
					field: schema.columnTitle,
					maxWidth: 100,
					minWidth: 100,
					cellRenderer: idComponentWrapper,
					cellClass: ["flex", "items-center", "cell-style-class"],
					headerClass: ["header-style-class"],
				});
			else {
				tempColumnDefs.push({
					field: schema.columnTitle,
					minWidth: 100,
					cellClass: [
						"flex",
						"items-center",
						"font-dm_sans",
						"cell-style-class",
					],
					headerClass: ["header-style-class"],
				});
			}
			return "";
		});
		setColumnDefs(tempColumnDefs);

		let allColDefsFromSchema: any = [];
		props.dataSchema.schema.map((schema: TYPE_SCHEMA) => {
			allColDefsFromSchema.push(schema.columnTitle.toLowerCase());
			return "";
		});

		// Setting AgGridRowsData
		let tempRowData: any = [];
		props.datas.map((row: any) => {
			let tempRow: { [key: string]: any } = {};
			allColDefsFromSchema.map((colTitle: string) => {
				tempRow[colTitle] = row[colTitle.toLowerCase()];
				return "";
			});
			tempRowData.push(tempRow);
			return "";
		});
		setRowData(tempRowData);
	}, [props.datas, props.dataSchema]);

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
