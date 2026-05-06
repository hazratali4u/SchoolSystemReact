import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AllStudents from "./pages/AllStudents";
import AddStudent from "./pages/AddStudent";
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((isOpen) => !isOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Sidebar isOpen={sidebarOpen} onNavigate={closeSidebar} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/students" replace />} />
          <Route path="/students" element={<AllStudents onToggleSidebar={toggleSidebar} />} />
          <Route path="/add-student" element={<AddStudent onToggleSidebar={toggleSidebar} />} />
          <Route path="*" element={<Navigate to="/students" replace />} />
        </Routes>
      </div>      
    </Router>
  );
}

export default App;
