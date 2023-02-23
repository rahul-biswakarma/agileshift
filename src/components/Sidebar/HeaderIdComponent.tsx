import React from "react";

type Type_SidebarState = {
  field: string;
  data: TYPE_SCHEMA[];
  color: string;
  dataId:string
};

type Type_HeaderIdComponentProps = {
  state: Type_SidebarState;
  setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>;
};

const HeaderIdComponent = (props: Type_HeaderIdComponentProps) => {
  return props.state.data ? (
    <span
      style={{
        borderColor: props.state.color,
        color: props.state.color,
        backgroundColor: props.state.color + 20,
      }}
      className={`border-2 px-1 rounded-md text-sm flex items-center`}
    >
      {props.state.dataId}
    </span>
  ) : (
    <span
      style={{
        borderColor: props.state.color,
        color: props.state.color,
        backgroundColor: props.state.color + 20,
      }}
      className={`border-2 px-1 rounded-md text-sm flex items-center`}
    >
      New {props.state.field}
    </span>
  );
};

export { HeaderIdComponent };
