import classes from "./NavigationMenu.module.css";
import UserNavLink from "./UserNavLink";

export default function NavigationMenu() {
  return (
    <div className={classes.container}>
      <UserNavLink to={"/home"}>
        <img src='./icons/home.svg' alt='' />
        Главная
      </UserNavLink>
      <UserNavLink to={"/tasks"}>
        <img src='./icons/tasks.svg' alt='' />
        Задачи
      </UserNavLink>
      <UserNavLink to={"/settings"}>
        <img src='./icons/settings.svg' alt='' />
        Настройки
      </UserNavLink>
    </div>
  );
}
