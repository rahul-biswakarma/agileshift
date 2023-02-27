import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromSession, storeInSession } from "../../Utils/Auth";

interface AuthState {
  userId: string;
  organisationId: any;
  organisationList: string[];
}

const initialState: AuthState = {
  userId: "",
  organisationId: getFromSession("organisationId"),
  organisationList: [],
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setOrganisationList: (state, action: PayloadAction<string[]>) => {
      state.organisationList = action.payload;
    },
    setOrganisationId: (state, action: PayloadAction<string>) => {
      storeInSession("organisationId", action.payload);

      state.organisationId = action.payload;
    },
  },
});

export const { setUserId, setOrganisationId, setOrganisationList } =
  AuthSlice.actions;

export default AuthSlice.reducer;
