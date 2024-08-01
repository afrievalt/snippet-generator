import Header from "./Header";
import Input from "./Input";
import { RightHandSide } from "./RightHandSide/RightHandSide";

const App = () => {
  return (
    <div className={`app app--vscode`}>
      <Header />
      <div className="app__main">
        <Input />
        <RightHandSide />
      </div>
    </div>
  );
};

export default App;
