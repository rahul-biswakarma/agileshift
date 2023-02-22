import { SchemaGeneratorForm } from "./SchemaGeneratorForm";
require("tailwindcss-writing-mode")({
  variants: ["responsive", "hover"],
});

type GeneratorPropTypes = {
  name: string;
  setName: (this: any, name: string) => void;
  list: TYPE_SCHEMA[];
  setList: (this: any, list: TYPE_SCHEMA[]) => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export const SchemaGenerator = ({
  name,
  setName,
  list,
  setList,
  activeTab,
  setActiveTab,
}: GeneratorPropTypes) => {
  if (activeTab === name)
    return (
      <section
        className="h-screen w-screen bg-background_color text-primary_font_color
        flex flex-col items-center gap-4 font-dm_sans        
    ">
        <p className="w-full py-4 bg-background_color text-xl text-highlight_font_color text-center border-b border-border_color">
          <input
            type="text"
            className="w-40 text-center bg-background_color text-highlight_font_color px-2 placeholder:text-primary_font_color
            rounded-md border border-primary_font_color"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
          Schema
        </p>
        <SchemaGeneratorForm
          type={name}
          list={list}
          setList={setList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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
