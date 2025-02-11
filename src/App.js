
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
import { ProjectProvider } from "./components/ProjectContext";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  
  return (
    <ProjectProvider>
    <Router>
      <Routes>
        <Route path = "/signup" element = {<Signup/>} />
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/" element = {isAuthenticated ? <Main/> : <Navigate to = "/Signup"/>} />
      </Routes>
    </Router>
    </ProjectProvider>
  );
}

export default App;
