import { useContext, useState } from "react";
import { Context } from "../../Context";
import VariableForm from "../../Placeholders/VariableForm";

function Edit(props: Props) {
  const { show } = props;
  const context = useContext(Context);
  const handleInsertVariable = () => {
  //  context.showVarModal((select) => console.log(select));
  };
  if (!show) {
    return null;
  }
  return (
    <div>
      <label>
        <span>Variable</span>
        <input />
        <button onClick={handleInsertVariable}>Insert</button>
      </label>
    </div>
  );
}

export default Edit;
