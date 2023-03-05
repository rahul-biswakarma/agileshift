import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Markup } from "interweave";

type Props = {
  id: string;
};
export default function ChatModule(props: Props) {
  const [chat, setChat] = React.useState<any>([]);

  const fetchChatData = async () => {
    const unsub = onSnapshot(doc(db, "conversations", props.id), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      setChat(doc.data());
      console.log(source, " data: ", doc.data());
    });
  };
  React.useEffect(() => {
    fetchChatData();
  }, []);
  console.log(props);

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

  return (
    <div className="flex flex-col w-[100%] ">
      <section className="">
        {chat &&
          Object.keys(chat).map((day: any, index: number) => {
            return (
              <div key={index}>
                <section className="flex justify-between items-center gap-2">
                  <span className="border border-[#444444] flex flex-1 h-0"></span>
                  <span className="text-sm">
                    {Object.keys(chat).length - 1 === index - 1 ? day : "Today"}
                  </span>
                </section>
                {chat[day].map((message: any, index: number) => {
                  return <SingleMessage key={index} {...message} />;
                })}
              </div>
            );
          })}
      </section>
    </div>
  );
}
