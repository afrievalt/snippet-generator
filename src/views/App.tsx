import Header from "./Header";
import LeftHandSide from "./LeftHandSide/LeftHandSide";
import { RightHandSide } from "./RightHandSide/RightHandSide";

const App = () => {
  return (
    <div className={`app app--vscode`}>
      <Header />
      <div className="app__main">
        <LeftHandSide />
        <RightHandSide />
      </div>
    </div>
  );
};

export default App;
