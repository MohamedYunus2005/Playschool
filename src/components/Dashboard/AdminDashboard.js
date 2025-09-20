import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-8">Playschool Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Attendance Card with Link */}
                <Link to="/attendance">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">📅 Attendance Tracker</h3>
                        <p className="text-gray-600">Mark daily attendance and manage student records.</p>
                    </div>
                </Link>

                {/* Growth Tracker Card */}
                <Link to="/growth-tracker">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">📈 Growth Monitor</h3>
                        <p className="text-gray-600">Track child's physical development and milestones.</p>
                    </div>
                </Link>

                {/* Nutrition Tracker Card */}
                <Link to="/nutrition-tracker">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">🍎 Nutrition Tracker</h3>
                        <p className="text-gray-600">Log meals and manage dietary plans for each child.</p>
                    </div>
                </Link>

                {/* Daily Activities Card */}
                <Link to="/daily-activities">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">🎨 Daily Activities</h3>
                        <p className="text-gray-600">Plan and record creative and physical activities.</p>
                    </div>
                </Link>

                {/* Learning Page Card */}
                <Link to="/learning">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">📚 Learning Progress</h3>
                        <p className="text-gray-600">Monitor academic and foundational learning progress.</p>
                    </div>
                </Link>

                {/* Notification Card */}
                <Link to="/notifications">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">🔔 Notifications</h3>
                        <p className="text-gray-600">Send important alerts and messages to parents.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;