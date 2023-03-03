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
  filterSchema: TYPE_Filters[],
  vistaName: string,
}

const initialState: VistaState = {
  filterSchema: [],
  vistaName: ""
};

export const VistaSlice = createSlice({
  name: "vista",
  initialState,
  reducers: {
    setVistaSchema: (state, action: PayloadAction<TYPE_Filters[]>) => {
      state.filterSchema = action.payload;
    },
    setVistaName: (state, action:PayloadAction<string>) => {
      state.vistaName = action.payload;
    }
  },
});

export const {setVistaSchema, setVistaName } =
VistaSlice.actions;

export default VistaSlice.reducer;
