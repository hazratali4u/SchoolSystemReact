import React, { useEffect, useState } from "react";

function AllStudents() {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    className: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setFormData({ name: "", className: "" });
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.className) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const contentType = response.headers.get("content-type");
      let newStudent;
      
      if (contentType && contentType.includes("application/json")) {
        newStudent = await response.json();
      } else {
        const text = await response.text();
        newStudent = formData;
      }

      setStudents([...students, newStudent]);
      setFormData({ name: "", className: "" });
      setShowForm(false);
      alert("Student added successfully!");
    } catch (err) {
      setError("Failed to add student: " + err.message);
      console.error("Error adding student:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAll = (status) => {
    alert("Mark all as " + status);
  };

  const setStatus = (status) => {
    alert("Set status: " + status);
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
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

          <form onSubmit={handleSaveStudent}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input 
                type="text" 
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <select 
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
              </select>
            </div>

            <div style={{ marginTop: "10px" }}>
              <button 
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Student"}
              </button>
              <button
                className="btn"
                style={{ background: "#ccc" }}
                onClick={toggleForm}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
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
        </select>

        <div className="date-wrapper">
          <input type="text" readOnly />
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
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
  {students.map((student, index) => (
    <tr key={student.id}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>
              <div className="status">
                <button onClick={() => setStatus(student.id, "present")} className="present">
                  Present
                </button>
                <button onClick={() => setStatus(student.id, "absent")} className="absent">
                  Absent
                </button>
                <button onClick={() => setStatus(student.id, "late")} className="late">
                  Late
                </button>
              </div>
            </td>
          </tr>
  ))}
</tbody>
      </table>
      <div className="footer">
        <div>Total: 3 | Present: 0 | Absent: 0 | Late: 0</div>
        <button className="btn btn-primary">Save Attendance</button>
      </div>
    </div>
  );
}

export default AllStudents;