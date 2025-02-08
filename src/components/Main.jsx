import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { ProjectContext } from "./ProjectContext";
import Project from "./Project";
import Task from "./Task";
import axios from "axios";

export default function Main() {
    const { projects, setProjects } = useContext(ProjectContext); 
    const [tasks, setTasks] = useState({});
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // ✅ Prevents fetching tasks when selectedProject is null
    useEffect(() => {
        if (selectedProject && selectedProject.id) {
            fetchTasks(selectedProject.id);
        }
    }, [selectedProject]);  // ✅ Ensures selectedProject exists

    const fetchTasks = async (projectId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:5000/projects/${projectId}/tasks`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                let prevTasks = { ...tasks };  // ✅ Treating `tasks` as an object
                prevTasks[projectId] = response.data;
                setTasks(prevTasks);  // ✅ Updates tasks properly
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    return (
        <div className="main-container">
            <Sidebar setShowProjectForm={setShowProjectForm} setSelectedProject={setSelectedProject} />

            {showProjectForm ? (
                <Project setProjects={setProjects} setShowProjectForm={setShowProjectForm} />
            ) : (
                selectedProject ? (
                    <div className="content">
                        <h1>{selectedProject?.title}</h1>
                        <h2>{selectedProject?.description}</h2>
                        <h2>{selectedProject?.due_date}</h2>

                        {/* ✅ Safe check for tasks */}
                        {selectedProject && tasks[selectedProject.id] && tasks[selectedProject.id].length > 0 ? (
                            <Task tasks={tasks[selectedProject.id]} />
                        ) : (
                            <p>No tasks at this time</p>
                        )}
                    </div>
                ) : (
                    <div className="content">
                        <p>Select a project to see details</p>
                    </div>
                )
            )}
        </div>
    );
}
