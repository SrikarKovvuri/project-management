import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:5000/projects", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [projects]);

    return (
        <ProjectContext.Provider value={{ projects, setProjects, tasks, setTasks }}>
            {children}
        </ProjectContext.Provider>
    );
}
