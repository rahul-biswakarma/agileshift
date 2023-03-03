import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import SchemaSlice from "./reducers/SchemaSlice";
import SideBarSlice from "./reducers/SideBarSlice";
import DataTableSlice from "./reducers/DataTableSlice";
import IconsSlice from "./reducers/IconsSlice";
<<<<<<< HEAD
import ColorSlice from "./reducers/ColorSlice";
=======
import VistaSlice from "./reducers/VistaSlice";
>>>>>>> 4e50886db577935d07fa0922c7f500b386342f6d

export const store = configureStore({
	reducer: {
		auth: AuthSlice,
		schema: SchemaSlice,
		sidebar: SideBarSlice,
		datatable: DataTableSlice,
		icons: IconsSlice,
<<<<<<< HEAD
		colors: ColorSlice,
=======
		vista:VistaSlice
>>>>>>> 4e50886db577935d07fa0922c7f500b386342f6d
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
