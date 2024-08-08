import { Context, Mode } from "../Context";
import { useContext } from "react";
import parseVSCode from "../../parseVSCode";
import { CopyToClipboard } from "../_shared/CopyToClipboard";

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
  
  const result = parseSnippet(
    context.mode,
    context.snippet,
    context.tabTrigger,
    context.description
  );

  
  if (!show) {
    return null;
  }

  return (
    <>
      <pre className="app__pre">{result}</pre>

      <div className="app__buttons">
        <CopyToClipboard copyValue={result} originalLabel="snippet"/>
      </div>
    </>
  );
};

export default Output;
