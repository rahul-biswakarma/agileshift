import { SchemaGeneratorForm } from "./SchemaGeneratorForm";
require("tailwindcss-writing-mode")({
  variants: ["responsive", "hover"],
});

type GeneratorPropTypes = {
  type: string;
  list: TYPE_SCHEMA[];
  setList: React.Dispatch<React.SetStateAction<TYPE_SCHEMA[]>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export const SchemaGenerator = ({
  type,
  list,
  setList,
  activeTab,
  setActiveTab,
}: GeneratorPropTypes) => {
  if (activeTab === type)
    return (
      <section
        className="h-screen w-screen bg-background_color text-primary_font_color
        flex flex-col items-center gap-4 font-dm_sans        
    ">
        <p className="w-full py-4 bg-background_color text-xl text-highlight_font_color text-center border-b border-border_color">{type} Schema</p>
        <SchemaGeneratorForm
          type={type}
          list={list}
          setList={setList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </section>
    );
  else
    return (
      <div className="h-screen w-28 flex flex-wrap text-primary_font_color bg-Secondary_background_color">
        <button className="h-full w-full" onClick={() => setActiveTab(type)}>
          <span className="[writing-mode:vertical-rl]">{type} Schema Form</span>
        </button>
      </div>
    );
};
