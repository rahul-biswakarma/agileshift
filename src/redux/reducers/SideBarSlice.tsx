import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Type_SidebarState = {
  fieldId?: string;
  sidebarType: string;
  createModeCalledByField?: string; // this is the field that called the create mode
  linkedCalledByID?: string; // this is the id of the field that called the link
};
interface SidebarState {
  visible: boolean;
  sideBarData: Type_SidebarState[];
}

const initialState: SidebarState = {
  visible: false,
  sideBarData: [
    // {
    //   sidebarType: "editMode",
    //   createModeCalledByField: "Issues",
    //   fieldId: "BYRCRZNWFRZS",
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
