import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SidebarState {
  visible: boolean;
  sideBarData: Type_SIDEBARSTATE[];
}

const initialState: SidebarState = {
  visible: false,
  sideBarData: [
    // {
    //   sidebarType: "editMode",
    //   createModeCalledByField: "Issues",
    //   fieldId: "BYRCRZNWFRZS",
    // },
    //   {
    //   sidebarType: "linkData",
    //   fieldId: "BYRCRZNWFRZS",
    //   fieldName:"ambulnce",
    // },
    // {
    //   sidebarType: "createMode",
    //   createModeCalledByField: "Tickets",
    // },
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
    setNewSidBar: (state, action: PayloadAction<any>) => {
      state.sideBarData = action.payload;
    },
  },
});

export const { setSideBarVisibity, setSideBar, setNewSidBar } =
  SideBarSlice.actions;

export default SideBarSlice.reducer;
