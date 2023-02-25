import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Type_SidebarState = {
  field: string;
  data: any;
  color: string;
  schema?: any;
};
interface SidebarState {
	visible: boolean;
	sideBarData: Type_SidebarState[];
}

const initialState: SidebarState = {
  visible: false,
  sideBarData: [
    // { field: "Issue", color: "red", data: {} },
    // { field: "Ticket", color: "green", data: {} },
    // { field: "Linkage", color: "cyan", data: {} },
    // { field: "Issue", color: "green", data: {} },
    // { field: "Ticket", color: "green", data: {} },
  ],
};

export const SideBarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		setSideBarVisibity: (state, action: PayloadAction<boolean>) => {
			state.visible = action.payload;
		},
		setSideBar: (state, action: PayloadAction<any>) => {
			state.sideBarData = [...state.sideBarData, action.payload];
		},
	},
});

export const { setSideBarVisibity, setSideBar } = SideBarSlice.actions;

export default SideBarSlice.reducer;
