import React from "react";
import JoditEditor from "jodit-react";
import { send_message_in_fields } from "../../../Utils/Backend";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

interface EditorProps {
  id: string;
}

const checkEmptyMessage = (message: string) => {
  let tempMessage = message;
  return tempMessage.replace(/<[^>]*>?/gm, "");
};

const Editor: React.FC<EditorProps> = ({ id }) => {
  const userId: string = useSelector((state: RootState) => state.auth.userId);

  var messageValue = "";

  function setMessage() {
    if (checkEmptyMessage(messageValue) === "") return;
    send_message_in_fields(id, userId, messageValue);
  }

  const handleContentChange = (newContent: string) => {
    messageValue = newContent;
  };

  return (
    <div className="p-[1rem] pt-0 sticky bottom-0 bg-chat_module_bg">
      <JoditEditor
        value={""}
        config={{
          readonly: false,
          toolbarButtonSize: "small",
          statusbar: false,
        }}
        onChange={handleContentChange}
      />
      <button
        className="absolute right-[1.5rem] bottom-[1.5rem]"
        onClick={() => {
          setMessage();
        }}
      >
        <span className="material-symbols-outlined active:text-blue-500">
          send
        </span>
      </button>
    </div>
  );
};

export default Editor;
