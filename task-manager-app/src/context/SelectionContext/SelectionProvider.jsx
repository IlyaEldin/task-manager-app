import { useState, useEffect } from "react";
import { SelectionContext } from "./SelectionContext";

export function SelectionProvider({ children }) {
  const [selectStatus, setSelectStatus] = useState(false);
  const [selected, setSelected] = useState([]);
  const [resultSelectedDelete, setResultSelectedDelete] = useState(false);

  useEffect(() => {
    if (resultSelectedDelete) {
      const timer = setTimeout(() => {
        setResultSelectedDelete(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [resultSelectedDelete, selectStatus]);

  const value = {
    selectStatus,
    setSelectStatus,
    selected,
    setSelected,
    resultSelectedDelete,
    setResultSelectedDelete,
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}
