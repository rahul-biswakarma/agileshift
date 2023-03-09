import { doc, onSnapshot } from "firebase/firestore";
import React, { useRef } from "react";
import { db } from "../../../firebaseConfig";
import Editor from "../../common/editor";
import { MessageWrapperComponent } from "./MessageWrapperComponent";

type TYPE_Chat = {
  [key: string]: TYPE_MESSAGE[];
};

type TYPE_ConversationTabProps = {
  sidebar: Type_SIDEBARSTATE;
  tabBarColaps: boolean;
  handleSideBarColaps: Function;
};

export default function ConversationsTab(props: TYPE_ConversationTabProps) {
  const [chat, setChat] = React.useState<TYPE_Chat>({});

  const fetchChatDataCallback = React.useCallback(() => {
    const fetchChatData = async () => {
      onSnapshot(doc(db, "conversations", props.sidebar.fieldId!), (doc) => {
        setChat(doc.data() as TYPE_Chat);
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

  const chatRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Scroll to bottom of chat section whenever chat data is updated
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="flex flex-col h-full max-h-full w-[400px] p-2">
      <p className="pl-4 py-3">Conversations</p>

      <div className="flex flex-1 items-end">
        <section
          ref={chatRef}
          className="max-h-[calc(100vh-50px-4rem)] h-auto overflow-y-auto w-full"
        >
          {chat &&
            Object.keys(chat).map((day: any, index: number) => {
              return (
                <MessageWrapperComponent
                  key={index}
                  index={index}
                  chat={chat[day]}
                  day={day}
                />
              );
            })}
        </section>
      </div>

      <div className="sticky bottom-0 h-10 w-[100%] mb-4 flex items-center justify-center">
        <Editor id={props.sidebar.fieldId!} />
      </div>
    </div>
  );
}
