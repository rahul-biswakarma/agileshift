import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Type_SidebarState = {
  field: string;
  data?: TYPE_SCHEMA;
  color: string;
};
interface SidebarState {
  visible: boolean;
  sideBarData: Type_SidebarState[];
}

const initialState: SidebarState = {
  visible: false,
  sideBarData: [
    { field: "Issue", color: "red" },
    { field: "Ticket", color: "green" },
    { field: "Issue", color: "green" },
    { field: "Ticket", color: "green" },
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
      state.sideBarData = action.payload;
    },
  },
});

export const { setSideBarVisibity, setSideBar } = SideBarSlice.actions;

export default SideBarSlice.reducer;
