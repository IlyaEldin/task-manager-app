import classes from "./ModalStatus.module.css";

export default function ModalStatus({ children }) {
  return (
    <div className={classes.container}>
      <div>{children}</div>
    </div>
  );
}
