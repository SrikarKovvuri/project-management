import React from "react";
export default function Task( { tasks }) {
    
    return (
        <div>
            <h3>Tasks</h3>
            {tasks.length == 0 ? (
                <p>No tasks available</p>
            ): (
                <ul>
                    {tasks.map((task) => (
                        <li key = {task.id}>{task.text}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}