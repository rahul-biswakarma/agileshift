type FieldGroupPropTypes = {
  column: TYPE_TICKETS_SCHEMA | TYPE_ISSUES_SCHEMA | TYPE_PARTS_SCHEMA;
  id: number;
  changeColumn: (id: number, columnName: string, columnType: string) => void;
};

export const FieldGroup = ({
  column,
  id,
  changeColumn,
}: FieldGroupPropTypes) => {
  return (
    <div className="flex items-center h-12 my-4 hover:bg-dark_gray p-4 rounded-md">
      <div className="flex flex-col mr-4">
        <label htmlFor="columtitle-1" className="text-xs">
          Column Title
        </label>
        <input
          type="text"
          className="h-6 w-40 bg-background_color text-highlight_font_color px-2 placeholder:text-primary_font_color
                 rounded-md border border-primary_font_color"
          placeholder="Column Title"
          id="columntitle-1"
          value={column.columnName}
          onChange={(e) => changeColumn(id, e.target.value, column.columnType)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="columntype-1" className="text-xs">
          Column Type
        </label>
        <select
          name="columntype-1"
          id="columntype-1"
          className="h-6 w-40
              bg-background_color 
              px-2
              text-highlight_font_color
              rounded-md border border-primary_font_color
              "
          value={column.columnType}
          onChange={(e) => changeColumn(id, column.columnName, e.target.value)}>
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="tag">Tag</option>
          <option value="user">User</option>
        </select>
      </div>
    </div>
  );
};
