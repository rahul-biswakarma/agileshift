import React from "react";
import { IdComponent } from "../DataTable/idComponent";
import { OptionProps } from "react-select";

type ShowItemPropType = {
  value: string;
  label: string;
  id: string;
  color: string;
  title: string;
};

export const ShowItem = (props: OptionProps<ShowItemPropType>) => {
  const { data } = props;
  return (
    <div className="w-max">
      <IdComponent itemId={data.id} color={data.color} />
      {data.title && <span>{data.title}</span>}
    </div>
  );
};
