import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Layout/Auth/Login';
import Landing from './components/Layout/Pages/Landing'; // Corrected path

// Dashboard Components
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ParentDashboard from './components/Dashboard/ParentDashboard';

// Feature Components
import AttendanceTracker from './components/Attendance/AttendanceTracker';
import GrowthTracker from './components/Growth/GrowthTracker';
import VaccinationTracker from './components/Vaccination/VaccinationTracker';
import NutritionAdvisor from './components/Nutrition/NutritionAdvisor';
import LearningActivities from './components/Learning/LearningActivities';
import ParentAwareness from './components/Awareness/ParentAwareness';
import Register from './components/Layout/Auth/Register';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/attendance" element={<AttendanceTracker />} />
          <Route path="/growth-tracker" element={<GrowthTracker />} />
          <Route path="/vaccination-tracker" element={<VaccinationTracker />} />
          <Route path="/nutrition-advisor" element={<NutritionAdvisor />} />
          <Route path="/learning-activities" element={<LearningActivities />} />
          <Route path="/parent-awareness" element={<ParentAwareness />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
