import React, { useState, useEffect } from "react";
import { Circle, CheckCircle, Trash2, ChevronRight } from "lucide-react";

function Hero() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks when the component mounts

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      console.log("Response:", response);
      const data = await response.json();
      console.log("Data:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]);
      setNewTask({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleCompletion = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    // Additional logic to update backend data
  };

  const handleDeleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    // Additional logic to delete task from the backend
  };

  return (
    <div className="hero dark">
      <div className="flex flex-col min-h-screen dark:bg-[#35374B] dark:text-white">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 dark:border-gray-700">
          <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <button
              className="rounded-full ml-auto"
              onClick={() => console.log("User menu clicked")}
            >
              <img
                alt="Avatar"
                className="w-12 h-12 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <span className="sr-only">Toggle user menu</span>
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">Tasks</h1>
              <button
                onClick={handleAddTask}
                className="dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white px-4 py-2 rounded-md border-2 border-gray-800"
              >
                New Task
              </button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="Buy groceries"
                    required
                    className="dark:bg-gray-800 dark:text-white p-2 rounded-md border-2 border-gray-700"
                  />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    placeholder="Milk, eggs, and bread."
                    required
                    className="dark:bg-gray-800 dark:text-white p-5 rounded-md border-2 border-gray-700"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white px-4 py-2 rounded-md border-2 border-gray-800"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </form>
            <div className="grid gap-4">
              {tasks.map((task, index) => (
                <div key={index} className="grid gap-1">
                  <div className="flex items-center gap-4">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <div
                      className={`font-semibold ${
                        task.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : ""
                      }`}
                    >
                      {task.title}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleCompletion(index)}
                        className="dark:text-gray-0"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="sr-only">Mark as completed</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className="dark:text-gray-900"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className={`text-sm ${
                      task.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : ""
                    }`}
                  >
                    {task.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Hero;
