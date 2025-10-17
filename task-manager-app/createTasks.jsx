import axios from "axios";
import { API_CONFIG } from "./src/services/api-config";

const createSampleTasks = async (token, fetchTasks) => {
  const today = new Date();
  const getFutureDate = (days) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  const sampleTasks = [
    {
      title: "Завершить проект React",
      description: "Доделать основные компоненты и настроить роутинг",
      status: "in-progress",
      priority: "high",
      tags: ["react", "frontend", "важно"],
      subtasks: [
        { title: "Настроить React Router", completed: true },
        { title: "Стилизовать компоненты", completed: false },
        { title: "Добавить обработку ошибок", completed: false },
      ],
      dueDate: getFutureDate(7),
    },
    {
      title: "Изучить TypeScript",
      description: "Пройти курс по TypeScript для улучшения кода",
      status: "pending",
      priority: "medium",
      tags: ["typescript", "обучение"],
      subtasks: [
        { title: "Посмотреть видеоуроки", completed: false },
        { title: "Попрактиковаться на проекте", completed: false },
      ],
      dueDate: getFutureDate(14),
    },
    {
      title: "Создать REST API",
      description: "Разработать бэкенд для приложения задач",
      status: "pending",
      priority: "high",
      tags: ["backend", "nodejs", "api"],
      subtasks: [
        { title: "Настроить Express сервер", completed: true },
        { title: "Создать модели данных", completed: true },
        { title: "Реализовать эндпоинты", completed: false },
      ],
      dueDate: getFutureDate(3),
    },
    {
      title: "Оптимизировать производительность",
      description: "Улучшить скорость загрузки приложения",
      status: "completed",
      priority: "medium",
      tags: ["optimization", "performance"],
      subtasks: [
        { title: "Анализ текущей производительности", completed: true },
        { title: "Оптимизация изображений", completed: true },
        { title: "Ленивая загрузка компонентов", completed: true },
      ],
      dueDate: getFutureDate(-2),
    },
    {
      title: "Написать тесты",
      description: "Добавить unit и integration тесты",
      status: "in-progress",
      priority: "medium",
      tags: ["testing", "jest", "quality"],
      subtasks: [
        { title: "Настроить Jest", completed: true },
        { title: "Написать тесты для компонентов", completed: false },
        { title: "Протестировать API", completed: false },
      ],
      dueDate: getFutureDate(10),
    },
    {
      title: "Рефакторинг кода",
      description: "Улучшить архитектуру и читаемость кода",
      status: "pending",
      priority: "low",
      tags: ["refactoring", "clean-code"],
      subtasks: [
        { title: "Проанализировать текущий код", completed: false },
        { title: "Выделить повторяющиеся компоненты", completed: false },
      ],
      dueDate: getFutureDate(30),
    },
    {
      title: "Деплой приложения",
      description: "Развернуть приложение на продакшн сервере",
      status: "pending",
      priority: "high",
      tags: ["deployment", "production"],
      subtasks: [
        { title: "Выбрать хостинг", completed: false },
        { title: "Настроить CI/CD", completed: false },
        { title: "Задеплоить приложение", completed: false },
      ],
      dueDate: getFutureDate(5),
    },
    {
      title: "Документация проекта",
      description: "Написать документацию для разработчиков",
      status: "in-progress",
      priority: "low",
      tags: ["documentation", "readme"],
      subtasks: [
        { title: "Создать README.md", completed: true },
        { title: "Описать API endpoints", completed: false },
      ],
      dueDate: getFutureDate(2),
    },
    {
      title: "Интеграция с GitHub",
      description: "Настроить автоматические пулл-реквесты",
      status: "completed",
      priority: "medium",
      tags: ["github", "ci-cd"],
      subtasks: [
        { title: "Настроить webhooks", completed: true },
        { title: "Создать workflow", completed: true },
      ],
      dueDate: getFutureDate(-5),
    },
    {
      title: "Мобильная версия",
      description: "Адаптировать приложение для мобильных устройств",
      status: "pending",
      priority: "medium",
      tags: ["mobile", "responsive"],
      subtasks: [
        { title: "Протестировать на мобильных устройствах", completed: false },
        { title: "Оптимизировать интерфейс", completed: false },
      ],
      dueDate: getFutureDate(21),
    },
  ];

  const baseURL = API_CONFIG.BASE_URL;

  try {
    for (let i = 0; i < 10; i++) {
      const task = sampleTasks[i];

      await axios.post(`${baseURL}/tasks`, task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    fetchTasks();
    return true;
  } catch (error) {
    console.error("❌ Ошибка:", error.message);
    alert("Ошибка при создании задач");
    return false;
  }
};

export default createSampleTasks;
