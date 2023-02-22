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
      className="h-screen w-screen bg-background_color text-primary_font_color
flex flex-col items-center gap-4 font-dm_sans
    ">
      <p className="w-full py-4 bg-background_color text-xl text-highlight_font_color text-center border-b border-border_color">{type} Schema</p>
      <div className="flex flex-col h-full">
      <SchemaGeneratorForm type={type} list={list} setList={setList} />
      </div>
    </section>
  );
};
