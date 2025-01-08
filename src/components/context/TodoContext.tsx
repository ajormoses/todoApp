import React, { createContext, useState } from "react";

interface Todo {
  task: string;
  completed: boolean;
}

const TodoContext = createContext<any | undefined>(undefined);

export const TodoProvider = ({ children }: any) => {
  const [task, setTask] = useState<string>(""); // State for the task input
  const [todos, setTodos] = useState<Todo[]>([]); // State for the todos array
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which task is being edited
  const [editedTask, setEditedTask] = useState<string>(""); // Temporary state for editing task

  const handleTaskChange = () => {
    if (task.trim() === "") {
      return; // Don't add empty tasks
    }
    setTodos([...todos, { task, completed: false }]); // Add the new task to the todos array
    setTask(""); // Clear the input field
  };

  const handleTaskDelete = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index); // Remove the task at the given index
    setTodos(newTodos);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index); // Set the task to be edited
    setEditedTask(todos[index].task); // Pre-fill the input with the current task text
  };

  const handleCompletedTask = (index: number) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const handleCompletedAllTask = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    const newTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));
    setTodos(newTodos);
  };

  const handleEditSave = (index: number) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        todo.task = editedTask; // Update the task with the edited value
      }
      return todo;
    });
    setTodos(newTodos);
    setEditingIndex(null); // Exit edit mode
  };

  const handleEditKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      handleEditSave(index); // Save changes on pressing Enter
    }
  };

  return (
    <TodoContext.Provider
      value={{
        task,
        setTask,
        todos,
        setTodos,
        editingIndex,
        setEditingIndex,
        editedTask,
        setEditedTask,
        handleTaskChange,
        handleTaskDelete,
        handleEditClick,
        handleCompletedTask,
        handleCompletedAllTask,
        handleEditSave,
        handleEditKeyPress,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
