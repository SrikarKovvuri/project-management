
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  
  return (
    <Router>
      <Routes>
        <Route path = "/signup" element = {<Signup/>} />
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/" element = {isAuthenticated ? <Main/> : <Navigate to = "/Signup"/>} />
      </Routes>
    </Router>
  );
}

export default App;
