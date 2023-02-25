import { useState } from "react";
import CloseIcon from "../../assets/icons/close_icon.svg";

type FieldGroupPropTypes = {
  column: TYPE_SCHEMA;
  id: number;
  changeColumn: (id: number, columnName: string, columnType: string) => void;
  deleteColumn: (id: number) => void;
};

export const FieldGroup = ({
  column,
  id,
  changeColumn,
  deleteColumn,
}: FieldGroupPropTypes) => {
  const [displayFields, setDisplayFields] = useState<boolean>(false);

  const [types] = useState(["string", "number", "tag", "user"]);
  // const getTypes = async () => {
  //   let data = await get_all_Supported_types();
  //   setTypes(data);
  // };
  // getTypes();
  return (
    <div
      onMouseOver={() => setDisplayFields(true)}
      onMouseLeave={() => setDisplayFields(false)}
      className="relative flex items-center justify-between gap-4 p-4 w-96 hover:bg-Secondary_background_color rounded-md">
      <div className="flex flex-col gap-1 flex-1">
        <label htmlFor="columtitle-1" className="text-sm">
          Column Title
        </label>
        <input
          type="text"
          className="p-2 bg-background_color text-highlight_font_color px-2 placeholder:text-primary_font_color
                 rounded-md border border-primary_font_color"
          placeholder="Column Title"
          id="columntitle-1"
          value={column.columnName}
          onChange={(e) => changeColumn(id, e.target.value, column.columnType)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="columntype-1" className="text-sm">
          Column Type
        </label>
        <select
          name="columntype-1"
          id="columntype-1"
          className="p-2
              bg-background_color 
              text-highlight_font_color
              rounded-lg border border-primary_font_color
              "
          value={column.columnType}
          onChange={(e) => changeColumn(id, column.columnName, e.target.value)}>
          {types.map((type, id) => (
            <option value={type} key={id}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {displayFields && (
        <button
          className="absolute -top-2 -right-2 text-highlight_font_color bg-background_color border border-dark_gray p-2 rounded-full text-center"
          onClick={(e) => deleteColumn(id)}>
          <img src={CloseIcon} className="w-3 h-3" alt="" />
        </button>
      )}
    </div>
  );
};
