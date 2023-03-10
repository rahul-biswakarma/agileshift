import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setSideBar } from "../../../redux/reducers/SideBarSlice";
import { RootState } from "../../../redux/store";
import CustomButton from "../../common/Button";
import { DisplayIdComponent } from "../../DataTable/displayIdComponentContainer";

type TypeLinksProps = {
  id: string;
  selectedField: string;
  modeOfCall: string;
};

const LinksComponent: React.FC<TypeLinksProps> = ({
  id,
  selectedField,
  modeOfCall,
}) => {
  const dispatch = useAppDispatch();
  const sidebarList: Type_SIDEBARSTATE[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );
  const fetchedLinks = useAppSelector((state) => state.sidebar.fetchedLinks);

  const [isButtonClicked, setIsButtonClicked] = React.useState<boolean>(false);

  React.useEffect(() => {
    let flag: boolean = false;
    sidebarList.forEach((item: any) => {
      if (
        item.type === "AddLinks" &&
        item.fieldName === selectedField &&
        item.linkedCalledByID === id
      ) {
        setIsButtonClicked(true);

        flag = true;
      }
    });

    if (!flag) {
      setIsButtonClicked(false);
    }
  }, [sidebarList, selectedField, id]);

  const handleAddLink = async () => {
    dispatch(
      setSideBar({
        type: "AddLinks",
        fieldName: selectedField,
        linkedCalledByID: id,
        links: fetchedLinks[id],
        modeOfCall: modeOfCall,
      })
    );
  };

  const handleIdClick = (id: string) => {
    dispatch(
      setSideBar({
        type: "editMode",
        createModeCalledByField: "",
        fieldId: id,
        linkedData: [],
        id: id,
      })
    );
  };

  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-extrabold">Linked To</span>
        <CustomButton
          onClick={handleAddLink}
          label={"Link"}
          icon="add_link"
          disabled={isButtonClicked}
          className="flex justify-center gap-1 items-center w-max rounded-md p-[10px_20px] text-highlight_font_color text-sm font-dm_sans hover:bg-dark_gray hover:text-white"
        />
      </div>
      <section className="flex flex-wrap gap-2 justify-center cursor-pointer mt-4 mb-4 p-2 py-4 border-y rounded-lg bg-black/60 border-black">
        {fetchedLinks[id]?.length > 0 ? (
          fetchedLinks[id].map((linkedData: any, index: number) => {
            return (
              <span
                key={`linked-${index}`}
                onClick={() => handleIdClick(linkedData.id)}
              >
                <DisplayIdComponent
                  field={linkedData.fieldName}
                  displayId={linkedData.displayId}
                  color={linkedData.color}
                />
              </span>
            );
          })
        ) : (
          <span>No Links</span>
        )}
      </section>
    </div>
  );
};

export default LinksComponent;
