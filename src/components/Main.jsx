import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { ProjectContext } from "./ProjectContext";
import Project from "./Project";
import Task from "./Task";
import axios from "axios";
import "./Main.css"; 
import REACT_BASE_URL from "../config";

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

  useEffect(() => {
    if (!selectedProject && projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  const fetchTasks = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${REACT_BASE_URL}/projects/${projectId}/tasks`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setTasks((prevTasks) => ({ ...prevTasks, [projectId]: response.data }));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteProject = async (projectToDelete) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${REACT_BASE_URL}/projects/${projectToDelete.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        const newProjects = projects.filter(
          (project) => project.id !== projectToDelete.id
        );
        setProjects(newProjects);
        if (selectedProject && selectedProject.id === projectToDelete.id) {
          setSelectedProject(newProjects.length > 0 ? newProjects[0] : null);
        }
      }
    } catch (error) {
      console.error(" Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  const addTask = async () => {
    if (!taskText.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${REACT_BASE_URL}/projects/${selectedProject.id}/tasks`,
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
      <Sidebar 
        setShowProjectForm={setShowProjectForm} 
        setSelectedProject={setSelectedProject} 
      />
      {showProjectForm ? (
        <Project 
          setProjects={setProjects} 
          setShowProjectForm={setShowProjectForm} 
          setSelectedProject={setSelectedProject}
        />
      ) : selectedProject ? (
        <div className="content">
          <button 
            className="delete-btn" 
            onClick={() => deleteProject(selectedProject)}
          >
            Delete
          </button>
          <h1>{selectedProject?.title}</h1>
          <p className="due-date">{selectedProject?.due_date}</p>
          <p className="description">{selectedProject?.description}</p>
          <div className="add-task-container">
            <input 
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Add new task..."
            />
            <button className="add-task" onClick={addTask}>Add Task</button>
          </div>
          {selectedProject && tasks[selectedProject.id] && tasks[selectedProject.id].length > 0 ? (
            <Task 
              tasks={tasks[selectedProject.id]} 
              selectedProject={selectedProject} 
              fetchTasks={fetchTasks} 
            />
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
