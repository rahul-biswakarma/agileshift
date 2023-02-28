import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import SchemaSlice from "./reducers/SchemaSlice";
import SideBarSlice from "./reducers/SideBarSlice";
import DataTableSlice from "./reducers/DataTableSlice";
import IconsSlice from "./reducers/IconsSlice";

export const store = configureStore({
	reducer: {
		auth: AuthSlice,
		schema: SchemaSlice,
		sidebar: SideBarSlice,
		datatable: DataTableSlice,
		icons: IconsSlice,
	},
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
