interface Props extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
}

function Div(props: Props) {
  const { show = true, children } = props;
  if (!show) {
    return null;
  }
  return <div>{children}</div>;
}

export { Div };
