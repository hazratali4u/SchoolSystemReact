import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AllStudents from "./pages/AllStudents";
import './App.css';

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="main">
        <Header />
        <Routes>
          <Route path="/students" element={<AllStudents />} />
        </Routes>
      </div>      
    </Router>
  );
}

export default App;
