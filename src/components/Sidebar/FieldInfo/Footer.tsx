import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setDatas } from "../../../redux/reducers/DataTableSlice";
import { setSideBar } from "../../../redux/reducers/SideBarSlice";
import { RootState } from "../../../redux/store";
import { get_data_by_column_name } from "../../../Utils/Backend";
import CustomButton from "../../common/Button";
import { handleConversations, handleSubmit } from "../utils";

type TypeFooterProps = {
  type: string;
  id: string;
  formData: any;
  selectedField: string;
  handleClose: Function;
};
const Footer: React.FC<TypeFooterProps> = ({
  type,
  id,
  formData,
  handleClose,
  selectedField,
}) => {
  const dispatch = useAppDispatch();
  const organizationId = useAppSelector((state) => state.auth.organisationId);
  const userId = useAppSelector((state) => state.auth.userId);

  const sidebarList: Type_SIDEBARSTATE[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );
  const [isButtonClicked, setIsButtonClicked] = React.useState<boolean>(false);
  const tabName = useAppSelector((state) => state.datatable.tabName);

  React.useEffect(() => {
    let flag: boolean = false;
    sidebarList.forEach((item: any) => {
      if (item.type === "conversations" && item.fieldId === id) {
        setIsButtonClicked(true);

        flag = true;
      }
    });

    if (!flag) {
      setIsButtonClicked(false);
    }
  }, [sidebarList, selectedField, id]);

  const updateTable = async () => {
    let data;
    if (tabName.toLowerCase() === "all") {
      data = await get_data_by_column_name(
        organizationId,
        tabName.toLowerCase()
      );
      dispatch(setDatas(data));
      handleClose();
    } else {
      data = await get_data_by_column_name(organizationId, tabName);
      dispatch(setDatas(data));
      handleClose();
    }
  };

  const handleCreate = async () => {
    await handleSubmit(
      organizationId,
      formData,
      selectedField,
      type,
      userId,
      [],
      id
    );
    updateTable();
  };

  return (
    <footer className=" fixed  w-full bottom-0 p-4 right-0 mb-4 flex flex-row justify-between gap-2 items-center">
      <button
        disabled={isButtonClicked}
        title="Click to start conversation"
        className="material-symbols-outlined cursor-pointer active:opacity-50"
        onClick={() => handleConversations(id, dispatch, setSideBar)}
      >
        forum
      </button>
      <CustomButton
        onClick={() => handleCreate()}
        label={
          type === "createMode" || type === "createNewsLink"
            ? "Create"
            : "Update"
        }
        className="flex justify-center items-center p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm text-highlight_font_color border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400hover:text-purple-800 transition-all duration-200 ease-in-out"
      />
    </footer>
  );
};

export default Footer;
