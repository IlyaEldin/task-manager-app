import TasksList from "../Tasks/TasksList/TasksList";
import TasksModal from "../Tasks/TasksModal/TasksModal";
import TaskStatus from "../Tasks/TaskStatus/TaskStatus";
import classes from "./Home.module.css";
import { useTasksContext } from "../../context/TasksContext/TasksContext";

export default function Home() {
  const { isLoading, error } = useTasksContext();

  if (isLoading || error) {
    return <TaskStatus />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.hero}>
        <h1 className={classes.title}>Добро пожаловать в TaskManager</h1>
        <p className={classes.subtitle}>
          Простой и удобный менеджер задач для организации вашей работы
          <br /> Автор: Елдин Илья Михайлович
        </p>

        <div className={classes.features}>
          <div className={classes.feature}>
            <h3>Создавайте задачи</h3>
            <p>Добавляйте задачи с приоритетами, сроками и тегами</p>
          </div>

          <div className={classes.feature}>
            <h3>Отслеживайте прогресс</h3>
            <p>Отмечайте статус выполнения</p>
          </div>

          <div className={classes.feature}>
            <h3>Организуйте</h3>
            <p>Фильтруйте и сортируйте задачи по разным параметрам</p>
          </div>
        </div>
      </div>

      <div className={classes.tasksSection}>
        <h2 className={classes.sectionTitle}>Ваши задачи</h2>
        <TasksList />
      </div>

      <TasksModal />
    </div>
  );
}
