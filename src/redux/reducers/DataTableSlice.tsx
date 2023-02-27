import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataTableState {
	fieldColor: string;
	datas: any;
	dataSchema: TYPE_SCHEMA[];
	tabName: string;
}

const initialState: DataTableState = {
	fieldColor: "purple",
	datas: {},
	dataSchema: [],
	tabName: "All",
};

export const DataTableSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setFieldColor: (state, action: PayloadAction<string>) => {
			state.fieldColor = action.payload;
		},
		setDatas: (state, action: PayloadAction<any>) => {
			state.datas = action.payload;
		},
		setDataSchema: (state, action: PayloadAction<Array<TYPE_SCHEMA>>) => {
			state.dataSchema = action.payload;
		},
		setTabName: (state, action: PayloadAction<string>) => {
			state.tabName = action.payload;
		},
	},
});

export const { setFieldColor, setDatas, setDataSchema, setTabName } =
	DataTableSlice.actions;

export default DataTableSlice.reducer;
