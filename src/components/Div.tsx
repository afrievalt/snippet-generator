interface Props extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  fragment?: boolean;
}

function Div(props: Props) {
  const { show = true, children, fragment=false, ...rest } = props;
  if (!show) {
    return null;
  }
  if(fragment) {
    return children
  }
  return <div {...rest}>{children}</div>;
}

export { Div };
