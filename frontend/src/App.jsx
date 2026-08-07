import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddStudent from './pages/AddStudent';
import ViewStudents from './pages/ViewStudents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<AddStudent />} />
        <Route path="/view" element={<ViewStudents />} />
      </Routes>
    </Router>
  );
}

export default App;