import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type fetchedLinkType = {
  [key: string]: TYPE_LINKED_DATA[];
};

interface SidebarState {
  visible: boolean;
  sideBarData: Type_SIDEBARSTATE[];
  fetchedLinks: fetchedLinkType;
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
  fetchedLinks: {},
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
    setFetchedLinks: (state, action: PayloadAction<any>) => {
      state.fetchedLinks = action.payload;
    },
    setRemoveFetchedLink: (state, action: PayloadAction<any>) => {
      let tempLists = { ...state.fetchedLinks };
      delete tempLists[action.payload];
      state.fetchedLinks = tempLists;
    },
    setAppendFetchedLink: (state, action: PayloadAction<any>) => {
      let tempLists = { ...state.fetchedLinks };
      tempLists[action.payload.fieldId] = action.payload.linkedData;
      state.fetchedLinks = tempLists;
    },
  },
});

export const {
  setSideBarVisibity,
  setSideBar,
  setNewSidBar,
  setFetchedLinks,
  setRemoveFetchedLink,
  setAppendFetchedLink,
} = SideBarSlice.actions;

export default SideBarSlice.reducer;
