import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setIsEdit } from "../../redux/reducers/SchemaSlice";
import { useNavigate } from "react-router-dom";

const SchemaGeneratorFormHeader = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	let organisationId = useAppSelector((state) => state.auth.organisationId);

	function navigateToDashboard() {
		dispatch(setIsEdit(false));
		navigate(`/organization/${organisationId}`);
	}
	return (
		<div className="w-full h-[40px] border-b border-dark_gray flex justify-between items-center text-white/50 font-dm_sans font-[500] text-sm px-[1rem]">
			<p>Organization Schema Form</p>
			{useAppSelector((state) => state.schema.isEdit) === true && (
				<span
					onClick={() => navigateToDashboard()}
					className="material-symbols-outlined hover:text-rose-400 cursor-pointer text-[17px] font-bold"
				>
					close
				</span>
			)}
		</div>
	);
};

export default SchemaGeneratorFormHeader;
