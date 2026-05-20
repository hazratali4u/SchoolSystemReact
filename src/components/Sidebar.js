import { useState } from "react";
import { NavLink } from "react-router-dom";
import { formatMenuName } from "../menuConfig";

function Sidebar({ isOpen, menus, menuError, onNavigate }) {
  const [openMenu, setOpenMenu] = useState("students");

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
