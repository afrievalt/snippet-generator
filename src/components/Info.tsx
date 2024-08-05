import { useContext } from "react";
import { Context } from "./Context";
import { VARIABLE_FORM_ID } from "./Placeholders/VariableForm";

const Info = () => {
  const context = useContext(Context);

  
  const platformKey = navigator.platform === "MacIntel" ? "⌘" : "ctrl";
  const showEdit = () => context.setModalIndex(VARIABLE_FORM_ID)
  return (
    <p className="app__info">
      ({platformKey} + i):{" "}
      <span className="app__infoselect">{context.currentPlaceholder}</span> |{" "}
      <a
        className="app__infolink"
        href="https://code.visualstudio.com/docs/editor/userdefinedsnippets"
        //href={docs[context.mode]} // todo: change mode
        target="_blank"
        rel="noopener noreferrer"
      >
        More info
      </a>
      |
      <a
        className="app__infolink"
        onClick={showEdit}
        href="#"        
      >
        Edit
      </a>
    </p>
  );
};

export default Info;
