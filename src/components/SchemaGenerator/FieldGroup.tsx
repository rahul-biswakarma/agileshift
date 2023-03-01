import { useState } from "react";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
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


  const [showModal , setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteColumn(id);
    setShowModal(false);
  }

  const handleDeleteCancel = () => {
    setShowModal(false);
  }

  
  return (
    <div
      className="relative flex items-center justify-center gap-4 py-1 px-2 w-full hover:bg-Secondary_background_color rounded-md"
    >
      <span className="material-symbols-outlined">drag_indicator</span>
      
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
      
      <button
        onClick={handleDeleteClick}
        className="material-symbols-outlined"
      >
        delete
      </button>

      <Modal
        open={showModal}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-column-modal"
        aria-describedby="delete-column-modal-description"
      >
        
          <div className="absolute m-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            rounded-lg font-dm_sans bg-Secondary_background_color shadow-lg p-6 text-left align-middle text-primary_font_color">
          <p className = "mb-7" id="delete-column-modal-description">
            Are you sure you want to delete this column?
          </p>
          <div className="flex justify-end items-center mt-7 gap-[1rem] font-fira_code">
            <button className="bg-sidebar_bg px-[15px] py-[5px] font-[500] rounded-md flex items-center border-0 border-transparent hover:text-white " onClick={handleDeleteCancel}>Cancel</button>
            <button className = "bg-rose-400 text-rose-800 px-[15px] py-[5px] flex items-center font-[500] rounded-md border-0 border-transparent hover:bg-rose-800 hover:text-rose-400 "onClick={handleDeleteConfirm}>Delete</button>

          </div>
          
          </div>
          
          </Modal>



    </div>
  );
};
