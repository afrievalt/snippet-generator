import { useContext, useState } from "react";
import { Context } from "../../Context";
import { Div } from "../../Div";
import VariableForm, { VARIABLE_FORM_ID } from "../../Placeholders/VariableForm";

type Props = {
  show: boolean;
};

const initForm = {
  value: "",
  description: "",
};

type Event = React.ChangeEvent<HTMLInputElement>;

function EditPlaceholder(props: Props) {
  const context = useContext(Context);
  const [isInsert, setIsInsert] = useState(true);
  const [showNewPlaceholder, setShowNewPlaceholder] = useState(false);
  const [form, setForm] = useState(initForm);
  const { show } = props;
  if (!show) {
    return null;
  }
  const acquireOnChange = (key: string) => (e: Event) => {
    setForm({ ...form, [key]: e.target.value });
  };
  const handleClickNew = () => {
    setShowNewPlaceholder(true);
  };
  const handleClickVariable = () => {
    context.setModalIndex(VARIABLE_FORM_ID);
    setShowNewPlaceholder(true);
  };
  const handleSelect = (variable: string) => {
    const value = `$${variable}`
    setForm({value, description: ""})
  }
  return (
    <div className="app_placeholder">
      <div className="app__halftop">
        <button
          className={
            isInsert
              ? "app__button app__button--vscode app__button--active"
              : "app__button app__button--vscode"
          }
          onClick={() => setIsInsert(true)}
        >
          Insert
        </button>
        <button
          className={
            isInsert
              ? "app__button app__button--sublimetext"
              : "app__button app__button--vscode app__button--active"
          }
          onClick={() => setIsInsert(false)}
        >
          Replace
        </button>
      </div>
      <div>
        {context.placeholder$.map((row, i) => {
          return <div key={i}>{row.value}</div>;
        })}
        <Div show={!showNewPlaceholder} className="inline">
          <button onClick={handleClickNew}>New</button>
          <button onClick={handleClickVariable}>Add Variable</button>
          <button>Add Transform</button>
        </Div>
        <Div show={showNewPlaceholder} className="inline">
          <div>
            <label>
              <span>Placeholder</span>
              <input
                value={form?.value}
                onChange={acquireOnChange("value")}
              />
            </label>
            <label>
              <span>Description</span>
              <input
                value={form?.description}
                onChange={acquireOnChange("description")}
              />
            </label>
          </div>
          <button onClick={handleClickVariable}>Add Variable</button>
          <button>Add Transform</button>
        </Div>
      </div>
      <VariableForm onSelect={handleSelect} />
    </div>
  );
}

export default EditPlaceholder;
