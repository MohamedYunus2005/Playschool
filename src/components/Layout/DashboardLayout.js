// src/components/Layout/DashboardLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = ({ theme, setTheme }) => {
    const bgColor = theme === 'unicorn' ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950';

    return (
        <div className={`flex min-h-screen transition-all duration-1000 ${bgColor}`}>
            <Sidebar theme={theme} />
            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;