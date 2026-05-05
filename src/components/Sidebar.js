import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <h3>🏫 School Soft</h3>

      <div className="menu-item">📊 Dashboard</div>

      {/* STUDENTS */}
      <div
        className={`menu-item has-child ${openMenu === "students" ? "open" : ""}`}
        onClick={() => toggleMenu("students")}
      >
        <span>👨‍🎓 Students</span>
        <span className="arrow">▸</span>
      </div>

      {openMenu === "students" && (
        <div className="submenu">
          <Link to="/students" className="menu-item">
            All Students
          </Link>
          <div className="menu-item">Add Student</div>
        </div>
      )}

      {/* ATTENDANCE */}
      <div
        className={`menu-item has-child ${openMenu === "attendance" ? "open" : ""}`}
        onClick={() => toggleMenu("attendance")}
      >
        <span>📅 Attendance</span>
        <span className="arrow">▸</span>
      </div>

      {openMenu === "attendance" && (
        <div className="submenu">
          <div className="menu-item">Mark Attendance</div>
          <div className="menu-item">Reports</div>
        </div>
      )}

      <div className="menu-item">📩 SMS</div>
    </div>
  );
}

export default Sidebar;