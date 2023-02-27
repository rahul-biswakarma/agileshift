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
    // {
    //   field: "Issue",
    //   color: "red",
    //   data: {
    //     field: "Issue",
    //     id: "45634684",
    //     owner: "Satyam",
    //     title: "Add Responsiveness",
    //     stage: [],
    //   },
    //   schema: {
    //     owner: "string",
    //     title: "title",
    //     stage: "dropdown",
    //     id: "string",
    //   },
    // },
    // {
    //   field: "Ticket",
    //   color: "green",
    //   data: {
    //     field: "Ticket",
    //     id: "4564864",
    //     owner: "Avnish",
    //     title: "Test",
    //   },
    //   schema: {
    //     owner: "string",
    //     title: "title",
    //     id: "string",
    //   },
    // },
    // {
    //   field: "Issue",
    //   color: "red",
    //   data: {
    //     field: "Issue",
    //     id: "45634684",
    //     owner: "Satyam",
    //     title: "Add Responsiveness",
    //     stage: "deployment",
    //   },
    //   schema: {
    //     owner: "string",
    //     title: "title",
    //     stage: "string",
    //     id: "string",
    //   },
    // },
    // {
    //   field: "Ticket",
    //   color: "green",
    //   data: {
    //     field: "Ticket",
    //     id: "4564864",
    //     owner: "Avnish",
    //   },
    //   schema: {
    //     owner: "string",
    //     id: "string",
    //   },
    // },
    // {
    //   field: "Issue",
    //   color: "red",
    //   data: {},
    //   schema: {
    //     owner: "string",
    //     title: "title",
    //     stage: "string",
    //     id: "string",
    //   },
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
