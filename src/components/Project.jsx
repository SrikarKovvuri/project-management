import React, { useState, useContext } from "react";
import axios from "axios";
import "./Project.css"; 
import REACT_BASE_URL from "../config";

export default function Project({ setProjects, setShowProjectForm, setSelectedProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${REACT_BASE_URL}/projects`,
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
        setSelectedProject(newProject); 
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
