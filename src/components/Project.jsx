import React, { useState, useContext } from "react";
import axios from "axios";
import { ProjectContext } from "./ProjectContext";
import "./Project.css"; // Your styling file for the project form

export default function Project({ setProjects, setShowProjectForm, setSelectedProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/projects",
        { title, description, due_date: dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        const newProject = response.data;
        setProjects((prevProjects) => [newProject, ...prevProjects]);
        setSelectedProject(newProject); // Immediately select the new project
        setShowProjectForm(false);
      }
    } catch (error) {
      console.error("Error creating project:", error.response?.data || error.message);
    }
  };

  return (
    <div className="project-form-container">
      <form onSubmit={handleSubmit}>
        <label>Project Title</label>
        <input
          name="title"
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <input
          name="description"
          required
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Due Date</label>
        <input
          name="dueDate"
          required
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
