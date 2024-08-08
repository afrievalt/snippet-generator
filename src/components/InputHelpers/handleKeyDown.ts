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
  console.log(
    "%c >>>",
    "background: #222; color: #bada55",
    //context.insertVarValue
  );

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

  const newValue = `${stringBeforeCaret}${context.currentPlaceholder.value}${stringAfterCaret}`;

  e.currentTarget.value = newValue;  
//  e.currentTarget.selectionStart = initialSelectionStart + 4;
//  e.currentTarget.selectionEnd = initialSelectionStart + 11;

  context.setSnippet(newValue);
};

const handleReplace = (e: Event, context: MyContext) => {
  e.preventDefault();
  const selection = window.getSelection()?.toString() ?? "";
  const foo = e.currentTarget.value;
  const newValue = foo.replaceAll(selection, "${1:example}");
  context.setSnippet(newValue);
};

const acquireOnKeyDown = (context: MyContext) => (e: Event) => {
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
    e.key === "r" &&
    (e.ctrlKey || e.metaKey) &&
    document.activeElement === e.currentTarget
  ) {
    handleReplace(e, context);
  }
  context.setMode("vscode")
};

export { acquireOnKeyDown };


