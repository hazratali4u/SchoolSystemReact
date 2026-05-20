import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AllStudents from "./pages/AllStudents";
import AddStudent from "./pages/AddStudent";
import { API_BASE_URL, fallbackMenus, normalizeMenu } from "./menuConfig";
import './App.css';

const pageComponents = {
  AllStudents,
  AddStudent
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menus, setMenus] = useState(fallbackMenus);
  const [menuError, setMenuError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/menus`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to load menu");
        }

        return res.json();
      })
      .then((data) => {
        const apiMenus = Array.isArray(data)
          ? data.map(normalizeMenu).filter((menu) => menu.id && menu.name && menu.path)
          : [];

        if (apiMenus.length > 0) {
          setMenus(apiMenus);
        }
        setMenuError("");
      })
      .catch((err) => {
        setMenuError(err.message);
        setMenus(fallbackMenus);
      });
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((isOpen) => !isOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const defaultPath = menus[0]?.path || "/students";
  const menuRoutes = menus.filter((menu) => pageComponents[menu.name]);

  return (
    <Router>
      <Sidebar
        isOpen={sidebarOpen}
        menus={menus}
        menuError={menuError}
        onNavigate={closeSidebar}
      />
      <div className="main">
        <Routes>
          <Route path="/" element={<Navigate to={defaultPath} replace />} />
          {menuRoutes.map((menu) => {
            const Page = pageComponents[menu.name];

            return (
              <Route
                key={menu.id}
                path={menu.path}
                element={<Page onToggleSidebar={toggleSidebar} />}
              />
            );
          })}
          <Route path="*" element={<Navigate to={defaultPath} replace />} />
        </Routes>
      </div>      
    </Router>
  );
}

export default App;
