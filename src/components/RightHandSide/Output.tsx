import { Context, Mode } from "../Context";
import { useContext, useEffect, useState } from "react";
import parseVSCode from "../../parseVSCode";

const parseSnippet = (
  mode: Mode,
  description: string,
  tabTrigger: string,
  snippet: string
): string => {
  if (mode === "vscode") {
    return parseVSCode(snippet, tabTrigger, description);
  }

  return "";
};

type Props = {
  show: boolean;
};

const Output = (props: Props) => {
  const { show } = props;
  const context = useContext(Context);
  const [savedToClipboard, setSavedToClipboard] = useState(false);

  useEffect(() => {
    setSavedToClipboard(false);
  }, [context]);

  const result = parseSnippet(
    context.mode,
    context.snippet,
    context.tabTrigger,
    context.description
  );

  const writeToClipboard = async () => {
    const type = "text/plain";
    const blob = new Blob([result], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
    setSavedToClipboard(true);
  };
  if (!show) {
    return null;
  }

  return (
    <>
      <pre className="app__pre">{result}</pre>

      <div className="app__buttons">
        <button className="app__btn app__btncopy" onClick={writeToClipboard}>
          {savedToClipboard ? "Copied" : "Copy snippet"}
        </button>
      </div>
    </>
  );
};

export default Output;
