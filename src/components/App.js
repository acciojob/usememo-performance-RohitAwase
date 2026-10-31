import React, { useState, useMemo } from "react";
import "./../styles/App.css";

// Generate 50 initial tasks
function generateTasks() {
  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Task ${index + 1}`,
    completed: index < 25,
  }));
}

// Artificially slow down computation
function slowDown() {
  const start = performance.now();

  while (performance.now() - start < 500) {
    // Simulate expensive computation
  }
}

function App() {
  const [tasks] = useState(generateTasks);
  const [activeTab, setActiveTab] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // Filter tasks only when tasks or activeTab changes
  const filteredTasks = useMemo(() => {
    console.log("Filtering tasks...");

    slowDown();

    if (activeTab === "Active") {
      return tasks.filter((task) => !task.completed);
    }

    if (activeTab === "Completed") {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, activeTab]);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        <div className="header">
          <h1>My Todo List</h1>

          <button
            className="theme-btn"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="filters">
          {["All", "Active", "Completed"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "selected" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => (
            <div className="task" key={task.id}>
              <span>{task.title}</span>

              <span className={task.completed ? "completed" : "active"}>
                {task.completed ? "Completed" : "Active"}
              </span>
            </div>
          ))}
        </div>

        <p className="count">
          Showing {filteredTasks.length} tasks
        </p>
      </div>
    </div>
  );
}

export default App;
