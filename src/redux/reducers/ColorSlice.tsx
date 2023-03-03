import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IconsState {
	colors: string[];
}

const initialState: IconsState = {
	colors: [
		"purple",
		"slate",
		"red",
		"amber",
		"lime",
		"cyan",
		"indigo",
		"pink",	
	],
};

export const ColorSlice = createSlice({
	name: "colors",
	initialState,
	reducers: {
		setColor: (state, action: PayloadAction<string>) => {
			state.colors.push(action.payload);
		},
	},
});

export const { setColor } = ColorSlice.actions;

export default ColorSlice.reducer;
