import React from "react";
import Sidebar from "./Sidebar";
export default function Main() {
    const [projects, setProjects] = useState([]); 
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
    return (
        <Sidebar projects = {projects}/>
    )
}