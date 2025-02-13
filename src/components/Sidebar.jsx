import React, { useContext } from "react";
import { ProjectContext } from "./ProjectContext";
import "./Sidebar.css"; 

export default function Sidebar({ setShowProjectForm, setSelectedProject }) {
  const { projects } = useContext(ProjectContext);
  return (
    <div className="sidebar">
      <button onClick={() => setShowProjectForm(true)}>+ Add Project</button>
      <h2>Projects</h2>
      {projects.length === 0 ? (
        <p>No Projects created</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id} onClick={() => setSelectedProject(project)}>
              {project.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
