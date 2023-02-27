import React, {
	useState,
	useMemo,
	useRef,
	useEffect,
	useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import type { GridOptions, GridReadyEvent } from "ag-grid-community";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

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

const DataTable = () => {
	const dispatch = useAppDispatch();
	const gridRef = useRef<any>();
	const defaultColDef = useMemo<any>(() => {
		return {
			sortable: true,
			resizable: true,
		};
	}, []);

	const dataSchema = useAppSelector((state) => state.datatable.dataSchema);
	const fieldColor = useAppSelector((state) => state.datatable.fieldColor);
	const datas = useAppSelector((state) => state.datatable.datas);

	const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

	const gridOptions: CustomGridOptions = {
		detailRowAutoHeight: true,
		rowSelection: "single",
		onRowClicked: function (event) {
			let rowData = event.data;
			dispatch(
				setSideBar({
					field: rowData.field,
					color: rowData.color,
					data: rowData,
					schema: dataSchema,
				})
			);
		},
	};

	const [rowData, setRowData] = useState<any>();
	const [columnDefs, setColumnDefs] = useState<Type_AgGridColsDefs>([]);

	const onGridReady = (params: GridReadyEvent) => {
		const { api } = params;
		api.sizeColumnsToFit();
	};

	const setDataForAgGrid = useCallback(() => {
		let tempColumnDefs: Type_AgGridColsDefs = [];
		dataSchema.map((schema: TYPE_SCHEMA) => {
			function idComponentWrapper(params: any) {
				return (
					<IdComponent
						color={fieldColor}
						itemId={params.value}
					/>
				);
			}
			if (schema.columnType === "id")
				tempColumnDefs.push({
					field: schema.columnName,
					maxWidth: 200,
					minWidth: 200,
					cellRenderer: idComponentWrapper,
					cellClass: ["flex", "items-center", "cell-style-class"],
					headerClass: ["header-style-class"],
					wrapText: true,
				});
			else if (schema.columnType === "tag") {
				tempColumnDefs.push({
					field: schema.columnName,
					minWidth: 250,
					cellRenderer: tagComponent,
					cellClass: ["flex", "items-center", "cell-style-class", "gap-[5px]"],
					headerClass: ["header-style-class"],
					wrapText: true,
				});
			} else if (schema.columnType === "user") {
				tempColumnDefs.push({
					field: schema.columnName,
					minWidth: 200,
					cellRenderer: userComponent,
					cellClass: ["flex", "items-center", "cell-style-class", "gap-[5px]"],
					headerClass: ["header-style-class"],
					wrapText: true,
				});
			} else {
				tempColumnDefs.push({
					field: schema.columnName,
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
		dataSchema.map((schema: TYPE_SCHEMA) => {
			allColDefsFromSchema.push(schema.columnName);
			return "";
		});

		setRowData(datas);
	}, [dataSchema, datas, fieldColor]);

	useEffect(() => {
		// Setting AgGridColumnsDefitions
		setDataForAgGrid();
	}, [setDataForAgGrid]);

	return (
		<div
			className="ag-theme-alpine"
			style={gridStyle}
		>
			{rowData && rowData.length > 0 ? (
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
			) : (
				<div>
					<div className="flex border-b-[1px] border-white/10 pb-[0.5rem]">
						{dataSchema.map((schema) => {
							return (
								<p className="text-white w-full min-w-[200px] border-r-[1px] border-white/10 p-[0.2rem_1rem] font-dm_sans">
									{schema.columnName}
								</p>
							);
						})}
					</div>
					<p className="text-white text-center py-[3rem]">No Data</p>
				</div>
			)}
		</div>
	);
};

export default DataTable;
