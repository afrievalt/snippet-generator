import React, { createContext, useEffect, useState } from "react";

export type Mode = "vscode" | "sublimetext" | "atom";

export interface MyContext {
  description: string;
  tabTrigger: string;
  snippet: string;
  mode: Mode;
  insertVarValue: string;
  replaceVarValue: string;
  variable: string, 
  setVariable: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTabTrigger: React.Dispatch<React.SetStateAction<string>>;
  setSnippet: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const Context = createContext<MyContext>({
  description: "",
  setDescription: () => {},
  tabTrigger: "",
  setTabTrigger: () => {},
  snippet: "",
  setSnippet: () => {},
  mode: "vscode",
  setMode: () => {},
  insertVarValue: "",
  replaceVarValue: "",
  variable: "",
  setVariable: () => {},
  

});

const url = new URL(window.location.href);
const urlDescription = url.searchParams.get("description") || "";
const urlTabtrigger = url.searchParams.get("tabtrigger") || "";
const urlSnippet = url.searchParams.get("snippet") || "";
const urlMode = url.searchParams.get("mode") || "vscode";

interface ProviderProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: ProviderProps) => {
  const [description, setDescription] = useState(urlDescription);
  const [tabTrigger, setTabTrigger] = useState(urlTabtrigger);
  const [snippet, setSnippet] = useState(urlSnippet);
  const [mode, setMode] = useState<Mode>(urlMode as Mode);
  const [ insertVarIndex, setInsertVarIndex ] = useState(0)
  const [ replaceVarIndex, setReplaceVarIndex ] = useState(1)
  const [ variable, setVariable ] = useState("")
  
  const [ var$, setVar$ ] = useState(["${1:example}", "${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/g}"])  

  useEffect(() => {
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set("description", description);
    shareUrl.searchParams.set("tabtrigger", tabTrigger);
    shareUrl.searchParams.set("snippet", snippet);
    shareUrl.searchParams.set("mode", mode);

    history.pushState(
      {
        description,
        tabTrigger,
        snippet,
        mode,
      },
      document.title,
      `${location.pathname}?${shareUrl.searchParams}`,
    );
  }, [description, tabTrigger, snippet, mode]);
  const insertVarValue = `$${variable}` // var$[insertVarIndex]
  const replaceVarValue = var$[replaceVarIndex]
  return (
    <Context.Provider
      value={{
        description,
        setDescription,
        tabTrigger,
        setTabTrigger,
        snippet,
        setSnippet,
        mode,
        setMode,
        insertVarValue,
        replaceVarValue,
        variable, setVariable
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
