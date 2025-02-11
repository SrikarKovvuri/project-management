import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState({});

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("⚠️ No token found in localStorage.");
        return;
      }

      console.log("🛠️ Fetching Projects with Token:", token);

      const response = await axios.get("http://localhost:5000/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
      });

      if (response.status === 200) {
        setProjects(response.data); 
      }
    } catch (error) {
      console.error(" Error fetching projects:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, tasks, setTasks, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}
