import { MyContext } from "../Context";

type Event = React.KeyboardEvent<HTMLTextAreaElement>;

const handleTab = (e: Event, context: MyContext) => {
  e.preventDefault();

  const initialSelectionStart = e.currentTarget.selectionStart;
  const initialSelectionEnd = e.currentTarget.selectionEnd;
  const stringBeforeCaret = e.currentTarget.value.substring(
    0,
    initialSelectionStart
  );
  const stringAfterCaret = e.currentTarget.value.substring(
    initialSelectionEnd,
    initialSelectionEnd + e.currentTarget.textLength
  );

  const newValue = `${stringBeforeCaret}  ${stringAfterCaret}`;

  e.currentTarget.value = newValue;
  e.currentTarget.selectionStart = initialSelectionStart + 2;
  e.currentTarget.selectionEnd = initialSelectionStart + 2;

  context.setSnippet(newValue);
};


const handleInsert = (e: Event, context: MyContext) => {
  e.preventDefault();
  const { currentPlaceholder, placeholderIndex } = context;
  const { value } = currentPlaceholder;
  const insertValue = value.startsWith("${1") ? `${"${"}${placeholderIndex}${value.substring(3)}`:value
  const placeHolderIndexCorrection = value.startsWith("${1") ? `${placeholderIndex}`.length - 1 : 0;
  const initialSelectionStart = e.currentTarget.selectionStart;
  const initialSelectionEnd = e.currentTarget.selectionEnd;
  const stringBeforeCaret = e.currentTarget.value.substring(
    0,
    initialSelectionStart
  );
  const stringAfterCaret = e.currentTarget.value.substring(
    initialSelectionEnd,
    initialSelectionEnd + e.currentTarget.textLength
  );

  const newValue = `${stringBeforeCaret}${insertValue}${stringAfterCaret}`;

  e.currentTarget.value = newValue;
  if (value === "${1:example}") {
    e.currentTarget.selectionStart = initialSelectionStart + 4 + placeHolderIndexCorrection;
    e.currentTarget.selectionEnd = initialSelectionStart + 11 + placeHolderIndexCorrection;
  }
  context.setSnippet(newValue);
};

const handleAdd = (context: MyContext) => {
  const { placeholderIndex, setPlaceholderIndex } = context;
  setPlaceholderIndex(placeholderIndex + 1);
};

const handleSubtract = (context: MyContext) => {
  const { placeholderIndex, setPlaceholderIndex } = context;
  setPlaceholderIndex(Math.max(placeholderIndex - 1, 0));
};
const handleReplace = (e: Event, context: MyContext) => {
  e.preventDefault();
  const selection = window.getSelection()?.toString() ?? "";
  const foo = e.currentTarget.value;
  const newValue = foo.replaceAll(selection, "${1:example}");
  context.setSnippet(newValue);
};

const acquireOnKeyDown = (context: MyContext) => (e: Event) => {
  console.log({ e });
  if (e.key === "Tab") {
    handleTab(e, context);
  }
  if (
    e.key === "i" &&
    (e.ctrlKey || e.metaKey) &&
    document.activeElement === e.currentTarget
  ) {
    handleInsert(e, context);
  }
  if (
    e.key === "=" &&
    (e.ctrlKey || e.metaKey) &&
    document.activeElement === e.currentTarget
  ) {
    handleAdd(context);
    e.preventDefault();
  }
  if (
    e.key === "-" &&
    (e.ctrlKey || e.metaKey) &&
    document.activeElement === e.currentTarget
  ) {
    handleSubtract(context);
    e.preventDefault();
  }

  if (
    e.key === "r" &&
    (e.ctrlKey || e.metaKey) &&
    document.activeElement === e.currentTarget
  ) {
    handleReplace(e, context);
  }
  context.setMode("vscode");
};

export { acquireOnKeyDown };
