import { doc, onSnapshot } from "firebase/firestore";
import { Markup } from "interweave";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebaseConfig";
import { useAppDispatch } from "../../redux/hooks";
import { setNewSidBar } from "../../redux/reducers/SideBarSlice";
import { RootState } from "../../redux/store";
import CustomButton from "../common/Button";
import Editor from "../common/chatModule/editor";

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
      <div className="flex relative flex-row">
        {/* avatar */}
        <img className="w-10 rounded h-10" alt="" src={message.senderImg} />
        {/* message */}
        <span className="flex flex-col flex-1 max-w-[270px] ml-2">
          <section>{message.name}</section>
          <p className="text-chat_module_text_1 text-[15px] w-full flex-wrap h-auto">
            <Markup
              content={message.message}
              className="w-full h-auto break-words"
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
        <p className="pl-4">Conversesations</p>

        <section
          ref={chatRef}
          className="max-h-[calc(100vh-25vh)] overflow-y-scroll pl-4 pr-4 h-[75vh]  "
        >
          {chat &&
            Object.keys(chat).map((day: any, index: number) => {
              return (
                <div key={index}>
                  <section className="flex justify-between items-center gap-2">
                    <span className="border border-[#444444] flex flex-1 h-0"></span>
                    <span className="text-sm">
                      {Object.keys(chat).length - 1 === index - 1
                        ? day
                        : "Today"}
                    </span>
                  </section>
                  {chat[day].map((message: any, index: number) => {
                    return <SingleMessage key={index} {...message} />;
                  })}
                </div>
              );
            })}
        </section>
        <div className="fixed bottom-0 w-[100%]  h-[20vh]">
          <Editor id={props.sidebar.fieldId!} />
        </div>
      </div>
    );
  }
}
