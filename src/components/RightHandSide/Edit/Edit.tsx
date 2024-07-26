
type Props = {
  show: boolean;
};

function Edit(props: Props) {
  const { show } = props;
  if (!show) {
    return null;
  }
  return <div>Hello Edit</div>;
}

export default Edit;
