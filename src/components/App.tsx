import Header from "./Header";
import Input from "./Input";
import Output from "./Output";
import { Context } from "./Context";
import { useContext } from "react";
import VariableForm from "./Placeholders/VariableForm";

const App = () => {
  const context = useContext(Context);

  return (
    <div className={`app app--${context.mode}`}>
      <Header />
      <div className="app__main">
        <Input />
        <Output />
        <VariableForm />
  
      </div>
    </div>
  );
};

export default App;
