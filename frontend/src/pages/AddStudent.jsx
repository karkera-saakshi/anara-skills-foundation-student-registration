import React, { useState } from 'react';
import './AddStudent.css';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function AddStudent() {
  const [student, setStudent] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
    department: '',
    year: 'FE',
    semester: '1',
    cgpa: ''
  });


  let handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/create", student)
      .then(() => {
        alert("Added Details successfully!");
        setStudent({
            name: '',
            enrollmentNumber: '',
            email: '',
            department: '',
            year: 'FE',
            semester: '1',
            cgpa: ''
        });
      })
      .catch(() => {
        alert("Error adding student.");
      });
  };

  return (
    <div className="app-page-layout">
      <Sidebar />
      
      <div className="form-container-pane">
        <h3>Add New Student</h3>
        <p className="subtitle">Register a student into the system</p>

        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={student.name} onChange={(e) => setStudent({...student, name: e.target.value})} required />
          </div>

          <div className="form-group">
            <label>Enrollment Number</label>
            <input type="text" name="enrollmentNumber" value={student.enrollmentNumber} onChange={(e) => setStudent({...student, enrollmentNumber: e.target.value})} required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={student.email} onChange={(e) => setStudent({...student, email: e.target.value})} required />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" value={student.department} onChange={(e) => setStudent({...student, department: e.target.value})} required />
          </div>

          <div className="form-row-split">
            <div className="form-group val-split">
              <label>Year</label>
              <select name="year" value={student.year} onChange={(e) => setStudent({...student, year: e.target.value})}>
                <option value="FE">First Year (FE)</option>
                <option value="SE">Second Year (SE)</option>
                <option value="TE">Third Year (TE)</option>
                <option value="BE">Fourth Year (BE)</option>
              </select>
            </div>

            <div className="form-group val-split">
              <label>Semester</label>
              <select name="semester" value={student.semester} onChange={(e) => setStudent({...student, semester: e.target.value})}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Cumulative CGPA</label>
            <input type="number" step="0.01" min="0" max="10" name="cgpa" value={student.cgpa} onChange={(e) => setStudent({...student, cgpa: e.target.value})} required />
          </div>

          <button type="submit" className="save-btn">
            Save Record
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;