import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

type TabButtonPropTypes = {
  id?: number;
  onClick: Function;
  text: string;
};
export const TabButton = ({ id, onClick, text }: TabButtonPropTypes) => {
  const activeTab = useAppSelector(
    (state: RootState) => state.schema.activeTab
  );
  return (
    <div
      className={`h-12 rounded-xl w-full flex flex-wrap text-primary_font_color border-white/10 hover:bg-[#282230] hover:text-white transition-all
    ${
      activeTab === id
        ? "border-y bg-background_color"
        : "Secondary_background_color"
    }
    `}>
      <button className="h-full w-full" onClick={() => onClick()}>
        <span className="text-sm uppercase font-[600] font-fira_code">
          {text}
        </span>
      </button>
    </div>
  );
};
