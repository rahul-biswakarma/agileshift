import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Footer from "./Footer";
import Header from "./Header";
import SideBarInputs from "../SideBarInputs";
import { fetchData } from "../utils";
import LinksComponent from "./LinksComponent";
import { DisplayIdComponent } from "../../DataTable/displayIdComponentContainer";
import { setAppendFetchedLink } from "../../../redux/reducers/SideBarSlice";

interface SidebarProps {
	sidebar: Type_SIDEBARSTATE;
	handleClose: Function;
	handleSideBarColaps: Function;
	tabBarColaps: boolean;
}

const FieldInfo: React.FC<SidebarProps> = ({
	sidebar,
	handleClose,
	tabBarColaps,
	handleSideBarColaps,
}) => {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = React.useState<any>({ linkedData: [] });
	const [filedList, setFieldList] = React.useState<string[]>([]);
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const [color] = React.useState<string>("");
	const [selectedField, setSelectedField] = React.useState<string>(
		sidebar.createModeCalledByField!
	);
	const [trackUserColumn] = React.useState<string[]>([]);
	const [formSchema, setFormSchema] = React.useState<TYPE_FIELD>({
		color: "",
		icon: "",
		linkage: [],
		list: [],
		name: "",
	});

<<<<<<< HEAD
  useEffect(() => {
    fetchData(
      setFormSchema,
      setFieldList,
      setSelectedField,
      setFormData,
      organizationId,
      selectedField,
      sidebar.type,
      sidebar.id!,
      dispatch,
      setAppendFetchedLink
    );
  }, [selectedField, sidebar.type, organizationId, sidebar.id, dispatch]);
=======
	useEffect(() => {
		fetchData(
			setFormSchema,
			setFieldList,
			setSelectedField,
			setFormData,
			organizationId,
			selectedField,
			sidebar.type,
			sidebar.id!,
			dispatch,
			setFetchedLinks
		);
	}, [selectedField, sidebar.type, organizationId, sidebar.id, dispatch]);
>>>>>>> 7530bba6730194c4ce1d611b9b2fa48ad5bc8a25

	let headerProps = {
		selectedField,
		filedList,
		setSelectedField,
		color: formSchema?.color,
		displayId: formData?.displayId,
		type: sidebar.type,
	};

	let linksProps = {
		id: sidebar.id!,
		selectedField,
		modeOfCall: sidebar.type,
	};

	let footerProps = {
		id: sidebar.id!,
		type: sidebar.type,
		color,
		formData,
		selectedField,
		trackUserColumn,
	};

	if (tabBarColaps) {
		return (
			<div
				onClick={() => handleSideBarColaps()}
				className="z-[100] relative border-r border-white/10 h-full w-[50px] flex h-max-content justify-center items-center text-xl  cursor-pointer bg-background_color py-4"
			>
				{sidebar.type === "editMode" ? (
					<div className="rotate-90">
						<DisplayIdComponent
							field={selectedField}
							displayId={formData?.displayId}
							color={formSchema?.color}
						/>
					</div>
				) : (
					<p className="rotate-90">{selectedField}</p>
				)}
			</div>
		);
	} else {
		return (
			<div className="w-[400px] p-4">
				<Header {...headerProps} />
				<div className="grow overflow-y-auto my-2">
					<div className="flex flex-col gap-[0.5rem] h-auto w-full rounded-lg my-4">
						{formSchema && formSchema.list && (
							<form>
								{formSchema.list.map((item: any, index: number) => {
									return (
										<SideBarInputs
											key={index}
											columnDetails={item}
											formData={formData}
											setFormData={setFormData}
											defaultValue={formData[item.columnName]}
											selectedField={selectedField}
										/>
									);
								})}
							</form>
						)}
					</div>
					<LinksComponent {...linksProps} />
				</div>
				<Footer
					{...footerProps}
					handleClose={handleClose}
				/>
			</div>
		);
	}
};

export default FieldInfo;
