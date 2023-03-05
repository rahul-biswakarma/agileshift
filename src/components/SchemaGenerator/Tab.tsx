import React from 'react'
import { get_background_color_from_name } from '../../Utils/Backend';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from '../../redux/store';
import { setActiveTab } from '../../redux/reducers/SchemaSlice';


type TabPropTypes={
    field?:TYPE_FIELD;
    organisation?:boolean;
    id:number;
}

const Tab = ({field,organisation,id}:TabPropTypes) => {

    const activeTab = useAppSelector(
        (state: RootState) => state.schema.activeTab
      );
        const dispatch = useAppDispatch();
  return (
    <button
      className={`w-full rounded-lg p-2 px-8 flex justify-center items-center h-max min-h-[48px] border-white/20 text-white/50 hover:bg-background_color/50 ${
        activeTab === id
          ? "border-y bg-background_color"
          : "bg-Secondary_background_color"
      }`}
      onClick={() => {
        dispatch(setActiveTab(id));
      }}>
      {organisation && "Organisation Form"}
      {field && (
        <div className="w-full flex items-center justify-between">
          <span className="material-symbols-outlined">
            {field.icon ? field.icon : "home"}
          </span>
          <span className="text-sm font-fira_code font-bold max-w-[150px] overflow-hidden break-words">
            {field.name ? field.name : "New Schema"}
          </span>
          <span
            className="w-3 h-3 rounded-sm"
            style={{
              backgroundColor: get_background_color_from_name(field.color),
            }}></span>
        </div>
      )}
    </button>
  );
}

export default Tab
