import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setIsEdit } from "../../redux/reducers/SchemaSlice";
import { useNavigate } from "react-router-dom";

const SchemaGeneratorFormHeader = ({mode}: {mode: string}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let organisationId = useAppSelector((state) => state.auth.organisationId);

	function navigateToDashboard() {
		dispatch(setIsEdit(false));
		navigate(`/organization/${organisationId}`);
	}

	const navigateToOrgList = () => {
		navigate("/organization-lists");
	}

	return (
		<div className="w-full h-[40px] border-b border-dark_gray flex justify-between items-center text-white/50 font-dm_sans font-[500] text-sm px-[1rem]">
			<div className="flex items-center gap-4">
				{
					mode === "create" && (
						<span onClick={() => navigateToOrgList()} className="material-symbols-outlined text-[15px] border-2 border-white/50 hover:text-rose-400 p-1 rounded-full cursor-pointer">
							arrow_back
						</span>
					)
				}
				<p className="text-center text-[12px]">Organization Schema Form</p>
			</div>
			<span
				onClick={() => navigateToDashboard()}
				className="material-symbols-outlined hover:text-rose-400 cursor-pointer text-[17px] font-bold"
			>
				close	
			</span>
		</div>
	);
};

export default SchemaGeneratorFormHeader;
