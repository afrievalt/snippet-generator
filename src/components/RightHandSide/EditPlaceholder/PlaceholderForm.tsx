import { useContext, useState } from "react";
import { Context, Placeholder } from "../../Context";
import VariableForm, {
  VARIABLE_FORM_ID,
} from "../../Placeholders/VariableForm";
import { descriptionLookup } from "../../Placeholders/variables";
import { getUUID } from "../../../util/getUUID";

type Props = {
  show: boolean;
  onCancel: (show: boolean) => void;
  initForm: undefined | Placeholder;
};

const initForm = {
  value: "never",
  description: "",
  id: ""
};

type Event = React.ChangeEvent<HTMLInputElement>;

function PlaceholderForm(props: Props) {
  const context = useContext(Context);  
  const [form, setForm] = useState(props.initForm!);

  const { show } = props;
  if (!show) {
    return null;
  }
  const acquireOnChange = (key: string) => (e: Event) => {
    setForm({ ...form, [key]: e.target.value });
  };
  const handleClickVariable = () => {
    context.setModalIndex(VARIABLE_FORM_ID);
  };
  const handleSave = () => {
      context.addPlaceholder(form);    
    
    props.onCancel(false);
    setForm(initForm);
  };
  const handleCancel = () => {
    props.onCancel(false);
    setForm(initForm);  //todo: is this needed, remove?
  };
  const handleSelect = (variable: string) => {
    const value = `$${variable}`;
    const description = descriptionLookup[variable];
    setForm({ value, description, id: getUUID() });
  };
  return (
    <div>
      <div>
        <label>
          <span>Placeholder</span>
          <input value={form?.value} onChange={acquireOnChange("value")} />
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
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
      <VariableForm onSelect={handleSelect} />
    </div>
  );
}

export { PlaceholderForm };
