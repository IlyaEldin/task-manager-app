import { NavLink } from "react-router-dom";
import classes from "./UserNavLink.module.css";

export default function UserNavLink({ children, ...props }) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive ? `${classes.link} ${classes.active}` : classes.link
      }
    >
      {children}
    </NavLink>
  );
}
