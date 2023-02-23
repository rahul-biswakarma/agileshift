import { useState } from "react";
import { get_text_color_from_name } from "../../Utils/Backend";
import { SchemaGeneratorForm } from "./SchemaGeneratorForm";
require("tailwindcss-writing-mode")({
  variants: ["responsive", "hover"],
});

type GeneratorPropTypes = {
  name: string;
  setName: (this: any, name: string) => void;
  list: TYPE_SCHEMA[];
  setList: (this: any, list: TYPE_SCHEMA[]) => void;
  linkage: string[];
  addLinkage: (this: any, link: string) => void;
  removeLinkage: (this: any, link: string) => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  getAllFieldsName: () => string[];
  submitSchema: () => void;
  duplicateSchema: (this: any) => void;
};

export const SchemaGenerator = ({
  name,
  setName,
  list,
  setList,
  linkage,
  addLinkage,
  removeLinkage,
  activeTab,
  setActiveTab,
  getAllFieldsName,
  submitSchema,
  duplicateSchema,
}: GeneratorPropTypes) => {
  const colorList = [
    "purple",
    "slate",
    "red",
    "amber",
    "lime",
    "cyan",
    "indigo",
    "pink",
  ];
  const [linkageVisible, setLinkageVisible] = useState(false);
  if (activeTab === name)
    return (
      <section
        className="h-screen w-screen bg-background_color text-primary_font_color
        flex flex-col items-center gap-4 font-dm_sans        
    ">
        <p
          className="w-full py-4 bg-background_color text-xl text-highlight_font_color text-center border-b border-border_color
        flex justify-center
        ">
          <input
            type="text"
            className="w-40 text-center bg-background_color text-highlight_font_color px-2 placeholder:text-primary_font_color
            rounded-md border border-primary_font_color mr-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
          Schema
          <select
            name="color"
            id={`${name}-color`}
            className="ml-16 px-2
          bg-background_color 
          text-highlight_font_color
          rounded-lg border border-primary_font_color
          ">
            {colorList.map((color, id) => (
              <option
                value={color}
                key={id}
                style={{ color: `${get_text_color_from_name(color)}` }}>
                {color}
              </option>
            ))}
          </select>
        </p>
        <div className="relative w-full flex justify-center items-center">
          Can be linked to :{" "}
          <div className="relative h-max flex items-center">
            <button
              className="px-2
              w-max
            min-w-full
            h-8
        bg-background_color 
        text-highlight_font_color
        rounded-lg border border-primary_font_color ml-2"
              onClick={() => setLinkageVisible(!linkageVisible)}>
              {linkage.map((link, id) => (
                <span
                  className="bg-Secondary_background_color px-1 mx-1"
                  key={id}>
                  {link}
                </span>
              ))}
            </button>
            {linkageVisible && (
              <div className="absolute w-40 top-8 left-2 h-max border border-dark_gray z-[50] bg-background_color rounded-md">
                {getAllFieldsName().map((field, id) => (
                  <div
                    key={id}
                    className="w-full flex justify-start h-max p-2 px-4">
                    <input
                      type="checkbox"
                      name={`linkage-${name}`}
                      id={`linkage-${name}`}
                      className="mr-2"
                      checked={linkage.includes(field)}
                      onChange={() => {
                        linkage.includes(field)
                          ? removeLinkage(field)
                          : addLinkage(field);
                      }}
                    />
                    <label htmlFor={`linkage-${name}`}>{field}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="absolute right-10 flex items-center px-2 py-2 bg-Secondary_background_color justify-center
                            text-highlight_font_color rounded-md shadow-lg uppercase
                            border border-dark_gray"
            onClick={duplicateSchema}>
            Duplicate Template
          </button>
        </div>
        <SchemaGeneratorForm
          type={name}
          list={list}
          setList={setList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLast={getAllFieldsName()[getAllFieldsName().length - 1] === name}
          submitSchema={submitSchema}
        />
      </section>
    );
  else
    return (
      <div className="h-screen w-12 flex flex-wrap text-primary_font_color bg-Secondary_background_color">
        <button className="h-full w-full" onClick={() => setActiveTab(name)}>
          <span className="[writing-mode:vertical-rl] text-sm font-bold uppercase font-fira_code">
            {name} Schema Form
          </span>
        </button>
      </div>
    );
};
