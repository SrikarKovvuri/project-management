import React, { useState } from "react";
import axios from "axios";

export default function Project({ setProjects, setShowProjectForm}) {
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setProjects((prevProjects) => [response.data, ...prevProjects]); 
        setShowProjectForm(false);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
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
