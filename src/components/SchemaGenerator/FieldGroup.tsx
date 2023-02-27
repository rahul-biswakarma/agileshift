import { useState } from "react";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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

  const [types] = useState([
    "string",
    "id",
    "title",
    "tag",
    "user",
    "dropdown",
    "date",
    "currency",
  ]);
  // const getTypes = async () => {
  //   let data = await get_all_Supported_types();
  //   setTypes(data);
  // };
  // getTypes();
  return (
    <div
      onMouseOver={() => setDisplayFields(true)}
      onMouseLeave={() => setDisplayFields(false)}
      className="relative flex items-center justify-center gap-4 py-1 px-2 w-full hover:bg-Secondary_background_color rounded-md"
    >
      <span className="material-symbols-outlined">drag_indicator</span>
      {/* <div className="flex flex-col gap-1 flex-1">
				<label
					htmlFor="columtitle-1"
					className="text-sm"
				>
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
			</div> */}
      <TextField
        sx={{
          m: 1,
          minWidth: 300,
          "& label": {
            color: "#fff",
            fontFamily: "DM Sans",
          },
          "& .MuiFormControl-root": {
            borderColor: "white",
          },
        }}
        size="small"
        id="column-name-input"
        label="Column Name"
        variant="outlined"
        value={column.columnName}
        onChange={(e) => {
          changeColumn(id, e.target.value, column.columnType);
        }}
      />
      <FormControl
        sx={{
          m: 1,
          maxWidth: 150,
          "& label": {
            color: "#fff",
            fontFamily: "DM Sans",
          },
          "& .MuiFormControl-root": {
            borderColor: "white",
          },
        }}
        size="small"
        fullWidth
      >
        <InputLabel sx={{ color: "#f00" }} id="column-type-input-id">
          type
        </InputLabel>
        <Select
          name="Type"
          id={`column-type`}
          labelId="column-type-label-id"
          label="Type"
          value={column.columnType}
          onChange={(e) => {
            console.log(e.target.value);
            changeColumn(id, column.columnName, e.target.value);
          }}
        >
          {types.map((type, id) => (
            <MenuItem key={id} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <div className="flex flex-col gap-1">
				<label
					htmlFor="columntype-1"
					className="text-sm"
				>
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
				></select>
			</div> */}
      <button
        onClick={(e) => deleteColumn(id)}
        className="material-symbols-outlined"
      >
        delete
      </button>
    </div>
  );
};
