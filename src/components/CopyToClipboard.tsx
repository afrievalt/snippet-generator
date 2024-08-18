import { useClipboard } from "../hooks/useClipboard";
type Props = {
  copyValue: string;
  originalLabel: string;
};

function CopyToClipboard(props: Props) {
  const { copyValue, originalLabel } = props;
  const [clipboard, setClipboard] = useClipboard("");
  const handleClickCopy = async () => {
    setClipboard(copyValue);
  };
  const isCopied = copyValue === clipboard;
  return (
    <button className="app__btn app__btncopy" onClick={handleClickCopy}>
      {isCopied ? "Copied" : `Copy ${originalLabel}`}
    </button>
  );
}

export { CopyToClipboard };
