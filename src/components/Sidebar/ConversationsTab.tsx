import { doc, onSnapshot } from "firebase/firestore";
import { Markup } from "interweave";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebaseConfig";
import { useAppDispatch } from "../../redux/hooks";
import { setNewSidBar } from "../../redux/reducers/SideBarSlice";
import { RootState } from "../../redux/store";
import CustomButton from "../common/Button";
import Editor from "../common/editor";

type Props = {
  tabColaps: Boolean;
  setColapsTabBar: Function;
  sidebar: Type_SidebarState;
  index: number;
};

export default function ConversationsTab(props: Props) {
  const dispatch = useAppDispatch();
  const [sideBarList] = React.useState(
    useSelector((state: RootState) => state.sidebar.sideBarData)
  );

  const [chat, setChat] = React.useState<any>([]);

  const fetchChatDataCallback = React.useCallback(() => {
    const fetchChatData = async () => {
      onSnapshot(doc(db, "conversations", props.sidebar.fieldId!), (doc) => {
        setChat(doc.data());
      });
    };
    fetchChatData();
  }, [props.sidebar.fieldId]);

  React.useEffect(() => {
    fetchChatDataCallback();

    // Scroll to bottom of chat section
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [fetchChatDataCallback]);

  const handleClose = () => {
    dispatch(
      setNewSidBar(
        sideBarList.filter((sideBar, index) => index !== props.index)
      )
    );
  };

  const SingleMessage = (message: any) => {
    return (
      <div className="flex justify-start relative p-1">
        {/* avatar */}
        <img className="w-12 rounded h-12 self-start" alt="" src={message.senderImg} />

        {/* message */}
        <span className="flex flex-col flex-1 pl-2 mt-[-4px]">
          <h2 className="font-bold text-lg text-start">{message.name}</h2>
          <p className="text-chat_module_text_1 text-[10px] w-full flex-wrap h-auto">
            <Markup
              content={message.message}
              className="w-full text-[13px] h-auto break-words font-extralight"
            />
          </p>
        </span>

        {/* time */}
        <span className="right-0 text-[9px] pt-2">
          {new Date(message.timeStamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    );
  };
  const chatRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Scroll to bottom of chat section whenever chat data is updated
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  if (props.tabColaps) {
    return (
      <div
        className="[writing-mode:vertical-rl] border-r-2 border-brown-500 h-full w-[50px] flex justify-center items-center text-xl  cursor-pointer bg-background_color py-4"
        onClick={() => {
          props.setColapsTabBar(props.index);
        }}
      >
        Add Options {props.sidebar.columnName}
      </div>
    );
  } else {
    return (
      <div
        className="flex flex-col  w-[400px] h-full max-h-full bg-sidebar_bg backdrop-filter backdrop-blur-md bg-opacity-10 
              border-l border-[#444444] pt-4 "
      >
        <CustomButton
          icon={"close"}
          onClick={handleClose}
          className="absolute right-3 top-3 flex items-center justify-center p-1 text-white hover:text-red-400"
        />
        <p className="pl-4">Conversations</p>


        <div className="flex h-[90vh] items-end">
          <section
            ref={chatRef}
            className="max-h-[90vh] px-4 h-auto overflow-y-auto w-full"
          >
            {chat &&
              Object.keys(chat).map((day: any, index: number) => {
                return (
                  <div key={index} className="w-full">
                    <section className="flex justify-between items-center gap-2 w-full ">
                      <span className="border border-[#444444] flex flex-1 h-0 w-full "></span>
                      <span className="text-sm">
                        {Object.keys(chat).length - 1 === index - 1
                          ? day
                          : "Today"}
                      </span>
                    </section>
                    <section className="flex flex-col gap-3">
                      {chat[day].map((message: any, index: number) => {
                        return <SingleMessage key={index} {...message} />;
                      })}
                    </section>
                  </div>
                );
              })}
          </section>
        </div>
        <div className="fixed bottom-0 w-[100%] h-[5vh] p-4 mb-4 ">
          <Editor id={props.sidebar.fieldId!} />
        </div>
      </div>
    );
  }
}
