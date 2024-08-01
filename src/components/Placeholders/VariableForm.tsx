import { useContext } from "react";
import ChooseVariable from "./ChooseVariable";
import { Context } from "../Context";

export const VARIABLE_FORM_ID = 1;
type Props = {
  onSelect: (selectedValue: string)=>void
};

function VariableForm(props: Props) {  
  const {onSelect} = props;
  const context = useContext(Context);
  if (VARIABLE_FORM_ID !== context.modalIndex) {
    return null;
  }
  const handleSelect = () => {
    handleHide()   
    onSelect(context.variable)
  }
  const handleHide = () => context.setModalIndex(0)
  return (
    <div className="variable-form">
      <ChooseVariable />
      <button onClick={handleSelect} className="app__btn app__btncopy">Select</button>{" "}
      <button onClick={handleHide} className="app__btn app__btncopy">Cancel</button>
    </div>
  );
}

export default VariableForm;
