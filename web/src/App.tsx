import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import TodoList from "./Pages/List/TodoList";

function App() {
  return (
    <div className="mainPage">
      <h1 style={{ fontWeight: "bold" }}>Task Management</h1>
      <TodoList />
    </div>
  );
}

export default App;
