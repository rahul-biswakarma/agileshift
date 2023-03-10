import React from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { setSideBar } from '../../redux/reducers/SideBarSlice';
import { DisplayIdComponent } from '../DataTable/displayIdComponentContainer';

type Type_SuggestionsState = {
	field: string;
	data: any;
	color: string;
	schema?: any;
	titleData?: string;
};

type Type_SuggestionsProps = {
    data:Type_SuggestionsState;
}

const SearchSuggestionComponent = ({data}:Type_SuggestionsProps) => {
    const dispatch = useAppDispatch();

    const handleSuggestionsSelect = (suggestion:Type_SuggestionsState) =>{
		dispatch(
			setSideBar({
                type: "editMode",
				linkedData: [],
				id: suggestion.data.id,
				displayId: suggestion.data.displayId,
			})
		);
	}

    return (
        <div className="w-full max-w-full p-2 rounded-md hover:bg-sidebar_bg hover:text-highlight_font_color flex items-center cursor-pointer 
            border-primary_font_color hover:border-white" 
            onClick={()=>handleSuggestionsSelect(data)}
        >
            <span className="w-[6vw] min-w-fit">
                <DisplayIdComponent displayId={data.data.displayId} color={data.color} field={data.field} />
            </span>
            <span className="ml-1 grow text-left truncate">{data.titleData}</span>
            <button
                className="p-[0.10rem_0.60rem] flex items-center bg-Secondary_background_color border border-inherit text-center text-lg rounded-lg"
            >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
        </div>
    )
}

export { SearchSuggestionComponent }