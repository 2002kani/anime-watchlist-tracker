import { createContext } from "react";
import { SavedCardContextType } from "../types";

export const savedCardContext = createContext<SavedCardContextType>({
    savedCard: [],
    setSavedCard: () => {},
});