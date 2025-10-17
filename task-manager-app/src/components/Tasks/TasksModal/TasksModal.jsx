import ModalAddTask from "../../ModalAddTask/ModalAddTask";
import ModalPortal from "../../ModalPortal/ModalPortal";
import TaskModal from "../../TaskModal/TaskModal";
import ModalStatus from "../../ModalStatus/ModalStatus";
import { useContext } from "react";
import { ModalContext } from "../../../context/ModalContext/ModalContext";
import { useTasksContext } from "../../../context/TasksContext/TasksContext";
import { SelectionContext } from "../../../context/SelectionContext/SelectionContext";

export default function TasksModal() {
  const { isModalOpen, activeTask, closeModal, openModal } =
    useContext(ModalContext);
  const { updateTask, deleteTask } = useTasksContext();
  const { resultSelectedDelete } = useContext(SelectionContext);

  return (
    <>
      {isModalOpen.updateStatus && (
        <ModalPortal>
          <ModalAddTask
            onClose={() => {
              closeModal("updateStatus");
              openModal("editStatus");
            }}
            task={activeTask}
            type='edit'
            updateTask={updateTask}
          />
        </ModalPortal>
      )}

      {isModalOpen.taskStatus && (
        <ModalPortal>
          <TaskModal
            task={activeTask}
            onClose={() => closeModal("taskStatus")}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </ModalPortal>
      )}

      {isModalOpen.editStatus && (
        <ModalPortal>
          <ModalStatus>
            {resultSelectedDelete
              ? "Задачи удалены"
              : "Задача успешно отредактирована"}
          </ModalStatus>
        </ModalPortal>
      )}
    </>
  );
}
