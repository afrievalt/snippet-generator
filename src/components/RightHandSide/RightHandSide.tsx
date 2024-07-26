import { Context  } from "../Context";
import { useContext  } from "react";
import Edit from "./Edit/Edit";
import Output from "./Output";


const RightHandSide = () => {
  const context = useContext(Context);
  
  return (
    <div className="app__half">
      <div className="app__halftop">
        <button
          className={
            context.mode === "vscode"
              ? "app__button app__button--vscode app__button--active"
              : "app__button app__button--vscode"
          }
          onClick={() => context.setMode("vscode")}
        >
          Output
        </button>
        <button
          className={
            context.mode === "edit"
              ? "app__button app__button--sublimetext app__button--active"
              : "app__button app__button--sublimetext"
          }
          onClick={() => context.setMode("edit")}
        >
          Edit Variable
        </button>
        <button
          className={
            context.mode === "atom"
              ? "app__button app__button--atom app__button--active"
              : "app__button app__button--atom"
          }
          onClick={() => context.setMode("atom")}
        >
          Help
        </button>
      </div>

      <div className="app__halfbottom">
        <Output show={context.mode === "vscode"}/>       
        <Edit show={context.mode === "edit"} /> 
        
      </div>
    </div>
  );
};

export {RightHandSide};
