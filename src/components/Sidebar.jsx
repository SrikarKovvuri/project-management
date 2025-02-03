import React from "react";

export default function Sidebar({ projects }) {
  return (
    <div className="sidebar">
      <h2>Projects</h2>
      {projects.length === 0 ? (
        <p>No Projects created</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
