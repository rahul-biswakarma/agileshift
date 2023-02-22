import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SchemaState {
  ticketSchema: TYPE_TICKETS_SCHEMA[];
  issuesSchema: TYPE_ISSUES_SCHEMA[];
}

const initialState: SchemaState = {
  ticketSchema: [],
  issuesSchema: [],
};

export const SchemaSlice = createSlice({
  name: "schema",
  initialState,
  reducers: {
    setTicketSchema: (state, action: PayloadAction<TYPE_TICKETS_SCHEMA[]>) => {
      state.ticketSchema = action.payload;
    },
    setIssueSchema: (state, action: PayloadAction<TYPE_ISSUES_SCHEMA[]>) => {
      state.issuesSchema = action.payload;
    },
  },
});

export const { setTicketSchema, setIssueSchema } = SchemaSlice.actions;

export default SchemaSlice.reducer;
