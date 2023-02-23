import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import UploadJSON from "../UploadJSON";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setIssueSchema,
  setTicketSchema,
} from "../../redux/reducers/SchemaSlice";
import { create_schema } from "../../Utils/Backend";
import { FieldGroup } from "./FieldGroup";

type GeneratorFormPropTypes = {
  type: string;
  list: TYPE_SCHEMA[];
  setList: (this: any, list: TYPE_SCHEMA[]) => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export const SchemaGeneratorForm = ({
  type,
  list,
  setList,
  activeTab,
  setActiveTab,
}: GeneratorFormPropTypes) => {
  const dispatch = useAppDispatch();
  const organizationId = useAppSelector((state) => state.auth.organisationId);

  const addColumn = (e: any) => {
    e.preventDefault();
    let tempColumns = [...list];
    tempColumns.push({ columnName: "", columnType: "" });
    setList(tempColumns);
  };

  const changeColumn = (id: number, columnName: string, columnType: string) => {
    let tempColumns = [...list];
    tempColumns[id].columnName = columnName;
    tempColumns[id].columnType = columnType;
    setList(tempColumns);
  };

  const deleteColumn = (id: number) => {
    const newObjects = [...list];
    newObjects.splice(id, 1);
    setList(newObjects);
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setList(items);
  }

  const submitSchema = (e: any) => {
    e.preventDefault();
    console.log(list);
    switch (type) {
      case "Tickets":
        create_schema(organizationId, list);
        dispatch(setTicketSchema(list));

        break;
      case "Issues":
        create_schema(organizationId, list);
        dispatch(setIssueSchema(list));
        break;
      case "Parts":
        break;
    }
  };

  return (
    <div className="flex justify-center gap-6 w-full">
      <section className="flex flex-col h-full overflow-auto py-0 px-4">
        <div className="sticky mb-4 top-0 flex items-center justify-between bg-background_color py-4 z-10">
          <button
            className="flex justify-start items-center p-4 bg-background_color rounded-full shadow-md text-sm
             text-highlight_font_color border border-dark_gray self-start"
            onClick={addColumn}>
            <img src={PlusIcon} className="w-4 h-4" alt="" />
          </button>
          <button
            className="flex justify-center items-center w-32 h-8 bg-background_color rounded-md shadow-md shadow-black
          text-sm text-highlight_font_color active:shadow-inner
          "
            onClick={submitSchema}>
            Submit Schema
          </button>
          <UploadJSON type={type} setList={setList} />
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="dragableList">
            {(provided) => (
              <div
                className="flex-1 flex flex-col transition-all"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {list.map((column, id) => {
                  return (
                    <Draggable
                      key={"col-" + id}
                      draggableId={"col-" + id}
                      index={id}>
                      {(provided) => (
                        <div
                          className="relative"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}>
                          <FieldGroup
                            column={column}
                            id={id}
                            deleteColumn={deleteColumn}
                            changeColumn={changeColumn}
                            key={id}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
};
