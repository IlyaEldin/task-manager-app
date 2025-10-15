import { Outlet } from "react-router-dom";
import NavigationMenu from "../NavigationMenu/NavigationMenu.jsx";
import Header from "../Header/Header";
import classes from "./Layout.module.css";

export default function Layout({ searchEnabled }) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header searchEnabled={searchEnabled} />
      </div>
      <div className={classes.sidebar}>
        <NavigationMenu />
      </div>
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
}
