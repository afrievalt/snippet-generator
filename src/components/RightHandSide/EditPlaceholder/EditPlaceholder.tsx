import { useContext, useState } from "react";
import { Context, Placeholder } from "../../Context";
import { Div } from "../../Div";
import VariableForm, {
  VARIABLE_FORM_ID,
} from "../../Placeholders/VariableForm";
import { descriptionLookup } from "../../Placeholders/variables";
import { PlaceholderList } from "./PlaceholderList";
import { PlaceholderForm } from "./PlaceholderForm";
import { getUUID } from "../../../util/getUUID";

type Props = {
  show: boolean;
};

const initForm = {
  value: "",
  description: "",
};

function EditPlaceholder(props: Props) {
  const context = useContext(Context);
  const [form, setForm] = useState<Placeholder | undefined>();
  const showNewPlaceholder = !!form;
  const { show } = props;
  if (!show) {
    return null;
  }

  const handleCancel = () => {
    setForm(undefined);
  };
  const handleClickNew = () => {
    setForm({ ...initForm, id: getUUID() });
  };
  const handleClickEdit = () => {
    // todo: current should be a placehoder, not a string
    setForm(context.currentPlaceholder);
  };
  const handleClickVariable = () => {
    context.setModalIndex(VARIABLE_FORM_ID);
  };
  const handleClickAddTransform = () => {
    context.setMode("edit");
  };
  const handleSelectVariable = (variable: string) => {
    const value = `$${variable}`;
    const description = descriptionLookup[variable];
    setForm({ value, description, id: getUUID() });
  };
  return (
    <div className="app_placeholder w-full">
      <Div show={!showNewPlaceholder}>
        <PlaceholderList />
        <div className="inline stretch">
          <button className="app__btn small" onClick={handleClickNew}>
            New
          </button>
          <button className="app__btn small" onClick={handleClickEdit}>
            Edit
          </button>
          <button className="app__btn small" onClick={handleClickVariable}>
            Add Variable
          </button>
          <button className="app__btn small" onClick={handleClickAddTransform}>
            Add Transform
          </button>
        </div>
      </Div>
      <Div show={showNewPlaceholder}>
        <PlaceholderForm show onCancel={handleCancel} initForm={form} />
      </Div>

      <VariableForm onSelect={handleSelectVariable} />
    </div>
  );
}

export default EditPlaceholder;
