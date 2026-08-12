import React, { useEffect, useState } from 'react';
import './ViewStudents.css';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
    department: '',
    year: 'FE',
    semester: '1',
    cgpa: ''
  });

  const fetchStudents = () => {
    setLoading(true);
    setError('');
    axios
      .get("/getDetails")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError("Failed to connect to backend server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const studentId = selectedStudent.id || selectedStudent._id;
    axios.put(`/update/${studentId}`, selectedStudent)
    .then(()=>{
        alert("Details updated successfully!");
        setIsModalOpen(false);
        fetchStudents(); 
    })
    .catch((err) => {
      alert("Failed to update student details.");
    });
  };

  const handleDelete = (student) => {
    const studentId = student.id || student._id;
    
    if (window.confirm(`Are you sure you want to delete ${student.name}'s profile?`)) {
      axios.delete(`/delete/${studentId}`)
        .then(() => {
          alert("Student record deleted successfully.");
          fetchStudents(); 
        })
        .catch((err) => {
          console.error("Delete request failure details:", err);
          alert("Failed to delete student record.");
        });
    }
  };

  return (
    <div className="app-page-layout">
      <Sidebar />

      <div className="view-container-pane">
        <h3>View All Students</h3>
        <p className="subtitle">List of currently registered student profiles</p>

        {loading && <div className="loading-state">Loading records...</div>}
        {error && <div className="error-state">{error}</div>}

        {!loading && !error && students.length === 0 && (
          <div className="empty-state">No student records found in the system.</div>
        )}

        {!loading && !error && students.length > 0 && (
          <div className="table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Roll / Enrollment</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>CGPA</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id || idx}>
                    <td className="bold-cell">{student.enrollmentNumber}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td><span className="badge-year">{student.year}</span></td>
                    <td>Sem {student.semester}</td>
                    <td className="bold-cell highlight-text">
                      {student.cgpa ? Number(student.cgpa).toFixed(2) : '0.00'}
                    </td>
                    <td>
                      <button 
                        className="action-edit-btn"
                        onClick={() => openModal(student)}
                      >
                        🔄 Update
                      </button>
                      <button 
                        className="action-delete-btn"
                        onClick={() => handleDelete(student)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Update Student Profile</h4>
              <button className="close-x-btn" onClick={closeModal}>&times;</button>
            </div>
            
            <form onSubmit={handleUpdateSubmit} className="modal-form">
              <div className="modal-form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={selectedStudent.name} onChange={handleModalChange} required />
              </div>

              <div className="modal-form-group">
                <label>Enrollment Number (Read Only)</label>
                <input type="text" name="enrollmentNumber" value={selectedStudent.enrollmentNumber} readOnly className="readonly-input" />
              </div>

              <div className="modal-form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={selectedStudent.email} onChange={handleModalChange} required />
              </div>

              <div className="modal-form-group">
                <label>Department</label>
                <input type="text" name="department" value={selectedStudent.department} onChange={handleModalChange} required />
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group split-val">
                  <label>Year</label>
                  <select name="year" value={selectedStudent.year} onChange={handleModalChange}>
                    <option value="FE">First Year (FE)</option>
                    <option value="SE">Second Year (SE)</option>
                    <option value="TE">Third Year (TE)</option>
                    <option value="BE">Fourth Year (BE)</option>
                  </select>
                </div>

                <div className="modal-form-group split-val">
                  <label>Semester</label>
                  <select name="semester" value={selectedStudent.semester} onChange={handleModalChange}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-form-group">
                <label>Cumulative CGPA</label>
                <input type="number" step="0.01" min="0" max="10" name="cgpa" value={selectedStudent.cgpa} onChange={handleModalChange} required />
              </div>

              <div className="modal-actions-footer">
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-changes-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewStudents;