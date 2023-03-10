import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SchemaState {
	ticketSchema: TYPE_SCHEMA[];
	issuesSchema: TYPE_SCHEMA[];
	isEdit: boolean;
	activeTab: number;
	schemaState: boolean;
}

const initialState: SchemaState = {
	ticketSchema: [],
	issuesSchema: [],
	isEdit: false,
	activeTab: -1,
	schemaState: false,
};

export const SchemaSlice = createSlice({
	name: "schema",
	initialState,
	reducers: {
		setTicketSchema: (state, action: PayloadAction<TYPE_SCHEMA[]>) => {
			state.ticketSchema = action.payload;
		},
		setIssueSchema: (state, action: PayloadAction<TYPE_SCHEMA[]>) => {
			state.issuesSchema = action.payload;
		},
		setIsEdit: (state, action: PayloadAction<boolean>) => {
			state.isEdit = action.payload;
		},
		setActiveTab: (state, action: PayloadAction<number>) => {
			state.activeTab = action.payload;
		},
		setSchemaState: (state, action: PayloadAction<boolean>) => {
			state.schemaState = action.payload;
		},
	},
});

export const { setTicketSchema, setIssueSchema, setActiveTab, setIsEdit, setSchemaState } =
	SchemaSlice.actions;

export default SchemaSlice.reducer;
