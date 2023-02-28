import React, { useCallback } from "react";
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
  const { data, innerRef, innerProps } = props;

  const handleClick = useCallback(() => {
    props.selectOption(data);
  }, [data, props]);
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="w-max my-4"
      onClick={handleClick}>
      <IdComponent itemId={data.id} color={data.color} />
      {data.title && (
        <span className="text-highlight_font_color">{data.title}</span>
      )}
    </div>
  );
};
