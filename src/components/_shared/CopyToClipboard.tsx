import { useState } from "react";
import { writeToClipboard } from "../../util/writeToClipboard";

type Props = {
  copyValue: string;
  originalLabel: string; 
};

function CopyToClipboard(props: Props) {
  const { copyValue, originalLabel } = props;
  const [savedToClipboard, setSavedToClipboard] = useState("");

  const handleClickCopy = async () => {
    await writeToClipboard(copyValue);
    setSavedToClipboard(copyValue);
  };
  const isCopied = copyValue === savedToClipboard
  return (
    <button className="app__btn app__btncopy" onClick={handleClickCopy}>
      {isCopied ? "Copied" : `Copy ${originalLabel}`}
    </button>
  );
}

export { CopyToClipboard };
