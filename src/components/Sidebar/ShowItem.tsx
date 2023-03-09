import { OptionProps } from "react-select";
import { DisplayIdComponent } from "../DataTable/displayIdComponentContainer";

type ShowItemPropType = {
  value: string;
  label: string;
  id: string;
  color: string;
  title: string;
  displayId: string;
  fieldName: string;
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
      className="w-full flex items-center gap-4 p-4 hover:bg-Secondary_background_color text-sm"
    >
      <input
        className="accent-highlight_icon_color"
        type="checkbox"
        checked={isSelected}
        onChange={() => null}
      />
      <div className="flex items-center gap-2">
        <DisplayIdComponent
          field={data.fieldName}
          displayId={data.displayId}
          color={data.color}
        />
        {data.title && (
          <span className="text-highlight_font_color grow truncate">
            {data.title}
          </span>
        )}
      </div>
    </div>
  );
};
