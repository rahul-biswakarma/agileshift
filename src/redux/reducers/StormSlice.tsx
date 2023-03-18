import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Type_DraggableReactflowNodes = {
	color: string;
	data: any;
	schemaData: TYPE_SCHEMA[];
	id: string;
	fieldName: string;
};

interface IconsState {
	draggableReactflowNodes: Type_DraggableReactflowNodes;
}

const initialState: IconsState = {
	draggableReactflowNodes: {
		color: "",
		data: {},
		schemaData: [],
		id: "",
		fieldName: "",
	},
};

export const StormSlice = createSlice({
	name: "storm",
	initialState,
	reducers: {
		addDraggableReactflowNode: (
			state,
			action: PayloadAction<Type_DraggableReactflowNodes>
		) => {
			state.draggableReactflowNodes = action.payload;
		},
	},
});

export const { addDraggableReactflowNode } = StormSlice.actions;

export default StormSlice.reducer;
