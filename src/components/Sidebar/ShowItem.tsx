import React from "react";
import { IdComponent } from "../DataTable/idComponent";

type ShowItemPropType = {
  id: string;
  color: string;
  title: string;
};

export const ShowItem = (props: ShowItemPropType) => {
  return (
    <div className="w-max">
      <IdComponent issuesId={props.id} color={props.color} />
      {props.title && <span>{props.title}</span>}
    </div>
  );
};
