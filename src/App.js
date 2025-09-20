import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Layout/Auth/Login';
import Landing from './components/Layout/Pages/Landing';
import Register from './components/Layout/Auth/Register';

// Dashboard Components
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ParentDashboard from './components/Dashboard/ParentDashboard';

// Feature Components
import AttendanceTracker from './components/Attendance/AttendanceTracker';
import GrowthTracker from './components/Growth/GrowthTracker';
import NutritionTracker from './components/Nutrition/NutritionTracker';
import DailyActivities from './components/Activities/DailyActivities';
import LearningPage from './components/Learning/LearningPage';
import Notifications from './components/Notifications/Notifications';

// Import the new ProtectedRoute and ThemeToggleButton components
import ProtectedRoute from './components/ProtectedRoute'; // Corrected: This was missing
import ThemeToggleButton from './components/ThemeToggleButton';

import './App.css';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('unicorn'); // State for the theme

  return (
    <Router>
      <div className="App">
        <Navbar />

        {/* Place the ThemeToggleButton right below the Navbar */}
        <div className="relative z-40">
          <ThemeToggleButton theme={theme} setTheme={setTheme} />
        </div>

        <Routes>
          {/* Pass the theme and setTheme prop to the Landing page */}
          <Route path="/" element={<Landing theme={theme} setTheme={setTheme} />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} theme={theme} setTheme={setTheme} />}
          />
          <Route path="/register" element={<Register />} />

          {/* This is the protected section of your application */}
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/growth-tracker" element={<GrowthTracker />} />
            <Route path="/nutrition-tracker" element={<NutritionTracker />} />
            <Route path="/daily-activities" element={<DailyActivities />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;