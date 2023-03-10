import React from "react";
import DropDown from "../../common/DropDown";
import { DisplayIdComponent } from "../../DataTable/displayIdComponentContainer";

type TypeHeaderProps = {
  filedList: string[];
  selectedField: string;
  setSelectedField: (value: string) => void;
  color: string;
  displayId?: string;
  type: string;
};
const Header: React.FC<TypeHeaderProps> = ({
  selectedField,
  filedList,
  setSelectedField,
  color,
  displayId,
  type,
}) => {
  let dropDownProps = {
    selectedField,
    filedList,
    setSelectedField,
    color: color,
  };
  return (
    <header className="flex justify-between items-center">
      {type === "createMode" && <DropDown {...dropDownProps} />}
      {type === "editMode" && color !== "" && (
        <DisplayIdComponent
          field={selectedField}
          displayId={displayId!}
          color={color}
        />
      )}
    </header>
  );
};

export default Header;
