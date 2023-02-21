import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DataTable = () => {
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

	const [rowData] = useState([
		{ make: "Toyota", model: "Celica", price: 35000 },
		{ make: "Ford", model: "Mondeo", price: 32000 },
		{ make: "Porsche", model: "Boxster", price: 72000 },
		{ make: "Porsche", model: "Boxster", price: 72000 },
		{ make: "Porsche", model: "Boxster", price: 72000 },
		{ make: "Porsche", model: "Boxster", price: 72000 },
		{ make: "Porsche", model: "Boxster", price: 72000 },
		{ make: "Porsche", model: "Boxster", price: 72000 },
	]);

	const [columnDefs] = useState([
		{ field: "make", minWidth: 200 },
		{ field: "model", minWidth: 100 },
		{ field: "price", minWidth: 100 },
		{ field: "price", minWidth: 100 },
		{ field: "price", minWidth: 100 },
		{ field: "price", minWidth: 100 },
	]);

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
