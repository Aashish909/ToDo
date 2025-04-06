import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./comoponents/Navbar"; // ✅ fixed path
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

 useEffect(() => {
   const todoString = localStorage.getItem("todos");
   if (todoString) {
     setTodos(JSON.parse(todoString));
   }
 }, []);

 const saveToLS = (todosToSave) => {
   localStorage.setItem("todos", JSON.stringify(todosToSave));
 };

 const handleAdd = () => {
   if (!todo.trim()) return;
   const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
   setTodos(newTodos);
   saveToLS(newTodos);
   setTodo("");
 };

 const handleEdit = (e, id) => {
   const updateTodo = todos.find((item) => item.id === id);
   if (updateTodo) setTodo(updateTodo.todo);
   const updatedTodos = todos.filter((item) => item.id !== id);
   setTodos(updatedTodos);
   saveToLS(updatedTodos);
 };

 const handleDelete = (e, id) => {
   const confirmDelete = window.confirm("Are you sure?");
   if (confirmDelete) {
     const updatedTodos = todos.filter((item) => item.id !== id);
     setTodos(updatedTodos);
     saveToLS(updatedTodos);
   }
 };

 const handleChange = (e) => setTodo(e.target.value);

 const handleCheckbox = (e) => {
   const id = e.target.name;
   const updatedTodos = todos.map((item) =>
     item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
   );
   setTodos(updatedTodos);
   saveToLS(updatedTodos);
 };


  // const saveToLocalStorage = (params) => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // };

  // useEffect(() => {
  //   const todoString = localStorage.getItem("todos");
  //   if (todoString) {
  //     setTodos(JSON.parse(todoString));
  //   }
  // }, []);

  // useEffect(() => {
  //   saveToLocalStorage(todos);
  // }, [todos]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-200 px-10 min-h-[90vh] w-1/2">
        <div className="addTodo my-5">
          <h1 className="text-lg font-bold">Add a Task</h1>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-145 border border-gray-400 rounded-md px-2 py-1"
            placeholder="Enter your task..."
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 p-2 py-1 rounded-md text-white mx-6"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-semibold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="flex justify-center items-center text-gray-600 mt-5 text-lg">
              No tasks to display
            </div>
          )}

          {todos.map((item) => (
            <div
              key={item.id}
              className="todo flex w-full my-3 justify-between"
            >
              <div className="flex gap-5">
                <input
                  name={item.id}
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={handleCheckbox}
                />
                <div className= {item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full ">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 p-2 py-1 rounded-md text-white mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-red-500 hover:bg-red-600 p-2 py-1 rounded-md text-white mx-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
