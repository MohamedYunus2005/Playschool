// src/components/Layout/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ theme }) => {
    const isUnicornTheme = theme === 'unicorn';
    const linkBaseClasses = `flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105`;
    const activeLinkClasses = isUnicornTheme ? 'bg-purple-300 text-white shadow-md' : 'bg-purple-700 text-white shadow-md';
    const inactiveLinkClasses = isUnicornTheme ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700';

    return (
        <aside className={`w-64 min-h-screen p-6 shadow-2xl transition-all duration-500 ${isUnicornTheme ? 'bg-white/70' : 'bg-gray-800/70 text-white'}`}>
            <nav className="space-y-4">
                <NavLink
                    to="/admin-dashboard"
                    end
                    className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <span className="mr-3">🏠</span> Dashboard
                </NavLink>
                <NavLink
                    to="/attendance"
                    className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <span className="mr-3">📅</span> Attendance
                </NavLink>
                <NavLink
                    to="/growth-tracker"
                    className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <span className="mr-3">📈</span> Growth Tracker
                </NavLink>
                <NavLink
                    to="/nutrition-tracker"
                    className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <span className="mr-3">🍎</span> Nutrition
                </NavLink>
                <NavLink
                    to="/daily-activities"
                    className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <span className="mr-3">🎨</span> Daily Activities
                </NavLink>
                <NavLink
                    to="/learning"
                    className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <span className="mr-3">📚</span> Learning
                </NavLink>
                <NavLink
                    to="/notifications"
                    className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                    <span className="mr-3">📢</span> Notifications
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;