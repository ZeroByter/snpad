import { useState, createContext, useContext, FC, ReactElement } from "react";
import { useEffect } from "react";

type ProviderProps = {
  children: ReactElement;
};

type Context = {
  title: string;
  setTitle: (newTitle: string) => void;

  titleHint: string;
  setTitleHint: (newTitleHint: string) => void;

  text: string;
  setText: (newText: string) => void;

  password: string;
  setPassword: (newPassword: string) => void;
};

export const ViewTextContext = createContext({} as Context);

const ViewTextProvider: FC<ProviderProps> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [titleHint, setTitleHint] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const contextData = {
    title,
    setTitle,
    titleHint,
    setTitleHint,
    text,
    setText,
    password,
    setPassword,
  };

  return (
    <ViewTextContext.Provider value={contextData}>
      {children}
    </ViewTextContext.Provider>
  );
};

export default ViewTextProvider;

export const useViewText = () => {
  return useContext(ViewTextContext);
};
