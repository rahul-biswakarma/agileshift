import React from 'react'
import { useAppDispatch } from "../../redux/hooks";
import { setActiveTab } from "../../redux/reducers/SchemaSlice";
import { TabButton } from "./TabButton";
import Tab from "./Tab";

type TabsContainerPropTypes = {
  fields: TYPE_FIELD[];
  addSchema: () => void;
  mode: string;
};

export const TabsContainer = ({
  fields,
  addSchema,
  mode,
}: TabsContainerPropTypes) => {
  const dispatch = useAppDispatch();
  return (
    <nav className="h-full w-1/5 bg-Secondary_background_color border-r border-white/10 flex flex-col justify-between items-center py-4">
      <div className="w-[95%] flex flex-col items-center justify-center gap-2">
        {mode === "create" && <Tab organisation={true} id={-1} />}
        <div className="w-full max-h-full flex flex-col overflow-auto gap-2">
          {fields.map((field: TYPE_FIELD, id: number) => (
            <Tab key={id} field={field} id={id} />
          ))}
        </div>
      </div>

      <div className="w-[95%] flex flex-col">
        <TabButton onClick={addSchema} testId="add-new-schema" text={"+ Add New Schema"} />
        <TabButton
          onClick={() => dispatch(setActiveTab(100))}
          text={"Edit Linkables"}
          id={100}
          testId=""
        />
      </div>
    </nav>
  );
};

export default TabsContainer
