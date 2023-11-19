// YourContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface YourContextProps {
  children: ReactNode;
}

interface YourContextType {
  yourState: string;
  setYourState: React.Dispatch<React.SetStateAction<string>>;
}

const YourContext = createContext<YourContextType | undefined>(undefined);

export const YourContextProvider: React.FC<YourContextProps> = ({
  children,
}) => {
  const [yourState, setYourState] = useState("initialValue");

  return (
    <YourContext.Provider value={{ yourState, setYourState }}>
      {children}
    </YourContext.Provider>
  );
};

export const useYourContext = (): YourContextType => {
  const context = useContext(YourContext);
  if (!context) {
    throw new Error("useYourContext must be used within a YourContextProvider");
  }
  return context;
};
