import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import SchemaSlice from "./reducers/SchemaSlice";
import SideBarSlice from "./reducers/SideBarSlice";
import DataTableSlice from "./reducers/DataTableSlice";
import IconsSlice from "./reducers/IconsSlice";
import ColorSlice from "./reducers/ColorSlice";
import VistaSlice from "./reducers/VistaSlice";
import NotificationSlice from "./reducers/NotificationSlice";
import StormSlice from "./reducers/StormSlice";

export const store = configureStore({
	reducer: {
		auth: AuthSlice,
		schema: SchemaSlice,
		sidebar: SideBarSlice,
		datatable: DataTableSlice,
		icons: IconsSlice,
		colors: ColorSlice,
		vista: VistaSlice,
		notification: NotificationSlice,
		storm: StormSlice,
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
