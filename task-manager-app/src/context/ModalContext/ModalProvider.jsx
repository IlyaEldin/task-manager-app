import { ModalContext } from "./ModalContext";
import useModal from "../../hooks/useModal.js";

export const ModalProvider = ({ children }) => {
  const modalState = useModal();

  return (
    <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>
  );
};
