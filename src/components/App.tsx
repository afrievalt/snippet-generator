import Header from "./Header";
import Input from "./Input";
import { Context } from "./Context";
import { useContext } from "react";
import VariableForm from "./Placeholders/VariableForm";
import { RightHandSide } from "./RightHandSide/RightHandSide";

const App = () => {
  const context = useContext(Context);

  return (
    <div className={`app app--${context.mode}`}>
      <Header />
      <div className="app__main">
        <Input />
        <RightHandSide />
        <VariableForm />
  
      </div>
    </div>
  );
};

export default App;
