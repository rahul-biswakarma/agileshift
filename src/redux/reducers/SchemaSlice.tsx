import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SchemaState {
  ticketSchema: TYPE_SCHEMA[];
  issuesSchema: TYPE_SCHEMA[];
}

const initialState: SchemaState = {
  ticketSchema: [],
  issuesSchema: [],
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
  },
});

export const { setTicketSchema, setIssueSchema } = SchemaSlice.actions;

export default SchemaSlice.reducer;
