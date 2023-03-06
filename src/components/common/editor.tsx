import React from "react";
// import JoditEditor from "jodit-react";
import { send_message_in_fields } from "../../Utils/Backend";
import { useAppSelector } from "../../redux/hooks";

interface EditorProps {
  id: string;
}

const checkEmptyMessage = (message: string) => {
  let tempMessage = message;
  return tempMessage.replace(/<[^>]*>?/gm, "");
};

const Editor: React.FC<EditorProps> = ({ id }) => {
  const [messageValue, setMessgaeValue] = React.useState("");
  const userId = useAppSelector((state) => state.auth.userId);

  function setMessage() {
    if (checkEmptyMessage(messageValue) === "") return;
    send_message_in_fields(id, userId, messageValue);
    setMessgaeValue("");
  }

  // const handleContentChange = (newContent: string) => {
  //   messageValue = newContent;
  // };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setMessage();
      }}
      className=" h-full flex items-center justify-between gap-2"
    >
      <input
        required
        className="w-full h-8 rounded-md p-2 border bg-black text-sm"
        value={messageValue}
        placeholder="Type your message here..."
        onChange={(e) => {
          setMessgaeValue(e.target.value);
        }}
      />
      {/* <JoditEditor
        value={""}
        config={{
          readonly: false,
          toolbarButtonSize: "small",
          statusbar: false,
        }}
        onChange={handleContentChange}
      /> */}
      <button
        type="submit"
        title="send message"
        className={`bg-black flex items-center w-12 h-8 justify-center rounded border ${
          messageValue === "" && " cursor-not-allowed"
        }}`}
      >
        <span className="material-symbols-outlined active:text-blue-500 ">
          send
        </span>
      </button>
    </form>
  );
};

export default Editor;
