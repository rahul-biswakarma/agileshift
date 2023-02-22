import UploadJSON from "../UploadJSON";
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
      <UploadJSON type={type} setList={setList}/> 
      <SchemaGeneratorForm type={type} list={list} setList={setList} />
    </section>
  );
};
