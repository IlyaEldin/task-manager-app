import { UserContext } from "../context/UserContext/UserContext";
import { useContext, useEffect, useState } from "react";

export const FORM_KEY = {
  title: "title",
  description: "description",
  priority: "priority",
  dueDate: "dueDate",
  tags: "tags",
  subtasks: "subtasks",
};

export function useFormTask() {
  const { formDataCache, setFormDataCache } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formDataCache));
  }, [formDataCache]);

  const [formData, setFormData] = useState({
    title: formDataCache.title,
    description: formDataCache.description,
    priority: "medium",
    dueDate: formDataCache.dueDate,
    tags: formDataCache.tags,
    subtasks: formDataCache.subtasks,
  });

  const resetForm = () => {
    setFormDataCache({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      tags: [],
      subtasks: [],
    });

    localStorage.setItem(
      "formData",
      JSON.stringify({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        tags: [],
        subtasks: [],
      })
    );
  };

  const changePointText = (point, value) => {
    setFormData((prev) => ({ ...prev, [point]: value }));
    setFormDataCache((prev) => ({ ...prev, [point]: value }));
  };

  const changePointArray = (point, value) => {
    if (point === FORM_KEY.subtasks) {
      const subtaskObj = {
        title: value,
        completed: false,
      };
      setFormData((prev) => ({
        ...prev,
        [point]: [...prev[point], subtaskObj],
      }));
      setFormDataCache((prev) => ({
        ...prev,
        [point]: [...prev[point], subtaskObj],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [point]: [...prev[point], value] }));
      setFormDataCache((prev) => ({
        ...prev,
        [point]: [...prev[point], value],
      }));
    }
  };

  const changeForm = (point, value) => {
    const textPoint = [
      FORM_KEY.title,
      FORM_KEY.description,
      FORM_KEY.priority,
      FORM_KEY.dueDate,
    ];
    const arrayPoint = [FORM_KEY.tags, FORM_KEY.subtasks];

    if (textPoint.includes(point)) {
      changePointText(point, value);
      return;
    }
    if (arrayPoint.includes(point)) {
      changePointArray(point, value);
      return;
    }

    return;
  };

  const deleteFromTheArray = (point, element) => {
    setFormData((prev) => ({
      ...prev,
      [point]: prev[point].filter((filter) => filter !== element),
    }));
    setFormDataCache((prev) => ({
      ...prev,
      [point]: prev[point].filter((filter) => filter !== element),
    }));
  };

  return { formData, setFormData, resetForm, changeForm, deleteFromTheArray };
}
