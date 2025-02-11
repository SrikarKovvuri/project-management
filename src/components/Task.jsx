import React from "react";
import axios from "axios";

export default function Task({ tasks, selectedProject, fetchTasks }) {
    const handleClear = async (task_id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/projects/${selectedProject.id}/tasks/${task_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks(selectedProject.id); // Refresh task list after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <h3>Tasks</h3>
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <div key={task.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <li>{task.text}</li>
                            <button onClick={() => handleClear(task.id)}>Clear</button>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}
