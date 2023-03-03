import React from "react";
import AutoComplete from "../common/AutoComplete";
// import { useAppSelector } from "../../redux/hooks";
// import AutoComplete from "../common/AutoComplete";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";
import MultiSelect from "../common/MultiSelect";
// import MultiSelect from "../common/MultiSelect";

type type_props = {
	columnDetails: {
		columnName: string;
		columnType: string;
	};
	formData: any;
	setFormData: React.Dispatch<any>;
	defaultValue?: any;
	selectedTab?: string;
	selectedField: string;
};
export default function SideBarInputs(props: type_props) {
	if (["dropdown"].includes(props.columnDetails.columnType)) {
		return (
			<div>
				<AutoComplete
					columnDetails={props.columnDetails}
					formData={props.formData}
					setFormData={props.setFormData}
					defaultValue={props.defaultValue}
					selectedField={
						props.selectedField === undefined ? "" : props.selectedField
					}
				/>
			</div>
		);
	}
	if (["tag", "user"].includes(props.columnDetails.columnType)) {
		return (
			<MultiSelect
				dataType={props.columnDetails.columnType}
				defaultValue={props.defaultValue}
				columnName={props.columnDetails.columnName}
				setFormData={props.setFormData}
				fieldData={props.formData}
				selectedTab={props.selectedTab === undefined ? "" : props.selectedTab}
			/>
		);
	}
	if (["string", "title"].includes(props.columnDetails.columnType)) {
		return (
			<Input
				defaultValue={props.defaultValue}
				label={props.columnDetails.columnName}
				setFunction={props.setFormData}
				fieldData={props.formData}
			/>
		);
	}
	if (["date"].includes(props.columnDetails.columnType)) {
		return (
			<DatePicker
				type={"date"}
				defaultValue={props.defaultValue}
				label={props.columnDetails.columnName}
				setFunction={props.setFormData}
				fieldData={props.formData}
			/>
		);
	}
	return <div> Type is Not valid</div>;
}
