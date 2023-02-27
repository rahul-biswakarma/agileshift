import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IconsState {
	icons: string[];
}

const initialState: IconsState = {
	icons: [
		"home",
		"search",
		"settings",
		"notifications",
		"menu",
		"add",
		"delete",
		"edit",
		"share",
		"download",
		"upload",
		"chat",
		"email",
		"phone",
		"location",
		"camera",
		"clock",
		"date",
		"bookmark",
		"star",
		"arrow_back",
		"arrow_forward",
		"expand_more",
		"expand_less",
		"menu_open",
		"menu_close",
		"fullscreen",
		"exit_to_app",
		"lock",
		"unlock",
		"favorite",
		"watch_later",
		"play_circle_filled",
		"pause_circle_filled",
		"stop",
		"rewind",
		"fast_forward",
		"volume_up",
		"volume_down",
		"volume_off",
		"help",
		"info",
		"error",
		"warning",
		"done",
		"clear",
		"add_circle",
		"remove_circle",
		"camera_alt",
		"photo",
		"insert_link",
		"attach_file",
		"file_download",
		"file_upload",
		"print",
		"forward",
		"share_alt",
		"person",
		"group",
		"settings_applications",
	],
};

export const IconsSlice = createSlice({
	name: "icons",
	initialState,
	reducers: {
		setIcons: (state, action: PayloadAction<string>) => {
			state.icons.push(action.payload);
		},
	},
});

export const { setIcons } = IconsSlice.actions;

export default IconsSlice.reducer;
