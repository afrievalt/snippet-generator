import { useContext } from "react";
import { Context } from "./Context";
import Info from "./Info";
import { acquireOnKeyDown } from "./InputHelpers/handleKeyDown";

const Input = () => {
  const context = useContext(Context);

  return (
    <div className="app__half">
      <div className="app__halftop">
        <input
          type="text"
          className="app__input"
          name="description"
          placeholder="Description…"
          value={context.description}
          onChange={(e) => context.setDescription(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <input
          type="text"
          className="app__input"
          name="tabTrigger"
          placeholder="Tab trigger…"
          value={context.tabTrigger}
          onChange={(e) => context.setTabTrigger(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
      <div className="app__halfbottom">
        <textarea
          // ref={context?.textareaRef}
          className="app__textarea"
          name="snippet"
          placeholder="Your snippet…"
          value={context.snippet}
          onChange={(e) => context.setSnippet(e.target.value)}
          onKeyDown={acquireOnKeyDown(context)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          wrap="off"
        />
        <Info />
      </div>
    </div>
  );
};

export default Input;
