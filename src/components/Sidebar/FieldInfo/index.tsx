import React, { useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";

import Footer from "./Footer";
import Header from "./Header";
import SideBarInputs from "../SideBarInputs";
import { fetchData } from "../utils";
import LinksComponent from "./LinksComponent";

interface SidebarProps {
  sidebar: Type_SIDEBARSTATE;
  handleClose: Function;
}

const FieldInfo: React.FC<SidebarProps> = ({ sidebar, handleClose }) => {
  const [formData, setFormData] = React.useState<any>();
  const [filedList, setFieldList] = React.useState<string[]>([]);
  const organizationId = useAppSelector((state) => state.auth.organisationId);
  const [selectedField, setSelectedField] = React.useState<string>(
    sidebar.createModeCalledByField!
  );
  const [formSchema, setFormSchema] = React.useState<TYPE_FIELD>({
    color: "",
    icon: "",
    linkage: [],
    list: [],
    name: "",
  });

  useEffect(() => {
    fetchData(
      setFormSchema,
      setFieldList,
      setSelectedField,
      setFormData,
      organizationId,
      selectedField,
      sidebar.type,
      sidebar.id!
    );
  }, [selectedField, sidebar.type, organizationId, sidebar.id]);

  let headerProps = {
    selectedField,
    filedList,
    setSelectedField,
    color: formSchema?.color,
    displayId: formData?.displayId,
    type: sidebar.type,
  };

  let linksProps = {
    links: formData ? formData?.linkedData : [],
    id: sidebar.id!,
    selectedField,
  };
  
  let footerProps = {
    id: sidebar.id!,
    type: sidebar.type,
    formData,
    selectedField,
  };

  return (
    <div>
      <Header {...headerProps} />
      <div className="grow overflow-y-auto my-2">
        <div className="flex flex-col gap-[0.5rem] h-auto w-full rounded-lg my-4">
          {formSchema && formSchema.list && (
            <form>
              {formSchema.list.map((item: any, index: number) => {
                return (
                  <SideBarInputs
                    key={index}
                    columnDetails={item}
                    formData={formData}
                    setFormData={setFormData}
                    defaultValue={formData[item.columnName]}
                    selectedField={selectedField}
                  />
                );
              })}
            </form>
          )}
        </div>
        <LinksComponent {...linksProps} />
      </div>
      <Footer {...footerProps} handleClose={handleClose} />
    </div>
  );
};

export default FieldInfo;
