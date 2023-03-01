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
  const { data, innerRef, innerProps, isSelected } = props;

  // const handleClick = useCallback(() => {
  //   props.selectOption(data);
  // }, [data, props]);
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="w-full flex items-center gap-4 p-4 hover:bg-background_color">
      <input type="checkbox" checked={isSelected} onChange={() => null} />
      <div className="flex flex-col">
        <IdComponent itemId={data.id} color={data.color} />
        {data.title && (
          <span className="text-highlight_font_color">{data.title}</span>
        )}
      </div>
    </div>
  );
};
