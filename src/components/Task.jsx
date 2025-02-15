import React from "react";
import axios from "axios";
import "./Task.css";  

export default function Task({ tasks, selectedProject, fetchTasks }) {
  const handleClear = async (task_id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${REACT_BASE_URL}/tasks/${task_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(selectedProject.id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="task-container">
      <h3>Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.text}</span>
              <button 
                className="task-clear-btn"
                onClick={() => handleClear(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
