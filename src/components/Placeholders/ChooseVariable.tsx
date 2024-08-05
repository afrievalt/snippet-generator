import { ChangeEvent, useContext } from "react";
import { Context } from "../Context";
import { variables } from "./variables";

function ChooseVariable() {
  const context = useContext(Context);
  const handleChange =  (e: ChangeEvent<HTMLInputElement>) => {
    context.setVariable(e.target.value);
  };
  
  return (
    <fieldset >
      {variables.map((row) => (
        <div key={row.variable} className="item">
          <label htmlFor={row.variable}>
            <input
              checked={context.variable === row.variable}
              onChange={handleChange}
              type="radio"
              id={row.variable}
              name="variable"
              value={row.variable}
            />
            &nbsp;
            {row.variable}
          </label>
          <div className="variables__description">{row.description}</div>
        </div>
      ))}      
    </fieldset>
  );
}

export default ChooseVariable;


