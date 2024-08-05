import { ChangeEvent, useContext } from "react";
import { Context } from "../../Context";

function PlaceholderList() {
  const context = useContext(Context);
  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { checked, value } = target;
    if (checked) {
      context.setCurrentPlaceholder(value);
    }
  };
  return (
    <div>
      {context.placeholder$.map((row, i) => {
        return (
          <div key={i}>
            <input
              type="radio"
              id={row.value}
              name="insert"
              value={row.value}
              onChange={handleRadio}
            />
            <label htmlFor={row.value}>{row.value}</label>
          </div>
        );
      })}
    </div>
  );
}

export { PlaceholderList };
