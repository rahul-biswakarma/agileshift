import { doc, onSnapshot } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebaseConfig";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTabName } from "../../redux/reducers/DataTableSlice";
import { setVistaSchema, setVistaName } from "../../redux/reducers/VistaSlice";
import {
  accept_vista_invitation,
  get_user_by_id,
  get_vista_from_id,
  get_vista_invitations_list,
  reject_vista_invitation,
  send_vista_invitations,
} from "../../Utils/Backend";
import EmailInput from "../common/EmailInput";
type TYPE_FilterOption = {
  filterOptionName: string;
  active: boolean;
};
type TYPE_Filters = {
  columnName: string;
  active: boolean;
  data: TYPE_FilterOption[];
};
type TypeVistaInvitation = {
  mail: string;
  error: boolean;
  visible: boolean;
};
const VistaList = () => {
  const [vistaListCollapse, setVistaListCollapse] = useState<boolean>(false);
  const [vistaList, setVistaList] = useState<any>([]);
  const vistaName = useAppSelector((state) => state.vista.vistaName);
  const [snapShotDone,setSnapShotDone]=useState<boolean>(false);
  const [vistaInvitation, setVistaInvitation] = useState<TypeVistaInvitation[]>(
    []
  );
  const [updateInvitation, setUpdateInvitation] = useState({});
  const [updateVistas, setUpdateVistas] = useState([]);
  const organizationId = useAppSelector((state) => state.auth.organisationId);
  const userId = useAppSelector((state) => state.auth.userId);
  const tabName = useAppSelector((state) => state.datatable.tabName);
  const dispatch = useAppDispatch();

    useEffect(()=>{
        const takeSnapShot=async()=>{
        if(!snapShotDone){
            const user: any = await get_user_by_id(userId);
            onSnapshot(doc(db, "vistaInvitations", user.email!), (doc:any) => {
                setUpdateInvitation(doc.data()['pendingList'])
            });
    
            onSnapshot(doc(db, "users", user.id!), (doc:any) => {
                let data:any = doc.data();
                setUpdateVistas(data['vistas'][organizationId])
            });
            setSnapShotDone(true);
        }
        }
        takeSnapShot();
    },[snapShotDone, userId, organizationId])

  useEffect(() => {
    const getInfo = async () => {
      const user: any = await get_user_by_id(userId);
      let vistaIdList = [];
      let vistaInvitation = [];
      if (user.vistas && user.vistas[organizationId]) {
        vistaIdList = user.vistas[organizationId];
      }
        let visList = [];
        const pendingVistas = await get_vista_invitations_list(userId);

      if (
        pendingVistas[organizationId] &&
        pendingVistas[organizationId].length
      ) {
        let pendingVistaIdList = pendingVistas[organizationId];
        for (let i = 0; i < pendingVistaIdList.length; i++) {
          const visObj = await get_vista_from_id(pendingVistaIdList[i]);
          visList.push({ ...visObj, id: pendingVistaIdList[i], invited: true });
          vistaInvitation.push({ mail: "", error: false, visible: false });
        }
      }
      for (let i = 0; i < vistaIdList.length; i++) {
        const visObj = await get_vista_from_id(vistaIdList[i]);
        visList.push({ ...visObj, id: vistaIdList[i] });
        vistaInvitation.push({ mail: "", error: false, visible: false });
      }
      setVistaList(visList);
      setVistaInvitation(vistaInvitation);
    };
    getInfo();
  }, [organizationId, userId, tabName,updateVistas,updateInvitation]);

  const handleClick = (
    filterSchema: TYPE_Filters[],
    type: string,
    vistaName: string
  ) => {
    setVistaListCollapse(false);
    dispatch(setVistaName(vistaName));
    dispatch(setTabName(type));
    dispatch(setVistaSchema(filterSchema));
  };
  const handleChangeMail = (e: any, index: number) => {
    let tempInvitations = [...vistaInvitation];
    tempInvitations[index].mail = e.target.value;
    setVistaInvitation(tempInvitations);
  };
  const toggleVistaInvitation = (index: number) => {
    let tempInvitations = [...vistaInvitation];
    tempInvitations[index].visible = !tempInvitations[index].visible;
    setVistaInvitation(tempInvitations);
  };

  const toggleVistaList = () => {
    let tempInvitations = [...vistaInvitation];
    for (let i = 0; i < tempInvitations.length; i++) {
      tempInvitations[i].visible = false;
    }
    setVistaInvitation(tempInvitations);
    setVistaListCollapse(!vistaListCollapse);
  };

  const handleShareVista = (index: number) => {
    let tempInvitations = [...vistaInvitation];
    if (tempInvitations[index].mail === "") {
      tempInvitations[index].error = true;
      setVistaInvitation(tempInvitations);
      return;
    }
    tempInvitations[index].error = false;
    setVistaInvitation(tempInvitations);
    sendVistaInvitation(index);
    tempInvitations[index].mail = "";
    tempInvitations[index].visible = false;
    setVistaInvitation(tempInvitations);
  };

  const sendVistaInvitation = async (index: number) => {
    const mail = vistaInvitation[index].mail;
    const user = await get_user_by_id(userId);
    if (user) {
      send_vista_invitations(userId, mail, vistaList[index].id, organizationId);
      toast.success(`${mail} has been invited to ${vistaList[index].name}!`);
    }
  };
  const acceptVista = async (index: number) => {
    const vistaId = vistaList[index].id;
    accept_vista_invitation(userId, vistaId, organizationId);
    let tempVistaList = [...vistaList];
    tempVistaList[index].invited = false;
    setVistaList(tempVistaList);
    toast.success(`${vistaList[index].name} has been added to your vistas!`);
  };
  const rejectVista = async (index: number) => {
    const vistaId = vistaList[index].id;
    reject_vista_invitation(userId, vistaId, organizationId);
    let tempVistaList = [...vistaList];
    tempVistaList.splice(index, 1);
    setVistaList(tempVistaList);
    toast.error(`${vistaList[index].name} has been rejected!`);
  };
  return (
    <div className="relative text-white">
      <div
        onClick={toggleVistaList}
        className="flex w-max gap-1 items-center px-3 py-2 text-white/30 hover:bg-white/5 rounded-sm cursor-pointer">
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
        {vistaName ? vistaName : <p className="w-full">Vista</p>}
      </div>
      {vistaListCollapse && (
        <div className="absolute flex flex-col w-max top-[105%] right-0 border border-white/20 z-10 rounded-md p-3 bg-background_color">
          {vistaList.length > 0 ? (
            vistaList.map((data: any, _id: number) => (
              <div className="flex flex-col mt-2" key={_id}>
                <div className="w-full flex items-center justify-between">
                  <button
                    onClick={() =>
                      handleClick(data.vistaSchema, data.field, data.name)
                    }
                    className="px-3 py-1 hover:bg-Secondary_background_color rounded-md mr-2">
                    {data.name}
                  </button>
                  {data.invited ? (
                    <div className="flex">
                      <button
                        className="flex items-center bg-Secondary_background_color border border-inherit text-center text-lg rounded-lg text-sm
                        font-fira_code hover:text-green-800 hover:bg-green-400 hover:border-green-500 transition-all mr-2"
                        onClick={() => acceptVista(_id)}>
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button
                        className="flex items-center bg-Secondary_background_color border border-inherit text-center text-lg rounded-lg text-sm font-fira_code hover:text-rose-800 hover:bg-rose-400 hover:border-rose-500 transition-all"
                        onClick={() => rejectVista(_id)}>
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      className="material-symbols-outlined flex justify-center items-center text-sm w-6 h-6 rounded-md bg-Secondary_background_color"
                      onClick={() => toggleVistaInvitation(_id)}>
                      share
                    </button>
                  )}
                </div>
                {vistaInvitation[_id].visible && (
                  <EmailInput
                    value={vistaInvitation[_id].mail}
                    onChange={(e) => handleChangeMail(e, _id)}
                    errorState={vistaInvitation[_id].error}
                    onSubmit={() => handleShareVista(_id)}
                  />
                )}
              </div>
            ))
          ) : (
            <div>No Vistas</div>
          )}
        </div>
      )}
    </div>
  );
};
export default VistaList;