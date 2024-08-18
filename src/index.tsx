import { createRoot } from "react-dom/client";
import App from "./views/App";
import { ContextProvider } from "./store/Context";

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
