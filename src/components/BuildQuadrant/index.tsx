import { useAppDispatch } from "../../redux/hooks";

import DataTable from "../DataTable";
import BuildQuadarntHeader from "./BuildQuadarntHeader";
import {
	setDatas,
	setDataSchema,
	setFieldColor,
} from "../../redux/reducers/DataTableSlice";

type Type_BuildQuadarntProps = {
	fieldData: TYPE_FIELD;
	datas: any;
};

const BuildQuadarnt = (props: Type_BuildQuadarntProps) => {
	const dispatch = useAppDispatch();
	dispatch(setFieldColor(props.fieldData.color));
	dispatch(setDatas(props.datas));
	dispatch(setDataSchema(props.fieldData.list));

	return (
		<div>
			<BuildQuadarntHeader />
			<main className="p-[1rem]">
				<DataTable />
			</main>
		</div>
	);
};

export default BuildQuadarnt;
