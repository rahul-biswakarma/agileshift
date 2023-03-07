import React from "react";

type type_props = {
	defaultValue: string | Array<string>;
	setFunction: any;
	label: string;
	fieldData: any;
};
export default function Input(props: type_props) {
	return (
		<div>
			<div className="flex my-[0.3rem] bg-background_color text-sm rounded-lg">
				<span
					className="w-[7em] p-3 h-[2.5rem] rounded-l font-dm_sans text-primary_font_color font-bold truncate flex items-center justify-center"
					title={props.label}
				>
					{props.label}
				</span>
				<input
					data-testid="email-input"
					value={props.defaultValue}
					className="grow h-[2.5rem] bg-Secondary_background_color focus:outline-none rounded-r px-4 code-font font-dm_sans border-2 border-background_color"
					type="text"
					placeholder={props.label}
					onChange={(e) =>
						props.setFunction({
							...props.fieldData,
							[props.label]: e.target.value,
						})
					}
				/>
			</div>
		</div>
	);
}
