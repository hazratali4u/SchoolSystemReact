import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

function AllStudents() {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

useEffect(() => {
  fetch("http://localhost:5000/api/students")
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      return res.json();
    })
    .then((data) => setStudents(data))
    .catch((err) => {
      console.log("FULL ERROR:", err.message);
    });
}, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const markAll = (status) => {
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.id] = status;
    });
    setAttendance(newAttendance);
  };

  const setStatus = (status) => {
    alert("Set status: " + status);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getStats = () => {
    const total = students.length;
    const present = Object.values(attendance).filter(s => s === "present").length;
    const absent = Object.values(attendance).filter(s => s === "absent").length;
    const late = Object.values(attendance).filter(s => s === "late").length;
    return { total, present, absent, late };
  };

  return (
    <div className="container">

      <div className="header">
        <span className="menu-toggle">☰</span>
        <h2>📘 Attendance Management</h2>
        <button className="btn btn-secondary" onClick={() => markAll("present")}>
          Mark All Present
        </button>
      </div>

      {showForm && (
        <div style={{
          background: "#f9fbfd",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "1px solid #eee"
        }}>
          <h3>Add Student</h3>
          <p>Use the "Add Student" menu option to add a new student.</p>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <button className="btn btn-primary" onClick={toggleForm}>
          {showForm ? "Close Form" : "+ Add Student"}
        </button>
      </div>

      {/* FILTER */}
      <div className="filters">
        <select>
          <option>Select Class</option>
          <option>Class 1</option>
          <option>Class 2</option>
          <option>Class 3</option>
          <option>Class 4</option>
          <option>Class 5</option>
        </select>

        <div className="date-wrapper">
          <Flatpickr
            value={attendanceDate}
            onChange={([date]) => setAttendanceDate(date)}
            options={{
              dateFormat: "d-M-Y",
              defaultDate: "today"
            }}
            placeholder="Select Date"
          />
          <span>📅</span>
        </div>

        <button className="btn btn-primary">Load Students</button>
      </div>

      {/* TABLE */}
      <table id="attendanceTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
  {students.map((student, index) => (
    <tr key={student.id}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>{student.className}</td>
            <td>
              <div className="status">
                <button 
                  onClick={() => handleStatusChange(student.id, "present")} 
                  className={`present ${attendance[student.id] === "present" ? "active" : ""}`}
                >
                  Present
                </button>
                <button 
                  onClick={() => handleStatusChange(student.id, "absent")} 
                  className={`absent ${attendance[student.id] === "absent" ? "active" : ""}`}
                >
                  Absent
                </button>
                <button 
                  onClick={() => handleStatusChange(student.id, "late")} 
                  className={`late ${attendance[student.id] === "late" ? "active" : ""}`}
                >
                  Late
                </button>
              </div>
            </td>
          </tr>
  ))}
</tbody>
      </table>
      <div className="footer">
        <div>
          Total: {getStats().total} | Present: {getStats().present} | Absent: {getStats().absent} | Late: {getStats().late}
        </div>
        <button className="btn btn-primary">Save Attendance</button>
      </div>
    </div>
  );
}

export default AllStudents;
