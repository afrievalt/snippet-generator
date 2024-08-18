import { ReactNode } from "react";


interface Props extends React.ComponentPropsWithoutRef<"input"> {
    children?: ReactNode;
    label: string;
    id: string;  
}

function TextInput(props: Props) {
  const { children, label, id, ...rest } = props;

  return (
    <div className="text_input">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest}></input>
      {children}
    </div>
  );
}

export default TextInput;
