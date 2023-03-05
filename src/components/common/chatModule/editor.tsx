import React from "react";
import JoditEditor from "jodit-react";
import { send_message_in_fields } from "../../../Utils/Backend";
import { useAppSelector } from "../../../redux/hooks";

interface EditorProps {
  id: string;
}

const Editor: React.FC<EditorProps> = ({ id }) => {
  var messageValue = "";
  const userId = useAppSelector((state) => state.auth.userId);

  function setMessage() {
    console.log(id, messageValue);
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
        }}>
        <span className="material-symbols-outlined">send</span>
      </button>
    </div>
  );
};

export default Editor;
