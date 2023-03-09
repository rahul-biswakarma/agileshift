import { MenuItem, Select } from "@mui/material";
import React from "react";
import { get_background_color_from_name } from "../../Utils/Backend";

type propsType = {
  filedList: string[];
  selectedField: string;
  setSelectedField: (value: string) => void;
  color: string;
};
export default function DropDown(props: propsType) {
  return (
    <div>
      <Select
        style={{
          borderColor: props.color ? props.color : "#FFFFFF",
          color: props.color ? props.color : "#FFFFFF" + 20,
          backgroundColor: `${
            props.color
              ? get_background_color_from_name(props.color)
              : "#FFFFFF"
          }30`,
          borderRadius: "0.375rem",
          boxShadow: "none",
        }}
        sx={{
          boxShadow: 0,
          border: 0,
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
        value={props.selectedField}
        onChange={(e) => props.setSelectedField(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        className={`border-2 h-10`}
      >
        {props.filedList.map((field: string, index: number) => (
          <MenuItem key={index} value={field}>
            {field}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
