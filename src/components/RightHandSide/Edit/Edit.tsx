import { useContext, useState } from "react";
import { Context } from "../../Context";
import VariableForm, {
  VARIABLE_FORM_ID,
} from "../../Placeholders/VariableForm";

type Props = {
  show: boolean;
};

const initForm = {
  variable: "",
  regex: "",
  regexOptions: "",
  format: "",
};

type Event = React.ChangeEvent<HTMLInputElement>;

function Edit(props: Props) {
  const { show } = props;
  const context = useContext(Context);
  const [form, setForm] = useState(initForm);
  if (!show) {
    return null;
  }
  const handleInsertVariable = () => context.setModalIndex(VARIABLE_FORM_ID);
  const handleSelect = (variable: string) => {
    setForm({ ...form, variable });
  };
  const acquireHandleFormat = (newFormat: string) => () => {
    const format = `${form.format}\${1:\\${newFormat}}` 
    setForm({ ...form, format});
  };
  const acquireOnChange = (key: string) => (e: Event) => {
    console.log(e);
    setForm({ ...form, [key]: e.target.value });
  };
  const newValue =
    "$" +
    `{${[form.variable, form.regex, form.format, form.regexOptions].join(
      "/"
    )}}`;
  return (
    <div>
      <div>
        <label>
          <span>Variable</span>
          <input
            value={form?.variable}
            onChange={acquireOnChange("variable")}
          />
          <button onClick={handleInsertVariable}>Insert</button>
        </label>
        <VariableForm onSelect={handleSelect} />
      </div>
      <div>
        <label>
          <span>Regex</span>
          <input value={form?.regex} onChange={acquireOnChange("regex")} />
        </label>
      </div>
      <div>
        <label>
          <span>Regex Options</span>
          <input
            value={form?.regexOptions}
            onChange={acquireOnChange("regexOptions")}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Format</span>
          <input value={form?.format} onChange={acquireOnChange("format")} />
          <button onClick={acquireHandleFormat("upcase")}>UPCASE</button>
          <button onClick={acquireHandleFormat("downcase")}>downcase</button>
          <button onClick={acquireHandleFormat("capitalize")}>Capitalize</button>
          <button onClick={acquireHandleFormat("camelcase")}>camelCase</button>
          <button onClick={acquireHandleFormat("pascalcase")}>PascalCase</button>
        </label>
      </div>
      <div>{newValue}</div>
      <VariableForm onSelect={handleSelect} />
    </div>
  );
}

export default Edit;
