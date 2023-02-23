import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Type_SidebarState = {
  field: string;
  dataId: string;
  color: string;
};
interface SidebarState {
  visible: boolean;
  sideBarData: Type_SidebarState[];
}

const initialState: SidebarState = {
  visible: false,
  sideBarData: [
    { field: "Issue", color: "red", dataId:"45634684" },
    { field: "Ticket", color: "green", dataId:"4564864" },
    { field: "Issue", color: "green", dataId:"45634684" },
    { field: "Ticket", color: "green", dataId:"4564864" },
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
