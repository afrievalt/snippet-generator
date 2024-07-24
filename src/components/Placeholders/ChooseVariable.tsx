import { useContext } from "react";
import { Context } from "../Context";
import { variables } from "./variables";

function ChooseVariable() {
const context = useContext(Context);
  const handleChange = (e) => {context.setVariable(e.target.value);
  };
  return (
    <fieldset onChange={handleChange}>
      {variables.map((row) => (
        <div key={row.variable} className="item">
          <input
            type="radio"
            id={row.variable}
            name="variable"
            value={row.variable}
          />
          <label htmlFor={row.variable}>{row.variable}</label>
          <div className="variables__description">{row.description}</div>
        </div>
      ))}
    </fieldset>
  );
}

export default ChooseVariable;
