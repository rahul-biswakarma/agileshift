import React from "react";

type Type_TagComponentProps = {
	value: TYPE_TAG[];
};

const TagComponent = (props: Type_TagComponentProps) => {
	return (
		<div className="flex gap-[10px] flex-wrap">
			{props.value !== undefined && props.value.length > 0
				? props.value.map((tag: TYPE_TAG, index: number) => {
						return (
							<div
								key={`tag-component-id-${index}`}
								className="flex gap-[5px] rounded-full p-[0_10px] bg-Secondary_background_color justify-center items-center text-[12px] font-fira_code min-w-[60px] h-[25px]"
							>
								<span
									style={{ backgroundColor: `${tag.color}` }}
									className={`w-2 h-2 rounded-full`}
								></span>
								{tag.tagName}
							</div>
						);
				  })
				: "-"}
		</div>
	);
};

export default TagComponent;
