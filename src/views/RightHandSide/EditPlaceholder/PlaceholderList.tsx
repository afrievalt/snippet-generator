import { ChangeEvent, useContext } from "react";
import { Context } from "../../../store/Context";

function PlaceholderList() {
  const context = useContext(Context);
  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { checked, value } = target;
    if (checked) {
      const ph = context.placeholder$.find((v) => v.id === value);
      ph && context.setCurrentPlaceholder(ph);
    }
  };
  const { placeholder$ = [], currentPlaceholder } = context;
  return (
    <div>
      {placeholder$.map((row) => {
        return (
          <div key={row.id} className="row">
            <label className="form-control">
              <input
                type="radio"
                checked={row.id === currentPlaceholder.id}
                id={row.id}
                name="insert"
                value={row.id}
                onChange={handleRadio}
              />
              {row.value}
            </label>
            <div className="subtext">{row.description}</div>
          </div>
        );
      })}
    </div>
  );
}

export { PlaceholderList };
