import { useContext, useState } from "react";
import { Context, Placeholder } from "../../../store/Context";
import { Div } from "../../../components/Div";
import TextInput from "../../../components/TextInput";

type Props = {
  show: boolean;
  onCancel: () => void;
  initForm: undefined | Placeholder;
};

type Event = React.ChangeEvent<HTMLInputElement>;

function PlaceholderForm(props: Props) {
  const { show, initForm, onCancel } = props;
  const context = useContext(Context);
  const [form, setForm] = useState(initForm!);
  const isEdit =
    !!context.placeholder$.find((v) => v.id === initForm?.id) &&
    initForm?.value === form.value;

  if (!show) {
    return null;
  }
  const acquireOnChange = (key: string) => (e: Event) => {
    setForm({ ...form, [key]: e.target.value });
  };
  const handleSave = () => {
    context.upsertPlaceholder(form);
    onCancel();
    //setForm(initForm);
  };

  const handleDelete = () => {
    context.removePlaceholder(form);
    onCancel();
  };
  return (
    <div>
      <div>
        <TextInput
          id="placeholder_input"
          label="Placeholder"
          value={form?.value}
          onChange={acquireOnChange("value")}
        />
        <TextInput
          id="placeholder_input"
          label="Description"
          value={form?.description}
          onChange={acquireOnChange("description")}
        />
      </div>
      <div className="inline stretch">
        <Div show={isEdit} fragment>
          <button className="app__btn small" onClick={handleDelete}>
            Delete
          </button>
        </Div>
        <button className="app__btn small" onClick={onCancel}>
          Cancel
        </button>
        <button className="app__btn small" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export { PlaceholderForm };
