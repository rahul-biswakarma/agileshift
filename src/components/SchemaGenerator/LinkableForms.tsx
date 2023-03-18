import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import SpecialInput from "../common/SpecialInput";

type LinkableFormsPropTypes = {
  fields: TYPE_FIELD[];
  changeLinkage: (this: any, link: string[]) => void;
  checkSchema: () => void;
};
export const LinkableForms = ({
  fields,
  changeLinkage,
  checkSchema,
}: LinkableFormsPropTypes) => {
  const activeTab = useAppSelector(
    (state: RootState) => state.schema.activeTab
  );

  const handleChange = (e: SelectChangeEvent<string[]>, id: number) => {
    let value =
      typeof e.target.value === "string" ? [e.target.value] : e.target.value;
    changeLinkage.bind({ id: id })(value);
    console.log(id);
  };

  if (activeTab === 100)
    return (
      <section
        className="relative h-screen w-screen bg-background_color text-primary_font_color
        flex flex-col items-center gap-8 font-dm_sans p-10">
        {fields.map((field: TYPE_FIELD, id: number) => (
          <div className="w-full flex justify-evenly">
            <SpecialInput
              label={"Schema"}
              value={field.name}
              onChange={() => console.log("hello")}
              placeholder={""}
              readOnly={true}
              key={id}
            />
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                "& label": {
                  color: "#fff",
                  fontFamily: "DM Sans",
                },
                "& .MuiFormControl-root": {
                  borderColor: "white",
                },
              }}
              size="small">
              <InputLabel sx={{ color: "#f00" }} id="linkable-label-id">
                Linkables
              </InputLabel>
              <Select
                multiple
                name="linkables"
                id={`${field.name}-linkables`}
                className="w-max min-w-[200px]"
                labelId="linkable-label-id"
                label="Linkables"
                value={field.linkage}
                data-testid={`${field.name.toLowerCase()}-linkables`}
                onChange={(e) => handleChange(e, id)}>
                {fields.map((field) => (
                  <MenuItem
                    key={field.name}
                    value={field.name}
                    data-testid={`${field.name.toLowerCase()}-option`}>
                    {field.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
        <button
          className="absolute bottom-16 right-10 flex justify-center items-center p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm text-highlight_font_color border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 hover:text-purple-800 transition-all duration-200 ease-in-out
          "
          data-testid="submit-schema-btn"
          onClick={checkSchema}>
          Submit Schema
        </button>
      </section>
    );
  else return <div></div>;
};
