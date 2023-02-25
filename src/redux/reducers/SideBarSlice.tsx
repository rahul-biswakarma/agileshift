import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Type_SidebarState = {
	field: string;
	data: any;
	color: string;
};
interface SidebarState {
	visible: boolean;
	sideBarData: Type_SidebarState[];
}

const initialState: SidebarState = {
	visible: false,
	sideBarData: [],
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
