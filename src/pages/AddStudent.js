import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    className: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

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
      
      if (contentType && contentType.includes("application/json")) {
        await response.json();
      } else {
        await response.text();
      }

      setSuccess("Student added successfully!");
      setFormData({ name: "", className: "" });
      
      setTimeout(() => {
        navigate("/students");
      }, 1500);
    } catch (err) {
      setError("Failed to add student: " + err.message);
      console.error("Error adding student:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <button className="menu-toggle" type="button" onClick={onToggleSidebar}>☰</button>
        <h2>➕ Add New Student</h2>
      </div>

      <div style={{
        background: "#f9fbfd",
        padding: "30px",
        borderRadius: "10px",
        border: "1px solid #eee",
        maxWidth: "600px",
        margin: "20px auto"
      }}>
        {error && (
          <div style={{ 
            color: "#d32f2f", 
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#ffebee",
            borderRadius: "5px"
          }}>
            ❌ {error}
          </div>
        )}
        
        {success && (
          <div style={{ 
            color: "#388e3c", 
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#e8f5e9",
            borderRadius: "5px"
          }}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSaveStudent}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
              Student Name
            </label>
            <input 
              type="text" 
              name="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
              Class
            </label>
            <select 
              name="className"
              value={formData.className}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            >
              <option value="">Select Class</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button 
              className="btn btn-primary"
              type="submit"
              disabled={loading}
              style={{ minWidth: "120px" }}
            >
              {loading ? "Saving..." : "Save Student"}
            </button>
            <button
              className="btn"
              style={{ background: "#ccc", minWidth: "120px" }}
              onClick={() => navigate("/students")}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
