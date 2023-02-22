import { SchemaGeneratorForm } from "./SchemaGeneratorForm";

type GeneratorPropTypes = {
  type: string;
  list: TYPE_TICKETS_SCHEMA[] | TYPE_ISSUES_SCHEMA[] | TYPE_PARTS_SCHEMA[];
  setList:
    | React.Dispatch<React.SetStateAction<TYPE_TICKETS_SCHEMA[]>>
    | React.Dispatch<React.SetStateAction<TYPE_ISSUES_SCHEMA[]>>
    | React.Dispatch<React.SetStateAction<TYPE_PARTS_SCHEMA[]>>;
};

export const SchemaGenerator = ({
  type,
  list,
  setList,
}: GeneratorPropTypes) => {
  return (
    <section
      className="h-screen w-screen bg-background_color text-primary_font_color font-inter pt-4
    flex flex-col items-center
    ">
      <p className="text-xl">Schema for {type}</p>
      <button
        className="flex justify-center items-center w-28 h-8 bg-background_color rounded-md shadow-md shadow-black
          text-sm text-highlight_font_color active:shadow-inner mt-2 mr-2 border border-Secondary_background_color self-end">
        Import JSON
      </button>
      <SchemaGeneratorForm type={type} list={list} setList={setList} />
    </section>
  );
};
