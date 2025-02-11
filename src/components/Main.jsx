import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { ProjectContext } from "./ProjectContext";
import Project from "./Project";
import Task from "./Task";
import axios from "axios";
import "./Main.css"; // Import the Main CSS

export default function Main() {
  const { projects, setProjects } = useContext(ProjectContext);
  const [tasks, setTasks] = useState({});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    if (selectedProject && selectedProject.id) {
      fetchTasks(selectedProject.id);
    }
  }, [selectedProject]);

  const fetchTasks = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/projects/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        let prevTasks = { ...tasks };
        prevTasks[projectId] = response.data;
        setTasks(prevTasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!taskText.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/projects/${selectedProject.id}/tasks`,
        { text: taskText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setTaskText(""); 
        fetchTasks(selectedProject.id); 
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="main-container">
      <Sidebar setShowProjectForm={setShowProjectForm} setSelectedProject={setSelectedProject} />
      {showProjectForm ? (
        <Project setProjects={setProjects} setShowProjectForm={setShowProjectForm} />
      ) : selectedProject ? (
        <div className="content">
          <h1>{selectedProject?.title}</h1>
          <p className="due-date">{selectedProject?.due_date}</p>
          <p className="description">{selectedProject?.description}</p>
          {selectedProject && tasks[selectedProject.id] ? (
            <div>
            <input 
            type = "text"
            value = {taskText}
            onChange = {(e) => setTaskText(e.target.value)}
            />
            <button onClick = {addTask}>Add Task</button>
            { tasks[selectedProject.id].length > 0 && 
                 <Task 
                 tasks={tasks[selectedProject.id]} 
                 selectedProject={selectedProject} 
                 fetchTasks={fetchTasks} 
               />
            }
           
            </div>
          ) : (
            <p>No tasks at this time</p>
          )}
        </div>
      ) : (
        <div className="content">
          <p>Select a project to see details</p>
        </div>
      )}
    </div>
  );
}
