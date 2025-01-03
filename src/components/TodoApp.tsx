import { useState } from "react";

interface Todo {
  task: string;
  completed: boolean;
}

const TodoApp = () => {
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
    <div className="container">
      <div className="flex items-center justify-center h-screen">
        <div className="rounded-lg p-4 bg-white w-full max-w-[700px] flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-center">Todo List App</h1>
          <div className="relative">
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Add a new todo"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTaskChange()} // Add task on Enter
            />
            <button
              onClick={handleTaskChange}
              type="button"
              className="absolute right-0 bg-blue-400 h-full w-[100px] text-white rounded-r-md"
            >
              Add Task
            </button>
          </div>
          <div className="max-h-[300px] overflow-auto relative">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 sticky top-0">
                  <th className="p-2 border border-gray-300 text-left w-[0.5fr]">
                    #
                  </th>
                  <th className="p-2 border border-gray-300 text-left w-[2fr]">
                    <div className="flex items-center gap-2">
                      {todos?.length !== 0 && (
                        <input
                          type="checkbox"
                          className="border border-gray-300 h-4 w-4"
                          checked={todos.every((todo) => todo.completed)}
                          onChange={handleCompletedAllTask}
                        />
                      )}
                      <span>Tasks</span>
                    </div>
                  </th>
                  <th className="p-2 border border-gray-300 text-left w-[2fr]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-gray-300">{index + 1}</td>
                    <td className="p-2 border border-gray-300">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          className="focus:outline-none w-full max-w-[99px]"
                          value={editedTask}
                          onChange={(e) => setEditedTask(e.target.value)}
                          onKeyDown={(e) => handleEditKeyPress(e, index)} // Save on Enter
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="border border-gray-300 h-4 w-4"
                            checked={todo.completed}
                            onChange={() => handleCompletedTask(index)}
                          />
                          <span
                            className={todo.completed ? "line-through" : ""}
                          >
                            {todo.task}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <button
                        onClick={
                          editingIndex === index
                            ? () => handleEditSave(index)
                            : () => handleEditClick(index)
                        }
                        className={`px-2 py-1 rounded text-white ${
                          editingIndex === index
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      >
                        <span
                          className={`mdi mdi-${
                            editingIndex === index
                              ? "content-save"
                              : "square-edit-outline"
                          } text-white`}
                        ></span>
                      </button>
                      <button
                        onClick={() => handleTaskDelete(index)}
                        className="px-2 py-1 ml-2 text-white bg-red-500 rounded"
                      >
                        <span className="mdi mdi-trash-can-outline text-white"></span>
                      </button>
                    </td>
                  </tr>
                ))}

                {todos.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      <div className="text-gray-500 capitalize">
                        No todos found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
