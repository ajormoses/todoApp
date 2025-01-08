import "./assets/tailwind.css";
import "@mdi/font/css/materialdesignicons.css";
import TodoApp from "./components/TodoApp";
import { TodoProvider } from "./components/context/TodoContext";

function App() {
  return (
    <>
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    </>
  );
}

export default App;
