import { doc, onSnapshot } from "firebase/firestore";
import { Markup } from "interweave";
import React, { useRef } from "react";
import { db } from "../../firebaseConfig";

import Editor from "../common/editor";

type Props = {
  sidebar: Type_SIDEBARSTATE;
  tabBarColaps: boolean;
  handleSideBarColaps: Function;
};

export default function ConversationsTab(props: Props) {
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

  const SingleMessage = (message: any) => {
    return (
      <div className="flex justify-start relative p-1">
        {/* avatar */}
        <img
          className="w-12 rounded h-12 self-start"
          alt=""
          src={message.senderImg}
        />

        {/* message */}
        <span className="flex flex-col flex-1 pl-2 mt-[-4px]">
          <h2 className="font-bold text-lg text-start">{message.name}</h2>
          <p className="text-chat_module_text_1 text-[10px] w-full flex-wrap h-auto ">
            <Markup
              content={message.message}
              className=" text-[13px] h-auto break-all font-extralight "
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

  if (props.tabBarColaps) {
    return (
      <div
        onClick={() => props.handleSideBarColaps()}
        className=" [writing-mode:vertical-rl] border-r-2 border-brown-600 h-full w-[50px] flex justify-center items-center text-xl  cursor-pointer bg-background_color py-4"
      >
        {"Conversations"}
      </div>
    );
  } else {
    return (
      <div className="w-[400px] p-4 h-screen ">
        <p className="pl-4 py-3">Conversations</p>
        <div className="flex flex-1 items-end ">
          <section
            ref={chatRef}
            className="max-h-[calc(100vh-50px-36px)] min-h-[calc(100vh-50px-36px)] px-4 h-auto overflow-y-auto w-full"
          >
            {chat &&
              Object.keys(chat).map((day: any, index: number) => {
                return (
                  <div key={index} className="w-full">
                    <section className="flex justify-between items-center gap-2 w-full ">
                      <span className="border border-[#444444] flex flex-1 h-0 w-full "></span>
                      <span className="text-sm">
                        {index !== 0 ? "Today" : day}
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

        <div className="sticky bottom-0 h-30 w-[100%]  p-4 mb-4 ">
          <Editor id={props.sidebar.fieldId!} />
        </div>
      </div>
    );
  }
}
