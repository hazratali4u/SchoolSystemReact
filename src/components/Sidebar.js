import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const fallbackMenus = [
  { id: 1, name: "AllStudents", path: "/students" },
  { id: 2, name: "AddStudent", path: "/add-student" }
];

const normalizeMenu = (menu) => ({
  id: menu.id ?? menu.Id,
  name: menu.name ?? menu.Name,
  path: menu.path ?? menu.Path
});

const formatMenuName = (name) =>
  String(name || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();

function Sidebar({ isOpen, onNavigate }) {
  const [openMenu, setOpenMenu] = useState("students");
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

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <h3>School Soft</h3>

      <div className="menu-item">Dashboard</div>

      <div
        className={`menu-item has-child ${openMenu === "students" ? "open" : ""}`}
        onClick={() => toggleMenu("students")}
      >
        <span>Students</span>
        <span className="arrow">&gt;</span>
      </div>

      {openMenu === "students" && (
        <div className="submenu">
          {menus.map((menu) => (
            <NavLink
              key={menu.id}
              to={menu.path}
              className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
              onClick={onNavigate}
            >
              {formatMenuName(menu.name)}
            </NavLink>
          ))}
        </div>
      )}

      {menuError && <div className="menu-error">Menu loaded from default list</div>}

      <div
        className={`menu-item has-child ${openMenu === "attendance" ? "open" : ""}`}
        onClick={() => toggleMenu("attendance")}
      >
        <span>Attendance</span>
        <span className="arrow">&gt;</span>
      </div>

      {openMenu === "attendance" && (
        <div className="submenu">
          <div className="menu-item">Mark Attendance</div>
          <div className="menu-item">Reports</div>
        </div>
      )}

      <div className="menu-item">SMS</div>
    </div>
  );
}

export default Sidebar;
