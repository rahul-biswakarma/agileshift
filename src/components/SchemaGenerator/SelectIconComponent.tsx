import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";

type Type_SelectIconComponentProps = {
  icon: string;
  changeIcon: (this: any, icon: string) => void;
};

const SelectIconComponent = (props: Type_SelectIconComponentProps) => {
  let icons = useAppSelector((state) => state.icons.icons);
  const [isIconMenuOpen, setIsIconMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");

  useEffect(() => {
    setSelectedIcon(props.icon);
  }, [props.icon]);

  function toggleIconMenu() {
    setIsIconMenuOpen(!isIconMenuOpen);
  }

  function updateSelectedIcon(icon: string) {
    setSelectedIcon(icon);
    props.changeIcon(icon);
  }

	return (
		<div
			className="relative flex items-center max-w-[110px] w-full h-full border-[2px] border-white/30 rounded-[5px] p-[2px] cursor-pointer"
			onClick={() => {
				toggleIconMenu();
			}}
		>
			<span className="bg-Secondary_background_color px-[10px] h-full flex items-center rounded-l-[5px]">
				Icon
			</span>
			<span className="w-full material-symbols-outlined px-[10px]">
				{selectedIcon}
			</span>
			<div
				className={`top-[115%] ml-[-3px] absolute flex flex-wrap gap-[0.7rem] min-w-[350px] min-h-[300px] max-w-[350px] w-full h-full bg-Secondary_background_color overflow-auto border-[2px] border-white/30 rounded-md p-[0.7rem] z-50 ${
					isIconMenuOpen ? "flex" : "hidden"
				}`}
			>
				{icons.map((icon: string, index: number) => {
					return (
						<span
							onClick={() => {
								updateSelectedIcon(icon);
							}}
							key={`slect-icon-${index}`}
							className="material-symbols-outlined hover:text-amber-400 cursor-pointer"
						>
							{icon}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default SelectIconComponent;
