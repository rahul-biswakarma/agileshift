import React, { useState, useMemo, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";

import { IdComponent } from "./idComponent";
import tagComponent from "./tagComponent";
import userComponent from "./userComponent";
import stringComponent from "./stringComponent";

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
	wrapText?: boolean;
}>;

const DataTable = (props: Type_DataTableProps) => {
	const gridRef = useRef<any>();
	const defaultColDef = useMemo<any>(() => {
		return {
			sortable: true,
			resizable: true,
		};
	}, []);
	const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

	// const onGridReady = (params: any) => {
	// 	params.api.sizeColumnsToFit();
	// };

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
			if (schema.columnType === "id")
				tempColumnDefs.push({
					field: schema.columnTitle,
					maxWidth: 200,
					minWidth: 200,
					cellRenderer: idComponentWrapper,
					cellClass: ["flex", "items-center", "cell-style-class"],
					headerClass: ["header-style-class"],
					wrapText: true,
				});
			else if (schema.columnType === "tag") {
				tempColumnDefs.push({
					field: schema.columnTitle,
					cellRenderer: tagComponent,
					cellClass: ["flex", "items-center", "cell-style-class", "gap-[5px]"],
					headerClass: ["header-style-class"],
					wrapText: true,
				});
			} else if (schema.columnType === "user") {
				tempColumnDefs.push({
					field: schema.columnTitle,
					cellRenderer: userComponent,
					cellClass: ["flex", "items-center", "cell-style-class", "gap-[5px]"],
					headerClass: ["header-style-class"],
					wrapText: true,
				});
			} else {
				tempColumnDefs.push({
					field: schema.columnTitle,
					minWidth: 100,
					cellRenderer: stringComponent,
					cellClass: [
						"flex",
						"items-center",
						"font-dm_sans",
						"cell-style-class",
					],
					headerClass: ["header-style-class"],
					wrapText: true,
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
				rowHeight={50}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				onGridSizeChanged={() => {
					gridRef.current.api.sizeColumnsToFit();
				}}
				domLayout={"autoHeight"}
				suppressHorizontalScroll={false}
			></AgGridReact>
		</div>
	);
};

export default DataTable;
