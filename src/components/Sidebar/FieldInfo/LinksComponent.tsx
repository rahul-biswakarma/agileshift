import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/hooks";
import { setSideBar } from "../../../redux/reducers/SideBarSlice";
import { RootState } from "../../../redux/store";
import CustomButton from "../../common/Button";
import { DisplayIdComponent } from "../../DataTable/displayIdComponentContainer";

type TypeLinksProps = {
  links: string[];
  id: string;
  selectedField: string;
};

const LinksComponent: React.FC<TypeLinksProps> = ({
  links,
  id,
  selectedField,
}) => {
  const dispatch = useAppDispatch();
  const sidebarList: Type_SIDEBARSTATE[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );
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

  const handleAddLink = () => {
    dispatch(
      setSideBar({
        type: "AddLinks",
        fieldName: selectedField,
        linkedCalledByID: id,
        links: links,
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
        {links?.length > 0 ? (
          links.map((linkedData: any, index: number) => {
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
