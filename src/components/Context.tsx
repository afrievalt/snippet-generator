import React, { createContext, useEffect, useState } from "react";

export type Mode = "vscode" | "sublimetext" | "atom" | "edit" | "placeholder";

export interface Placeholder {
  value: string;
  description: string;
}

export interface MyContext {
  description: string;
  tabTrigger: string;
  snippet: string;
  mode: Mode;
  insertVarValue: string;
  replaceVarValue: Placeholder;
  variable: string;
  modalIndex: number;
  setModalIndex: React.Dispatch<React.SetStateAction<number>>;
  setVariable: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTabTrigger: React.Dispatch<React.SetStateAction<string>>;
  setSnippet: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  placeholder$: Placeholder[];
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
  replaceVarValue: {value:"",description:""},
  variable: "",
  setVariable: () => {},
  modalIndex: 1,
  setModalIndex: () => {},
  placeholder$: [],
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
  const [replaceVarIndex, setReplaceVarIndex] = useState(1);
  const [variable, setVariable] = useState("");
  const [modalIndex, setModalIndex] = useState(0);

  const [placeholder$, setPlaceholder$] = useState([
    {value: "${1:example}", description: ""},
    {value: "${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/g}", description: ""},
  ]);
  console.log(setPlaceholder$, setReplaceVarIndex)

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
      `${location.pathname}?${shareUrl.searchParams}`
    );
  }, [description, tabTrigger, snippet, mode]);
  const insertVarValue = `$${variable}`; // var$[insertVarIndex]
  const replaceVarValue = placeholder$[replaceVarIndex];
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
        variable,
        setVariable,
        modalIndex,
        setModalIndex,
        placeholder$,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
