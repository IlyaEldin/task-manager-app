import { createPortal } from "react-dom";

export default function ModalPortal({ children }) {
  return <div>{createPortal(<div>{children}</div>, document.body)}</div>;
}
