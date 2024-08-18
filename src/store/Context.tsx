import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type Mode = "vscode" | "sublimetext" | "atom" | "edit" | "placeholder";

export interface Placeholder {
  value: string;
  description: string;
  id: string;
}

export interface MyContext {
  description: string;
  tabTrigger: string;
  snippet: string;
  mode: Mode;
  variable: string;
  modalIndex: number;
  currentPlaceholder: Placeholder;
  placeholderIndex: number;
  setModalIndex: React.Dispatch<React.SetStateAction<number>>;
  setVariable: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTabTrigger: React.Dispatch<React.SetStateAction<string>>;
  setSnippet: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setCurrentPlaceholder: React.Dispatch<React.SetStateAction<Placeholder>>;
  setPlaceholderIndex: React.Dispatch<React.SetStateAction<number>>;
  placeholder$: Placeholder[];
  upsertPlaceholder: (p: Placeholder) => void;
  removePlaceholder: (p: Placeholder) => void;
}

const Context = createContext<MyContext>({
  placeholderIndex: 0,
  description: "",
  setDescription: () => {},
  tabTrigger: "",
  setTabTrigger: () => {},
  snippet: "",
  setSnippet: () => {},
  mode: "vscode",
  setMode: () => {},
  variable: "",
  setVariable: () => {},
  modalIndex: 1,
  setModalIndex: () => {},
  placeholder$: [],
  currentPlaceholder: { value: "", id: "", description: "" },
  setCurrentPlaceholder: () => {},
  upsertPlaceholder: () => {},
  removePlaceholder: () => {},
  setPlaceholderIndex: () => {},
});

const url = new URL(window.location.href);
const urlDescription = url.searchParams.get("description") || "";
const urlTabtrigger = url.searchParams.get("tabtrigger") || "";
const urlSnippet = url.searchParams.get("snippet") || "";
const urlMode = url.searchParams.get("mode") || "vscode";

interface ProviderProps {
  children: React.ReactNode;
}

const defaultPlaceholder$ = [
  {
    value: "${1:example}",
    description: "",
    id: "b68a66f9-2d36-4e03-9429-fef335e0c525",
  },
  {
    value: "${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/g}",
    description: "",
    id: "76301f30-7c44-4563-ac38-58be668b3acf",
  },
];

const ContextProvider = ({ children }: ProviderProps) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(1);
  const [description, setDescription] = useState(urlDescription);
  const [tabTrigger, setTabTrigger] = useState(urlTabtrigger);
  const [snippet, setSnippet] = useState(urlSnippet);
  const [mode, setMode] = useState<Mode>(urlMode as Mode);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    defaultPlaceholder$[0]
  );
  const [variable, setVariable] = useState("");
  const [modalIndex, setModalIndex] = useState(0);
  const [placeholder$, setPlaceholder$] = useLocalStorage(
    "placeholders",
    defaultPlaceholder$
  );
  // todo: rename to upsertPlaceholder
  const upsertPlaceholder = (placeholder: Placeholder) => {
    const i = placeholder$.findIndex((v) => v.id === placeholder.id);
    if (i === -1) {
      setPlaceholder$([...placeholder$, placeholder]);
    } else {
      const copy = [...placeholder$];
      copy[i] = placeholder;
      setPlaceholder$(copy);
      setCurrentPlaceholder(copy[i]);
    }
  };
  const removePlaceholder = (placeholder: Placeholder) => {
    const filtered = placeholder$.filter((v) => v.id !== placeholder.id);
    setPlaceholder$(filtered);
  };
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
        variable,
        setVariable,
        modalIndex,
        setModalIndex,
        placeholder$,
        currentPlaceholder,
        setCurrentPlaceholder,
        upsertPlaceholder,
        removePlaceholder,
        placeholderIndex,
        setPlaceholderIndex,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
