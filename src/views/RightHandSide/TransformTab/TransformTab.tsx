import { useContext, useState } from "react";
import { Context } from "../../../store/Context";
import VariableForm, {
  VARIABLE_FORM_ID,
} from "../../ChooseVariable/VariableForm";
import { CopyToClipboard } from "../../../components/CopyToClipboard";
import { getUUID } from "../../../util/getUUID";
import TextInput from "../../../components/TextInput";

type Props = {
  show: boolean;
};

const initForm = {
  variable: "",
  regex: "",
  regexOptions: "",
  format: "",
  description: "",
};

type Event = React.ChangeEvent<HTMLInputElement>;

function EditVariable(props: Props) {
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
    const format = `${form.format}\${1:\\${newFormat}}`;
    setForm({ ...form, format });
  };
  const acquireOnChange = (key: string) => (e: Event) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const newValue =
    "$" +
    `{${[form.variable, form.regex, form.format, form.regexOptions].join(
      "/"
    )}}`;
  const handleAdd = () => {
    context.upsertPlaceholder({
      value: newValue,
      description: "",
      id: getUUID(),
    });
    context.setMode("placeholder");
  };
  return (
    <div className="app_placeholder">
      <TextInput
        id="variable"
        label="Variable"
        value={form?.variable}
        onChange={acquireOnChange("variable")}
      >
        <button onClick={handleInsertVariable}>Insert</button>
      </TextInput>
      <TextInput
        id="regex"
        label="Regex"
        value={form?.regex}
        onChange={acquireOnChange("regex")}
      ></TextInput>
      <TextInput
        id="regexOptions"
        label="Regex Options"
        value={form?.regexOptions}
        onChange={acquireOnChange("regexOptions")}
      ></TextInput>
      <TextInput
        id="format"
        label="Format"
        value={form?.format}
        onChange={acquireOnChange("format")}
      >
        <div className="inline-wrap">
          <button onClick={acquireHandleFormat("upcase")}>UPCASE</button>
          <button onClick={acquireHandleFormat("downcase")}>downcase</button>
          <button onClick={acquireHandleFormat("capitalize")}>
            Capitalize
          </button>
          <button onClick={acquireHandleFormat("camelcase")}>camelCase</button>
          <button onClick={acquireHandleFormat("pascalcase")}>
            PascalCase
          </button>
        </div>
      </TextInput>
      <TextInput
        id="description"
        label="Description"
        value={form?.description}
        onChange={acquireOnChange("description")}
      ></TextInput>

      <div>{newValue}</div>
      <div className="app__buttons">
        <button onClick={handleAdd} className="app__btn app__btncopy">
          Add
        </button>
        <CopyToClipboard copyValue={newValue} originalLabel="variable" />
      </div>
      <VariableForm onSelect={handleSelect} />
    </div>
  );
}

export default EditVariable;
