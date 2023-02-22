import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlusIcon from "../../assets/icons/plus-icon.svg";
// import { create_ticket_schema, create_parts_schema, create_issues_schema } from "../../Utils/Backend";
import UploadJSON from "../UploadJSON";
import { FieldGroup } from "./FieldGroup";

type GeneratorFormPropTypes = {
  type: string;
  list: TYPE_TICKETS_SCHEMA[] | TYPE_ISSUES_SCHEMA[] | TYPE_PARTS_SCHEMA[];
  setList:
    | React.Dispatch<React.SetStateAction<TYPE_TICKETS_SCHEMA[]>>
    | React.Dispatch<React.SetStateAction<TYPE_ISSUES_SCHEMA[]>>
    | React.Dispatch<React.SetStateAction<TYPE_PARTS_SCHEMA[]>>;
};

export const SchemaGeneratorForm = ({
  type,
  list,
  setList,
}: GeneratorFormPropTypes) => {
  
  const addColumn = (e: any) => {
    e.preventDefault();
    setList([{"": ""}, ...list]);
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
  }

  // const submitSchema = (e: any) => {
  //   e.preventDefault();
  //   console.log(list);
  //   switch (type) {
  //     case "Tickets":
  //       create_ticket_schema(list);
  //       break;
  //     case "Issues":
  //       create_issues_schema(list);
  //       break;
  //     case "Parts":
  //       create_parts_schema(list);
  //       break; 
  //   }
  // };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setList(items);
  }


  return (
    <section className="flex flex-col h-full overflow-auto py-0 px-4">
        <div className="sticky mb-4 top-0 flex items-center justify-between bg-background_color py-4 z-10">
          <button
            className="flex justify-start items-center p-4 bg-background_color rounded-full shadow-md text-sm
             text-highlight_font_color border border-dark_gray self-start"
            onClick={addColumn}>
            <img src={PlusIcon} className="w-4 h-4" alt="" />
          </button>
          <UploadJSON type={type} setList={setList}/> 
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='dragableList'>
            {(provided) => (
              <div className="flex-1 flex flex-col transition-all" {...provided.droppableProps} ref={provided.innerRef} >
                {list.map((column, id) => {
                  return (
                        <Draggable key={"col-"+id} draggableId={"col-"+id} index={id}>
                          {(provided) => (
                            <div className='relative' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
                      )}
                  )
                }
                {provided.placeholder}
              </div>
            )} 
                   
          </Droppable>
        </DragDropContext>
    </section>
  );
};
