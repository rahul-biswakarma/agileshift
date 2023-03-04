import {
  get_background_color_from_name,
  get_text_color_from_name,
} from "../../Utils/Backend";

type Type_IssuesIdComponentProps = {
  itemId: string;
  color: string;
};

const IdComponent = (props: Type_IssuesIdComponentProps) => {
  let textColor = get_text_color_from_name(props.color);
  let bgColor = get_background_color_from_name(props.color);
  return (
    <div
      style={{
        color: textColor,
        backgroundColor: bgColor,
      }}
      className="w-max h-[20px]  font-fira_code rounded-[8px] text-blue-600 text-center px-[8px] flex justify-center items-center text-[12px] font-[500]"
    >
      {props.itemId}
    </div>
  );
};

export { IdComponent };
