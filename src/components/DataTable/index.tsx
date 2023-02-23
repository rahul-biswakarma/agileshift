import React, { useState, useMemo, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import type { GridOptions, GridReadyEvent } from "ag-grid-community";
import { useAppDispatch } from "../../redux/hooks";

import { IdComponent } from "./idComponent";
import tagComponent from "./tagComponent";
import userComponent from "./userComponent";
import stringComponent from "./stringComponent";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { setSideBar } from "../../redux/reducers/SideBarSlice";

interface CustomGridOptions extends GridOptions {
	autoHeight?: boolean;
}

type Type_DataTableProps = {
	dataSchema: Array<TYPE_SCHEMA>;
	datas: any;
	fieldColor: string;
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
	const dispatch = useAppDispatch();

	const gridRef = useRef<any>();
	const defaultColDef = useMemo<any>(() => {
		return {
			sortable: true,
			resizable: true,
		};
	}, []);

	const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

	const gridOptions: CustomGridOptions = {
		detailRowAutoHeight: true,
		rowSelection: "single",
		onRowClicked: function (event) {
			let rowData = event.data;
			dispatch(setSideBar(rowData));
		},
	};

	const [rowData, setRowData] = useState<any>();

	const [columnDefs, setColumnDefs] = useState<Type_AgGridColsDefs>([]);

	const onGridReady = (params: GridReadyEvent) => {
		const { api } = params;
		api.sizeColumnsToFit();
	};

	useEffect(() => {
		// Setting AgGridColumnsDefitions
		let tempColumnDefs: Type_AgGridColsDefs = [];
		props.dataSchema.map((schema: TYPE_SCHEMA) => {
			function idComponentWrapper(params: any) {
				return (
					<IdComponent
						color={props.fieldColor}
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
					minWidth: 250,
					cellRenderer: tagComponent,
					cellClass: ["flex", "items-center", "cell-style-class", "gap-[5px]"],
					headerClass: ["header-style-class"],
					wrapText: true,
				});
			} else if (schema.columnType === "user") {
				tempColumnDefs.push({
					field: schema.columnTitle,
					minWidth: 200,
					cellRenderer: userComponent,
					cellClass: ["flex", "items-center", "cell-style-class", "gap-[5px]"],
					headerClass: ["header-style-class"],
					wrapText: true,
				});
			} else {
				tempColumnDefs.push({
					field: schema.columnTitle,
					minWidth: 200,
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
		props.dataSchema.map((schema: TYPE_SCHEMA) => {
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
				rowHeight={55}
				animateRows={true}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				onGridSizeChanged={onGridReady}
				domLayout={"autoHeight"}
				suppressHorizontalScroll={false}
				gridOptions={gridOptions}
			></AgGridReact>
		</div>
	);
};

export default DataTable;
