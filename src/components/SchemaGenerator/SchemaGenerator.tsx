import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Tooltip,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import { SchemaGeneratorForm } from "./SchemaGeneratorForm";
import UploadJSON from "../UploadJSON";
import { RootState } from "../../redux/store";
import { setActiveTab } from "../../redux/reducers/SchemaSlice";
import SelectIconComponent from "./SelectIconComponent";
import { get_background_color_from_name } from "../../Utils/Backend";
import { toast } from "react-toastify";
import { useDebounceCallback } from "../../Utils/useDebounce";
import SpecialInput from "../common/SpecialInput";

require("tailwindcss-writing-mode")({
  variants: ["responsive", "hover"],
});

type GeneratorPropTypes = {
  id: number;
  name: string;
  setName: (this: any, name: string) => void;
  list: TYPE_SCHEMA[];
  setList: (this: any, list: TYPE_SCHEMA[]) => void;
  getAllFieldsName: () => string[];
  duplicateSchema: (this: any) => void;
  deleteSchema: (this: any) => void;
  color: string;
  changeColor: (this: any, color: string) => void;
  icon: string;
  changeIcon: (this: any, icon: string) => void;
  linkage: string[];
  changeLinkage: (this: any, link: string[]) => void;
  mode: string;
};

export const SchemaGenerator = ({
  id,
  name,
  setName,
  list,
  setList,
  getAllFieldsName,
  duplicateSchema,
  deleteSchema,
  color,
  changeColor,
  icon,
  changeIcon,
  linkage,
  mode,
}: GeneratorPropTypes) => {
  const colorList = useAppSelector((state) => state.colors.colors);
  const [, setSelectedOptions] = useState(linkage);

  const [showModal, setShowModal] = useState(false);
  const [, setSelectedColor] = useState("");

  // const organizationId = useAppSelector((state) => state.auth.organisationId);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteSchema();
    setShowModal(false);
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
  };

  const activeTab = useAppSelector(
    (state: RootState) => state.schema.activeTab
  );
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = getAllFieldsName();

    console.log("fieldName", fieldName); // log the fieldName array to the console

    let similarNameCount = 0;
    fieldName.forEach((name) => {
      if (name.toLowerCase() === e.target.value.toLowerCase())
        similarNameCount++;
    });

    if (similarNameCount >= 2) {
      // perform validation logic here
      toast.error(`${e.target.value} already exists`);
    }

    setSelectedOptions([]);
  };

  const dummyFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    debouncedCallback(e);
  };

  const debouncedCallback = useDebounceCallback(handleInputChange, 200);

  useEffect(() => {
    if (color) setSelectedColor(color);
  }, [color]);

  if (activeTab === id)
    return (
      <section
        className="relative h-screen w-screen bg-background_color text-primary_font_color
        flex flex-col items-center gap-4 font-dm_sans ">
        <div className="relative w-full py-4 bg-Secondary_background_color text-xl text-highlight_font_color text-center border-b border-dark_gray flex justify-center items-center">
          {/* <div className="flex rounded-lg border-[2px] border-white/5 items-center font-dm_sans overflow-hidden max-h-[45px]">
						<label className="text-white/30 bg-background_color h-[50px] flex items-center rounded-md font-dm_sans text-[16px] px-4 rounded-r-none">
							Case Name
						</label>
						<input
              type="text"
              value={name}
              onChange={(e) => {dummyFunction(e)}}
              placeholder="Case Name"
              className="flex-1 font-fira_code text-[1rem] rounded-r-lg px-4 bg-Secondary_background_color h-10 outline-none placeholder:text-white/30 text-white/70"
            />

					</div> */}
          <SpecialInput
            label="Case Name"
            value={name}
            onChange={dummyFunction}
            placeholder="Case Name"
            dataTestid={`case-name-input-${name}`}
          />
          <div className="absolute right-[1rem] flex gap-[1rem]">
            <Tooltip title="Duplicate schema" placement="top">
              <button
                className="material-symbols-outlined text-white/30 hover:text-yellow-400 cursor-pointer"
                onClick={duplicateSchema}>
                content_copy
              </button>
            </Tooltip>
            <Tooltip title="Delete Schema" placement="top">
              <button
                className="material-symbols-outlined text-white/30 hover:text-rose-400 cursor-pointer"
                onClick={handleDeleteClick}>
                delete
              </button>
            </Tooltip>

            <Modal
              open={showModal}
              onClose={handleDeleteCancel}
              aria-labelledby="delete-column-modal"
              aria-describedby="delete-column-modal-description">
              <div
                className="absolute m-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
								rounded-lg font-dm_sans bg-Secondary_background_color shadow-lg p-6 text-left align-middle text-primary_font_color">
                <p className="mb-7" id="delete-column-modal-description">
                  Are you sure you want to delete this schema?
                </p>
                <div className="flex justify-end items-center mt-7 gap-[1rem]">
                  <button
                    className="bg-sidebar_bg px-[15px] py-[5px] font-bold rounded-md flex items-center border-0 border-transparent hover:text-white "
                    onClick={handleDeleteCancel}>
                    Cancel
                  </button>
                  <button
                    className="bg-rose-400 text-rose-800 px-[15px] py-[5px] flex items-center font-bold rounded-md border-0 border-transparent hover:bg-rose-800 hover:text-rose-400 "
                    onClick={handleDeleteConfirm}>
                    Delete
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>

        <div className="flex w-full justify-center gap-[3rem] items-center py-[1.5rem]">
          <div className="flex gap-[0.5rem] min-w-[100px] font-dm-sans">
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
              size="small"
              fullWidth>
              <InputLabel sx={{ color: "#f00" }} id="color-input-id">
                Color
              </InputLabel>
              <Select
                name="color"
                id={`${name}-color`}
                labelId="color-label-id"
                label="Color"
                value={color}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  changeColor(e.target.value);
                }}>
                {colorList.map((color, id) => {
                  return (
                    <MenuItem key={id} value={color}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                        }}>
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            marginRight: "8px",
                            backgroundColor:
                              get_background_color_from_name(color),
                          }}></span>
                        {color}
                      </span>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <SelectIconComponent icon={icon} changeIcon={changeIcon} />

          <UploadJSON setList={setList} />
        </div>

        <hr className="w-full h-[1px] border-t-[2px] border-t-white/10" />

        <SchemaGeneratorForm list={list} setList={setList} />
        {((mode === "edit" && id !== 0) || mode === "create") && (
          <button
            className="absolute bottom-[4rem] left-[1rem] flex justify-center items-center p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm text-dark_gray border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 hover:text-purple-800 transition-all duration-200 ease-in-out
		"
            onClick={() => dispatch(setActiveTab(id - 1))}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}
        <div className="absolute bottom-[4rem] right-[1rem] flex items-center justify-end bg-background_color z-10">
          {getAllFieldsName().length - 1 === id && (
            <button
              className="flex justify-center items-center p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm text-highlight_font_color border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 hover:text-purple-800 transition-all duration-200 ease-in-out
          "
              data-testid="edit-linkables-btn"
              onClick={() => dispatch(setActiveTab(100))}>
              Edit Linkables
            </button>
          )}
          {getAllFieldsName().length - 1 !== id && (
            <div>
              <button
                className="flex justify-center items-center p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm text-dark_gray border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 hover:text-purple-800 transition-all duration-200 ease-in-out
		          "
                data-testid="next-schema-btn"
                onClick={() => dispatch(setActiveTab(id + 1))}>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </section>
    );
  else return <div></div>;
  // else
  //   return (
  //     <div style={{
  //       background: selectedColor===""? "#1F1F1F" : get_dark_background_color_from_name(selectedColor),
  //     }} className={`h-screen w-12 flex flex-wrap text-primary_font_color`}>
  //       <button
  //         className="h-full w-full"
  //         onClick={() => dispatch(setActiveTab(id))}>
  //         <span className="[writing-mode:vertical-rl] text-sm font-[600] uppercase font-fira_code">
  //           {name} Schema Form
  //         </span>
  //       </button>
  //     </div>
  //   );
};
