import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mainPage">
      <h1 style={{ fontWeight: "bold" }}>Task Management</h1>
      <TodoList />
    </div>
  );
}

export default App;
