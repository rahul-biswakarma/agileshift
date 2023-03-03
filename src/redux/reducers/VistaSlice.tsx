import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TYPE_FilterOption = {
	filterOptionName: string;
	active: boolean;
};

type TYPE_Filters = {
	columnName: string;
	active: boolean;
	data: TYPE_FilterOption[];
};

interface VistaState {
  filterSchema: TYPE_Filters[]
}

const initialState: VistaState = {
  filterSchema:[]
};

export const VistaSlice = createSlice({
  name: "vista",
  initialState,
  reducers: {
    setFilterSchema: (state, action: PayloadAction<TYPE_Filters[]>) => {
      state.filterSchema = action.payload;
    }
  },
});

export const { setFilterSchema } =
VistaSlice.actions;

export default VistaSlice.reducer;
