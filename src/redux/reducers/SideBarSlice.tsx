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
  sideBarData: [
    {
      field: "Issue",
      color: "red",
      data: {
        field: "Issue",
        id: "45634684",
        owner: "Satyam",
        title: "Add Responsiveness",
        stage: "deployment",
      },
    },
    {
      field: "Ticket",
      color: "green",
      data: {
        field: "Ticket",
        id: "4564864",
        owner: "Avnish",
        title: "Test",
      },
    },
    {
      field: "Issue",
      color: "red",
      data: {
        field: "Issue",
        id: "45634684",
        owner: "Satyam",
        title: "Add Responsiveness",
        stage: "deployment",
      },
    },
    {
      field: "Ticket",
      color: "green",
      data: {
        field: "Ticket",
        id: "4564864",
        owner: "Avnish",
      },
    },
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
